const User = require("../models/User.model");

const { generateToken } = require("../jwt");

const register = async(req,res)=>{
    try {
        const { firstName, lastName, email, password } = req.body;

        const user = await User.findOne({ email });
        if(user){
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password,
            profilePicture: "https://via.placeholder.com/150",
            role: "user",
        });

        const savedUser = await newUser.save();
        const token = generateToken(savedUser._id);

        res.status(201).json({
            user: {
                id: savedUser._id,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                email: savedUser.email,
                profilePicture: savedUser.profilePicture,
                role: savedUser.role,
            },
            token
        })
    
    } catch (error) {
        console.error('Error in registering user', error);
        
        res.status(500).json({ message: "Internal server error Registration failed" , error: error.message });
    }
}


const login = async(req,res)=>{
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordCorrect = await user.comparePassword(password);
        if(!isPasswordCorrect){
            return res.status(400).json({ message: "Incorrect password" });
        }

        const token = generateToken(user._id);


        res.json({
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                profilePicture: user.profilePicture,
                role: user.role,
            }, token
        } );

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}


// const logout = async (req, res) => {
//     try {
//         const token =  req.cookies.refreshToken;
//         if(!token){
//             return res.status(401).json({ message: "No token provided" });
//         }

//         const decoded = verifyRefreshToken(token);
//         if(!decoded){
//             return res.status(403).json({message: 'Invalid or expired token'})
//         }
//         const { accessToken, refreshToken } = generateToken(decoded.userId);

//         res.cookie('refreshToken', refreshToken)
//     } catch (error) {
//         res.status(500).json({ message: "Internal server error" });
//     }
// }


module.exports = { register, login };