import { Router } from "express";

import { logIn,logOut,signUp,onboard } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const authRoute = Router();

authRoute.post('/signup',signUp)
authRoute.post('/login',logIn)
authRoute.get('/logout',logOut)


authRoute.post('/onboard',protectRoute,onboard)

// check if user is logged in 

authRoute.get("/me",protectRoute,(req,res)=>{
    res.status(200).json({
        success:true,
        user:req.user
    })
})

export default authRoute;