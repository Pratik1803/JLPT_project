const jwt = require("jsonwebtoken");
const User = require("../models/User");

const Authenticate = async (req,res,next)=>{
    // console.log(req.cookies.jwt);
    try {
        if(req.cookies.jwt){
            const token = req.cookies.jwt;
            const verifyToken = await jwt.verify(token, "mynameispratikvaidyamerndeveloper");
            const rootUser = await User.findOne({_id:verifyToken._id, "tokens.token":token});
            req.token = token;
            req.rootUser = rootUser;
            req.userID = rootUser?._id;
        };
        next();
    } catch (error) {
        res.status(200).send(false);
        console.log(error);
    }
};

module.exports = Authenticate;