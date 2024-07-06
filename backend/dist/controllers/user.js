import { User } from "../models/user.js";
export const newUser = async (req, res, next) => {
    try {
        const { name, email, photo, _id, dob, gender } = req.body;
        const user = await User.create({
            name,
            email,
            photo,
            _id,
            dob,
            gender,
        });
        res.status(200).json({
            success: true,
            message: `User created , Welcome ${user.name}`
        });
    }
    catch (error) {
        res.json({
            message: "User Already Exists/User is Not Created"
        });
    }
};
