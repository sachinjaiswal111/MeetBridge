import {StreamChat} from 'stream-chat'

import 'dotenv/config';

const apiKey = process.env.STREM_API_KEY;

const apiSecret = process.env.STREM_API_SECRET;

if(!apiKey || !apiSecret){
    console.log("Stream Api key or Secret is missing")
}

const streamClient = StreamChat.getInstance(apiKey,apiSecret);

export const upsertStreamUser =  async (userData)=>{
    try {
        await streamClient.upsertUser(userData);
        return userData;
    } catch (error) {
        console.log("Error upserting Stream user:",error);
    }
}


export const generateStreamToken = async (userId)=>{
    try{
        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr);
    }catch(error){
        console.log("Error genrating Stream token: ",error);
    }

}