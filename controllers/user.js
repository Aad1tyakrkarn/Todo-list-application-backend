import { User } from "../models/user.js"
import bcrypt from "bcrypt"
import jwt, { decode } from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middleware/error.js";

export const login = async (req,res,next)=>{

try {
    const {email,password} = req.body;

    // In models-> user.js due to the "select:false", we cant access password directly, we will only get email. 
    // To get the password we will have to specify it by writing " .select(+"password") "

    const user = await User.findOne({email}).select("+password");                       

    if(!user) return next(new ErrorHandler("Invalid email or password",400))

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch)
    return res.status(404).json({
        success:false,
        message:"Invalid email or password",
        reply:"Ghazni",
    });

    sendCookie(user,res,`Welcome,${user.name}`,200);


} catch (error) {
    next(error)
}

}

export const register = async (req, res) => {
try {
    const {name,email,password} = req.body;

    let user = await User.findOne({email});


    if(user) return next(new ErrorHandler("user already exist",400))


        const hashedPassword = await bcrypt.hash(password,10);

        user=  await User.create({name,email,password:hashedPassword});

        sendCookie(user,res,"Registered successfully",201);

} catch (error) {
    next(error)
}

};

// export const specialFunc = (req,res)=>{
//     res.json({
//         success:true,
//         message:"hello"
//     })
// }

export const getMyProfile = async (req,res)=>{

try {
    res.status(200).json({
        success:true,
        user:req.user,  
    })    
} catch (error) {
    next(error)
}
  
}


export const logout = async(req,res)=>{

try {
    res.status(200).cookie("token","",{expires:new Date(Date.now())}).json({
        success:true,
        message:req.user,
        sameSite:process.env.NODE_ENV==="Development"?"lax":none,
        secure:process.env.NODE_ENV==="Development"?false:true,
     
    })
} catch (error) {
    next(error)
}
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