import { useQueryClient, useQuery } from '@tanstack/react-query'
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getFriends, getOutgoingFriendReqs, getRecomendedUsers } from '../lib/api';
import FriendCards from '../component/FriendCards';
import NoFriendsFound from '../component/Nofriends';
import { sendFriendRequest } from '../lib/api';
import { getLanguageFlag } from '../component/FriendCards';
import { capitialize } from '../lib/utils';
function Home() {

  const queryClient = useQueryClient();
  const [outgoingFriendReqs, setOutgoingRequestsIds] = useState(new Set())

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriends
  })
  const { data: recomendedUser = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["recomendedUser"],
    queryFn: getRecomendedUsers
  })
  const { data: outgoingReqs=[]  } = useQuery({
    queryKey: ["outgoingReqs"],
    queryFn: getOutgoingFriendReqs
  })

   const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingReqs"] }),
  });

  useEffect(() => {
  const outgoingIds = new Set();
  


  outgoingReqs?.forEach((req) => {
    if (req?.recipient?._id) {
      outgoingIds.add(req.recipient._id);
    }
  });

  // Always update the state, even if the Set is empty
  setOutgoingRequestsIds(outgoingIds);
  
}, [outgoingReqs]);


  return (
    <div className='bg-base-200'>
      <div className='p-4 h-full'>
      <div className='pb-4 flex justify-between'>
        <p className='text-2xl font-bold'>Your Friends</p>
        <div className="flex border border-white gap-2 py-1 px-3 items-center rounded-full">
          <UsersIcon className='size-4' />
          Friend Request
        </div>

      </div>
      {
        loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className='loading loading-spinner loading-lg' />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {
              friends.map((friend) => (
                <FriendCards key={friend._id} friend={friend} />
              ))
            }
          </div>
        )
      }
      <section>
        <div className='mb-6 sm:mb-8 p-5'>
          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
            <div>
              <h2 className='text-2xl sm:text-3xl font-bold tracking-tight'>Meet New Learners</h2>
              <p className='opacity-70'>
                Discover perfect language exchange based on your profile
              </p>
            </div>
          </div>

          {loadingUsers ? (
            <div className='flex justify-center py-12'>
              <span className='loading loading-spinner loading-lg'></span>
            </div>
          ) : recomendedUser.length === 0 ? (
            <div className="card bg-base-200 p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">No reomendation avilable</h3>
              <p className="text-base-content opacity-70">
                check back later for new language partners!
              </p>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5'>
              {recomendedUser.map((user) => {
                const hasRequestBeenSent = outgoingFriendReqs.has(user._id);
                
                return (
                  <div key={user._id} className='card bg-base-200 hover:shadow-lg transition-all duration-300  '>
                    <div className='card-body p-2 space-y-2'>
                      <div className='flex items-center gap-3'>
                        <div className='avatar size-16 rounded-full overflow-hidden'>
                          <img src={user.profilePic} alt={user.fullName} className="object-cover" />
                        </div>
                        <div>
                          <h3 className='font-semibold text-lg'>{user.fullName}</h3>
                          {user.location && (
                            <div className='flex items-center text-xs opacity-70'>
                              <MapPinIcon className='size-3 mr-1' />
                              {user.location}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* language with flags */}
                      <div className='flex flex-wrap  gap-5 text-sm'>
                        <span className='flex items-center gap-1 badge-secondary border rounded-full py-0.5 px-2'>
                          {getLanguageFlag(user.nativeLanguage)}
                          Native: {capitialize(user.nativeLanguage)}
                        </span>
                        <span className='flex items-center gap-1 border badge-outline rounded-full py-0.5 px-2 '>
                          {getLanguageFlag(user.learningLanguage)}
                          Learning: {capitialize(user.learningLanguage)}
                        </span>
                      </div>

                      {user.bio && (
                        <p className='text-sm line-clamp-2 opacity-80'>
                          {user.bio}
                        </p>
                      )}
                      <button className={`btn w-full mt-2 ${
                        hasRequestBeenSent?'btn-disabled':'btn-primary'}`}
                        onClick={()=>sendRequestMutation(user._id)}
                        disabled={hasRequestBeenSent||isPending}
                        >
                          {
                            hasRequestBeenSent?(
                              <div className='flex gap-1 items-center '>
                                <CheckCircleIcon className='size-4 mr-2'/>
                                Request Sent
                              </div>
                            ):(
                              <div className='flex gap-1 items-center'>
                                <UserPlusIcon className='size-4 mr-2'/>
                                Send Friend Request
                              </div>
                            )
                          }

                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

    </div>
    </div>
  )
}

export default Home

