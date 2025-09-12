const usermodel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const foodpartnermodel = require("../models/foodpartner.model");


async function registerUser(req, res) {
    const { fullName, email, password } = req.body;

    const isUserAlreadyExists = await usermodel.findOne({ email
    });

    if (isUserAlreadyExists) {
        return res.status(400).json({
             message: "User already exists" 
        });
    }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await usermodel.create({
            fullName,
            email, 
            password: hashedPassword
        })

        const token = jwt.sign({ 
            id: user._id},
            process.env.JWT_SECRET)
            res.cookie("token", token)

            res.status(200).json({
                message: "User registered successfully",
                user:{
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email
                }
            });
    
}

async function loginUser(req, res) {
    const { email, password } = req.body;
    const user = await usermodel.findOne({
        email
    })
    if (!user) {
        return res.status(400).json({
            message: "User does not exist"
        });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    const token = jwt.sign({
        id: user._id
    },process.env.JWT_SECRET);
    res.cookie("token", token)
    res.status(200).json({
        message: "User logged in successfully",
        user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email
        }
    });

}

async function logoutUser(req, res) {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        message: "User logged out successfully"
    });
}

async function registerFoodPartner(req, res) {
    const { name, email, password, phone, contactName, address } = req.body;
    const isAccountAlreadyExists = await foodpartnermodel.findOne({
        email
    })

    if (isAccountAlreadyExists) {
        return res.status(400).json({
            message: "Account already exists"
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const foodpartner = await foodpartnermodel.create({
        name,
        email,
        password: hashedPassword,
        phone,
        contactName,
        address
    });     
    const token = jwt.sign({
        id: foodpartner._id
    }, process.env.JWT_SECRET);

    res.cookie("token", token);

    res.status(201).json({
        message: "Food Partner registered successfully",
        foodpartner: {
            _id: foodpartner._id,
            name: foodpartner.name,
            email: foodpartner.email
        }
    });

}

async function loginFoodPartner(req, res) {
    const { email, password } = req.body;
    const foodpartner = await foodpartnermodel.findOne({
        email
    });
    if (!foodpartner) {
        return res.status(400).json({
            message: "Account does not exist"
        });
    }
    const isPasswordCorrect = await bcrypt.compare(password, foodpartner.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }
    const token = jwt.sign({
        id: foodpartner._id
    }, process.env.JWT_SECRET);
    res.cookie("token", token);
    res.status(200).json({
        message: "Food Partner logged in successfully",
        foodpartner: {
            _id: foodpartner._id,
            name: foodpartner.name,
            email: foodpartner.email
        }
    });
}

function logoutFoodPartner(req, res) {
    res.clearCookie('token');
    res.status(200).json({
        message: "Food Partner logged out successfully"
    });
}


module.exports = { 
    registerUser, 
    loginUser, 
    logoutUser, 
    registerFoodPartner, 
    loginFoodPartner,
    logoutFoodPartner};
