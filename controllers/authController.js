const User = require("../models/User");
const Token = require("../models/Token");
const HttpError = require("../errors/error");
const crypto = require('crypto');
const { createTokenUser, attachCookies } = require("../utils");

const register = async (req, res,next) => {
    const { name,email , password } = req.body;
    const emailAlreadyExist = await User.findOne({ email });
    if (emailAlreadyExist) {
      return next(new HttpError("Email already exist",400));
    }
    if(!email || !password || !name){
      return next(new HttpError('Please provide credentials',400));
    }
  
    //   first registered user as admin
    const isFirstAdmin = (await User.countDocuments({})) === 0;
    const role = isFirstAdmin ? "admin" : "user";
  
    const user = await User.create({ name, email, password, role });
    const tokenUser = createTokenUser(user);
    attachCookies({ res, user: tokenUser });
    res.status(201).json({ user: tokenUser });
};
const login = async (req, res,next) => {
  const {email,password} = req.body;

  if(!email || !password){
    return next(new HttpError('Please provide email and password',400));
  }
  const user = await User.findOne({email});
  if(!user){
    return next(new HttpError('Invalid credentials',400));
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if(!isPasswordCorrect){
    return next(new HttpError('Invalid password',401));
  }
  const tokenUser = createTokenUser(user);
  // create refreshToken
  let refreshToken = '';

 
  // check for existing token
  const existingToken = await Token.findOne({user:user._id})
  console.log(existingToken);
  if(existingToken){
    const {isValid} = existingToken
    console.log(isValid);
    if(!isValid){
      return next(new HttpError('Invalid credentials',401))
    }
    refreshToken = existingToken.refreshToken;
    attachCookies({ res, user: tokenUser,refreshToken });
    res.status(200).json({tokenUser});
    return;
  }
  refreshToken = crypto.randomBytes(40).toString('hex');

  const userAgent = req.headers['user-agent']
  const ip = req.ip

  const userToken = {refreshToken,ip,userAgent,user:user._id};

  await Token.create(userToken);
  attachCookies({ res, user: tokenUser,refreshToken });
  res.status(200).json({tokenUser});
};

const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user.userId });

  res.cookie('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({ msg: 'user logged out!' });
};
module.exports = {
  register,
  login,
  logout
};
