import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getRecomendedUsers,getMyFriends ,sendFriendRequest,acceptFriendRequest,getMyFriendRequests,getOutgoingFriendReqs} from "../controllers/user.controller.js";

export const userRoute = Router();


userRoute.use(protectRoute)
userRoute.get('/recomended-user',getRecomendedUsers);
userRoute.get('/friends',getMyFriends);
userRoute.post('/friend-request/:idx',sendFriendRequest);
userRoute.put('/friend-request/:id/accept',acceptFriendRequest);
userRoute.get('/friend-requests',getMyFriendRequests);
userRoute.get('/outgoing-friend-request',getOutgoingFriendReqs);

export default userRoute;
