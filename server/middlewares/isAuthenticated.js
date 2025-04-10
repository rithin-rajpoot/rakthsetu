import jwt from 'jsonwebtoken';
import  AsyncHandler  from '../utils/AsyncHandler.js';
import  ExpressError  from '../utils/ExpressError.js';

const isAuthenticated = AsyncHandler(async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];/* || req.query.token*/ // we have sent the token in cookie while login and signup
    if (!token) {
        return next(new ExpressError(401,"Token not found. Please log in!")); // if the user is not logged in or token has expired
    }

    const tokenData = jwt.verify(token, process.env.JWT_SECRET); // returns the token data set during login or signup
    // console.log("token data", tokenData?._id);
    req.user = tokenData;
    next();

})

export default isAuthenticated;