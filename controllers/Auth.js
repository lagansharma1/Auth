const bcrypt = require('bcrypt');
const User = require('../models/User');

// Signup
exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        }

        // Secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
            
        } catch (err) {
            return res.status(500).json({
                message: "Hashing password failed",
                success: false
            });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        return res.status(200).json({
            success: true,
            message: "User created successfully"
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
