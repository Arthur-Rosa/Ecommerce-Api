const User = require("../models/User");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const authGuard = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(!token) {
        resp.status(401).json({
            msg: "Acesso Negado"
        })
    }

    try {
        const verified = jwt.verify(token, secret);
        req.User = await User.findById(verified.id).select("-password");
        next();   
    } catch (e) {
        console.log(e)
        resp.status(401).json({
            msg: "Token Inválido"
        })
    }
}

module.exports = authGuard;