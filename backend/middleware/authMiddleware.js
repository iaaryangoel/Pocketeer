const jwt = require("jsonwebtoken");
const User = require("../model/User");

exports.protect = async (req,res,next) => {
    // Getting the token from authorization header & extract token from format Bearer TOKEN_HERE
    let token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(400).json({message: "Not authorized, no token."});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // decode and verify the token
        req.user = await User.findById(decoded.id).select('-password'); // Fetch user and Exclude password
        next(); // Moves to the actual route logic
    } catch(err){
        res.status(401).json({message: "Not authorized, token failed."})
    }
};
