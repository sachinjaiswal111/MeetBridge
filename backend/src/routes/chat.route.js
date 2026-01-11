import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';
import { getStreamToken } from '../controllers/chat.controller.js';

const chatRoute = express.Router();


chatRoute.get("/token",protectRoute,getStreamToken)

export default chatRoute;
