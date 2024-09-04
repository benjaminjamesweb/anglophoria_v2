const userModel = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
// Register User
const RegisterUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Please provide both email and password"
        });
    }

    try {
        // Check if the user already exists
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            console.log('User already exists:', userExists);
            return res.status(403).json({
                message: "User already exists, use a different email!"
            });
        }

        // Log before password hashing
        console.log('Hashing password for', email);

        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new userModel({
            email,
            password: encryptedPassword
        });

        // Log before saving
        console.log('Saving user:', newUser);

        const savedUser = await newUser.save();

        // Success response
        return res.status(201).json({
            message: 'User Registered Successfully!',
            data: savedUser
        });
    } catch (error) {
        // Log the actual error in the server logs
        console.error('Error in RegisterUser:', error);

        return res.status(500).json({
            message: 'There was an error',
            error: error.message || error
        });
    }
};


// Login User
const LoginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Email or Password missing!'
        });
    }

    const userExists = await userModel.findOne({ email });

    if (!userExists) {
        return res.status(401).json({
            message: "User doesn't exist"
        });
    }

    const isPasswordSame = await bcrypt.compare(password, userExists.password);

    if (!isPasswordSame) {
        return res.status(401).json({
            message: "Incorrect credentials"
        });
    }

    const accessToken = jwt.sign({
        email: userExists.email,
        id: userExists._id
    }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });  // Use the secret key from .env
    

    const userData = {
        id: userExists._id,
        email: userExists.email,
        token: accessToken
    };

    return res.status(200).json({
        message: "User logged in!",
        data: userData
    });
};

// Get All Users
const GetUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        return res.status(200).json({
            message: 'Successfully found the users!',
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching users!',
            error
        });
    }
};

module.exports = {
    RegisterUser,
    GetUsers,
    LoginUser
};
