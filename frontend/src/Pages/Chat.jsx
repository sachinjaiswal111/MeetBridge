import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import useAuthUser from '../hooks/useAuthUser';
import { useQuery } from '@tanstack/react-query';
import { getSteamToken } from '../lib/api';
import ChatLoader from '../component/ChatLoader'
import toast from 'react-hot-toast'
import { StreamChat } from "stream-chat";
import CallButton from '../component/CallButton';

import {
  Channel,
  ChannelHeader,
  Chat,

  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";




const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY
function ChatPage() {

  const { id: targetUserId } = useParams();
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getSteamToken,
    enabled: !!authUser // this will run only when auther is avilable
  })

  useEffect(() => {
    const initChat = async () => {
      console.log('inside init chat')
      if (!tokenData?.token || !authUser) return;
      try {
        console.log("Initializing strema chat client...")
      
        const client = StreamChat.getInstance(STREAM_API_KEY);
        // you can still use new StreamChat("api_key");

        await client.connectUser(
          {
              id: authUser._id,
          name: authUser.fullName,
          image: authUser.ProfilePic,
          },
          tokenData.token,
        );

        const chhanelId = [authUser._id, targetUserId].sort().join("-")

        const currChannel = client.channel("messaging", chhanelId, {
          members: [authUser._id, targetUserId]
        })

        await currChannel.watch();
        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error("Error Initializing chat: ", error);
        toast.error("Could not connect to chat. Please try again.")
      } finally {
        setLoading(false);
      }

    }
    initChat();
  }, [tokenData, authUser, targetUserId])

  const handleVideoCall = async ()=>{
     if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success("Video call link sent successfully!");
    }

  }

  if(loading|| !chatClient || !channel) return <ChatLoader/>

  return (
    
      <div className=' md:h-[93vh] p-1 md:p-0 '>
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className='w-full relative'>
            <CallButton handleVideoCall={handleVideoCall}/>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread/>
        </Channel>
      </Chat>
    </div>
   
    
  )
}

export default ChatPage
