import employeeModel from "../models/employee.model.js";
import bcrypt  from "bcrypt";
import jwt from "jsonwebtoken";

export async function loginEmployee (req, res) {
    try {
        //1. extract email and password
        const {email, password} = req.body;

        //2. validate email and password
        if(!email || !password) {
            return res.status(400).json({message:"Email and Password ae required."});
        }

        //3. check if email is present in database 
        const user = await employeeModel.findOne({email});
        if(!user) {
           return res.status(400).json({message:"Invalid Credentials."});
        }

        //4. compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message:"Invalid Credentials"});
        }

        //5. crerate/sign a jwt token
        const token = jwt.sign({
            id: user._id, 
            email: user.email, 
            userType: user.userType,}, 
            process.env.JWT_SECRET, 
            {expiresIn: "1d"});

        //6. send token to frontend as a response
        res.status(200).json({
            message:"Login Successfull", 
            token: token, 
            user: {_id: user._id, 
            email: user.email, 
            name: user.name,
            userType: user.userType},
        });

    } catch (error) {
        console.log("Error while login.", error);
        res.status(500).json({message:"Intenal Server Error."});
    }
}