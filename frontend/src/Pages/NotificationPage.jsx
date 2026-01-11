import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheck } from 'lucide-react'
import React from 'react'
import { acceptFriendRequest, getFriendRequest } from '../lib/api'
import { capitialize } from '../lib/utils.js'

function NotificationPage() {


  const queryClient =useQueryClient();

  const { data: friendRequest, isLoading: loadingFriends } = useQuery({
    queryKey: ["friendRequest"],
    queryFn: getFriendRequest
  })
  const {mutate:acceptRequest,isPending}=useMutation({
    mutationFn:acceptFriendRequest,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["friendRequest"]})
      queryClient.invalidateQueries({queryKey:["friends"]})
    }
  })
   console.log(friendRequest);

  return (
    <div className='p-5 md:px-60 bg-base-100'>
      {
        loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (

          <div className=''>
            <h2 className='text-2xl sm:text-3xl tracking-tight font-bold mb-5'>Notifications</h2>
            <section>
              <div className='flex justify-start items-center gap-1 ml-5 '>
                <UserCheck />
                <span className=''>Friend Requests</span>
                <span className='px-2 rounded-full bg-primary text-sm text-base-200 ml-2'>{friendRequest.incomingReqs.length}</span>
              </div>
              {
                friendRequest.incomingReqs.map((req) => {

                  return (
                    <div key={req._id} className='p-4 bg-base-200 m-2  flex
                justify-between rounded-xl'>
                      <div className='flex gap-3'>
                        <div className='avatar size-16 rounded-full overflow-hidden '>
                          <img src={req.sender.profilePic} alt={req.sender.fullName} className="object-cover" />
                        </div>
                        <div className='text-sm flex flex-col gap-1'>
                          <h3 className='font-semibold '>{capitialize(req.sender.fullName)}</h3>
                          <div className='flex flex-wrap  gap-2 text-sm'>
                            <span className='flex items-center gap-1 badge-secondary text-sm border rounded-full py-0.5 px-2'>

                             <span className='text-[12px]'> Native: {(capitialize(req.sender.nativeLanguage))}</span>
                            </span>
                            <span className='flex items-center gap-1 border badge-outline rounded-full py-0.5 px-2 '>

                              <span className='text-[12px]'>
                                Learning: {capitialize(req.sender.learningLanguage)}
                              </span>
                              
                            </span>
                          </div>
                        </div>


                      </div>
                      <div>
                        <button className=' font-semibold text-sm bg-primary text-base-200 p-3 rounded-xl'
                        onClick={() => {
                          
                          acceptRequest(req._id)
                        }}
                            disabled={isPending}
                       >
                          Accept
                        </button>
                      </div>
                    </div>
                  )

                })
              }


            </section>
            <section>
              <div className='py-5'>
                <div className='flex justify-start items-center gap-1 ml-5 '>
                  <BellIcon />
                  <span className=''>New Connections</span>

                </div>
                <div>
                  {
                    friendRequest.acceptedReqs.map((req) => {

                      return (
                        <div key={req._id} className='p-4 bg-base-200 m-2  flex
                justify-between rounded-xl'>
                          <div className='flex gap-3'>
                            <div className='avatar size-16 rounded-full overflow-hidden '>
                              <img src={req.sender.profilePic} alt={req.sender.fullName} className="object-cover" />
                            </div>
                            <div className='text-sm flex flex-col gap-1'>
                              <h3 className='font-semibold '>{capitialize(req.sender.fullName)}</h3>
                              <p>{req.sender.fullName} accepted your friend request</p>
                              <div className='flex font-thin text-sm items-center gap-1'>
                                <ClockIcon className='size-3' />
                                <p>Recently</p>
                              </div>
                            </div>


                          </div>
                          <span className='flex badge-secondary h-min  p-0.5'>
                            <MessageSquareIcon className='size-4' />
                            <p className='text-[12px]'>New Connections</p>
                          </span>

                        </div>
                      )

                    })
                  } 
                </div>
              </div>

            </section>


          </div>
        )
      }
    </div>
  )
}

export default NotificationPage


