import { axiosInstance } from "./axios";


export const signup = async (signupData) => {
    const response = await axiosInstance.post("/auth/signup", signupData);
    return response.data;
}
export const login = async (loginData) => {
    const response = await axiosInstance.post("/auth/login", loginData);
    return response.data;
}
export const logout = async()=>{
  
    const response = await axiosInstance.get("/auth/logout");
    console.log(response.data);
    return response.data;
}

export const getAuthUser= async () => {
    try{
        const res = await axiosInstance.get('/auth/me');
    return res.data;
    }catch{
        return null;
    }
}

export const onBoard =async (formdata)=>{
    const response =await axiosInstance.post("/auth/onboard",formdata)
    return response.data
}

export const getFriends = async()=>{
    const response = await axiosInstance.get('/user/friends');
    return response.data
}
export const getRecomendedUsers = async()=>{
    const response = await axiosInstance.get('/user/recomended-user');
    
    return response.data
}
export const getOutgoingFriendReqs = async()=>{
    const response = await axiosInstance.get('/user/outgoing-friend-request');
    // console.log(response.data)
    return response.data
}
export async function sendFriendRequest(userId) {
  const response = await axiosInstance.post(`/user/friend-request/${userId}`);
  return response.data;
}


export async function getFriendRequest() {
  const response = await axiosInstance.get(`/user/friend-requests`)
  return response.data;
}

export async function acceptFriendRequest(userId) {
    
    const response=await axiosInstance.put(`/user/friend-request/${userId}/accept`);

    return response.data;
}

export async function getSteamToken() {
  const response = await axiosInstance.get(`/chat/token`)
  console.log(response.data)
  return response.data;
}



