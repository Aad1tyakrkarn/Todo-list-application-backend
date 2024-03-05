import { User } from "../models/user.js"
import bcrypt from "bcrypt"
import jwt, { decode } from "jsonwebtoken";
import { sendCookie } from "../utils/features.js"

export const getAllUsers = async (req, res) => {

}

export const login = async (req,res,next)=>{

    const {email,password} = req.body;

    // In models-> user.js due to the "select:false", we cant access password directly, we will only get email. 
    // To get the password we will have to specify it by writing " .select(+"password") "

    const user = await User.findOne({email}).select("+password");                       

    if(!user)
        return res.status(404).json({
            success:false,
            message:"Invalid email or password",
            
        });

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch)
    return res.status(404).json({
        success:false,
        message:"Invalid email or password",
        reply:"Ghazni",
    });

    sendCookie(user,res,`Welcome,${user.name}`,200);



}

export const register = async (req, res) => {
    const {name,email,password} = req.body;

    let user = await User.findOne({email});

    if(user) 
        return res.status(404).json({
            success:false,
            message:"user already exist",
            reply:"Nirlajj , Tu phir aa gaya"
        });

        const hashedPassword = await bcrypt.hash(password,10);

        user=  await User.create({name,email,password:hashedPassword});

        sendCookie(user,res,"Registered successfully",201)



};

// export const specialFunc = (req,res)=>{
//     res.json({
//         success:true,
//         message:"hello"
//     })
// }

export const getMyProfile = async (req,res)=>{

    res.status(200).json({
        success:true,
        user:req.user,  
    })    
  
}


export const logout = async(req,res)=>{

    res.status(200).cookie("token","",{expires:new Date(Date.now())}).json({
            success:true,
            message:req.user
        })
}




// export const updateUser = async (req,res)=>{

//     const {id}=req.params;

//     console.log(req.params)
//     const user = await User.findById(id)

//     res.json({
//         success:true,
//         message: "updated",  
//     }) 
//     console.log(user)
// }

// export const deleteUser =  async (req,res)=>{

//     const {id}=req.params;

//     console.log(req.params)
//     const user = await User.findById(id)


//     res.json({
//         success:true,
//         message: "deleted",  
//     }) 
// }