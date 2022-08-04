const jwt = require("jsonwebtoken");

const createJWT = ({ payload }) => {
  // console.log(payload);
  const token = jwt.sign(payload, "jwtSecret");
  return token;
};

const isTokenValid = (token) => jwt.verify(token, "jwtSecret");

const attachCookies = ({ res, user,refreshToken }) => {
  const accessTokenJWT = createJWT({ payload: {user} });
  const refreshTokenJWT = createJWT({ payload: {user,refreshToken} });

  const oneDay = 1000 * 60 * 60 * 24;
  const longExpiration = 1000 * 60 * 60 * 24 * 30;

  res.cookie("refreshToken", refreshTokenJWT, {
    httpOnly: false,
    expires: new Date(Date.now() + longExpiration),
    secure: process.env.NODE_ENV === 'production',
    signed:true
  });
  res.cookie("accessToken", accessTokenJWT, {
    httpOnly: false,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed:true,
  });
};


module.exports = {
  createJWT,
  attachCookies,
  isTokenValid
};
