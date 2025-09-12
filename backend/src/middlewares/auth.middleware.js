const foodpartnermodel = require("../models/foodpartner.model");
const usermodel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "please login first"
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.foodpartner = await foodpartnermodel.findById(decoded.id);
        // ❌ remove this line: req.foodpartner = foodpartner
        next();     
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        }); 
    }   
}

async function authUserMiddleware(req, res, next) {
    const token = req.cookies.token;    
    if (!token) {
        return res.status(401).json({
            message: "please login first"
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await usermodel.findById(decoded.id);
        next();     
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        }); 
    }       
}
module.exports = {
    authFoodPartnerMiddleware,
}
