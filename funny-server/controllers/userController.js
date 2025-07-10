import User from '../models/userModel.js';

const register = async (req,res)=>{
    const {name} = req.body;
    const user = await User.create({
        name
    })
    if(user){ console.log("User Registered...") }


    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user
    })
}

const uploadDetails = async (req,res)=>{
    const userId = req.body.id;
    const data = req.body.data
    const user = await User.findByIdAndUpdate(userId, {$set: {data}},{ new: true })
    res.status(201).json({
        success: true,
        message: "Details uploaded successfully",
        user
    })
}

const details = async (req,res)=>{
    const userId = req.user.id;
    const user = await User.findById(userId);
    res.status(200).json({
        success: true,
        message: "User details",
        user
    })
}

export {register, uploadDetails, details};