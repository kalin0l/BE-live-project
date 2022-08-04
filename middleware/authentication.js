const HttpError = require("../errors/error");
const { isTokenValid,attachCookies } = require("../utils/index");
const Token = require('../models/Token')


const authenticateUser = async(req,res,next) => {
    const {refreshToken,accessToken} = req.signedCookies

      try {
       if(accessToken){
        const payload = isTokenValid(accessToken);
        req.user = payload.user;
        return next();
       }
       const payload =  isTokenValid(refreshToken)
       const existingToken = await Token.findOne({user:payload.user.userId,refreshToken:payload.refreshToken})
        
       if(!existingToken || !existingToken?.isValid){
        return next( new HttpError("Authentication failed",401));
       }
       attachCookies({res,user:payload.user,refreshToken:existingToken.refreshToken})
       req.user = payload.user;
       next();
      } catch (error) {
        console.log(error);
        return next( new HttpError("Authentication failed",401));
        
      }
}

module.exports = authenticateUser;