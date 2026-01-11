
import User from "../models/User.model.js";
import jwt from 'jsonwebtoken'
import { upsertStreamUser } from "../lib/stream.js";


export const  signUp = async(req,res)=>{

    const {email,password,fullName} = req.body
    try{
        if(!email||!password||!fullName){
            return res.status(400).json({message:"All fields are are required"})
        }
        if(password.length<6){
            return res.status(400).json({message:"password must be at least 6 characters"})
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!(emailRegex.test(email))){
            return res.status(400).json({message:"Invalid email"})
        }
        const existUser = await User.findOne({email});
        if(existUser){
            return res.status(400).json({message:"Allready registered email"})
        }
        const idx = Math.floor(Math.random()*100)+1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}`

        const newUser= await User.create({
            email,
            fullName,
            password,
            profilePic:randomAvatar,
        })
        try{
            await upsertStreamUser({
                id:newUser._id.toString(),
                name:newUser.fullName,
                image:newUser.profilePic||"",
            })
            
        }catch(e){
            console.log('Error while create stream user',e.message);
            
        }
        
        const token = jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY,{
            expiresIn:"7d"
        })
        res.cookie('jwt',token,{
            maxAge:7*24*60*60*1000,
            httpOnly:true,
            sameSite:true,
            secure:process.env.NODE_ENV==="production"
        })
        res.status(201).json({success:true,message:"user register" ,user:newUser})
    }catch(e){
        console.log(e.message);
        res.status(500).json({message:"Something wen wrong"})
    }
 
}
export const logIn = async (req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({success:false,message:"All fields are required"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({success:false,message:"Email is not valid"});
        }
        const match= await user.matchPassword(password);
        if(!match){
            return res.status(401).json({success:false, message:"Enter valid password"})
        }
         const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{
            expiresIn:"7d"
        })
        res.cookie('jwt',token,{
            maxAge:7*24*60*60*1000,
            httpOnly:true,
            sameSite:true,
            secure:process.env.NODE_ENV==="production"
        })
        res.status(201).json({success:true,message:"user is loggedin ",user:user})

    }catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:"Some server error"
        })
    }
}



export const logOut = async(req,res)=>{
    res.clearCookie('jwt');
    return res.status(200).json({success:true, message:"log out"});
}



export async function onboard(req,res) {
    // console.log(req.user);
    try{
        const userId= req.user._id;
        const {fullName,bio,nativeLanguage,learningLanguage,location} = req.body
        if(!fullName||!bio||!nativeLanguage||!learningLanguage||!location){
            return res.status(400).json({
                message:"All fields are required",
                missingFields:[
                    !fullName && "fullName",
                    !bio && "bio",
                    !nativeLanguage&&"nativeLanguage",
                    !learningLanguage&&"learningLanguage",
                    !location&&"location"
                ].filter(Boolean)
            })
        }

        const updateUser = await User.findByIdAndUpdate(userId,{
            ...req.body,
            isOnboarded:true,

        },{new:true})
        if(!updateUser) return res.status(404).json({message:"User not found"})

         try {
             await upsertStreamUser({
            id:updateUser._id.toString(),
            name:updateUser.fullName,
            image:updateUser.profilePic||"",
          })  
          
         } catch (error) {
            console.log("Error updating stream user during on boarding",e.message)
         }

        res.status(200).json({success:true,user:updateUser});
    }catch(e){
        console.log(e)
    }
}