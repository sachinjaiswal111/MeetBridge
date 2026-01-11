import React, { useState } from 'react'

import useAuthUser from '../hooks/useAuthUser'
import { onBoard } from '../lib/api.js';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { ShuffleIcon,MapPinIcon, ShipWheelIcon, LoaderPinwheel, LoaderIcon } from 'lucide-react';
import { LANGUAGES } from '../constant/index.js';


function Onboarding() {

  const { authUser } = useAuthUser();
  
  const [ formData, setFormData ] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic:authUser?.profilePic||""
  })
  const queryClient = useQueryClient();

  const { mutate: onBoardMuation, isPending, error } = useMutation({

    mutationFn: onBoard,
    onSuccess:()=>{
      console.log('ho gaya')
      
      queryClient.invalidateQueries({queryKey:['authUser']})
    }

  })

  const handleOnboard = (e) => {
    e.preventDefault();
    onBoardMuation(formData);
  }
  const changeAvatar =()=>{
    const idx = Math.floor(Math.random()*100)+1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`
    setFormData({...formData,profilePic:randomAvatar})

  }
 

  return (
    <div className='bg-base-100 w-screen md:flex md:justify-center h-screen p-4' data-theme='forest'>
      <div className=' px-4 py-4  md:py-1 md:px-10 md:w-1/2 flex flex-col gap-4 md:gap-1 items-center bg-base-200  '  >
        <div>
          <h1 className='text-2xl font-semibold'>Complete Your Profile</h1>
        </div>
        <form action="" className=' w-full flex flex-col gap-2 md:gap-0 text-xl md:text-[14px]' onSubmit={handleOnboard}>
          <div className='flex flex-col items-center gap-2'>
            <div>
              <img src={formData.profilePic} alt="" className='size-28' /></div>
            <button className='btn btn-accent ' onClick={changeAvatar} type='button'>
              <ShuffleIcon className='size-4 mr-2' />
              Genarte Random Avatar</button>
          </div>
          {error && (
            <div className='alert alert-error mb-4 '> 
              <span>{error.response.data.message}</span>
            </div>
          )}
          <div className='form-control w-full'>
            <label htmlFor="" className='label'>fullName</label>
            <input type="text" className='input input-bordered w-full' value={formData.fullName} placeholder={formData.fullName?formData.fullName:"Enter your full name"} onChange={(e)=>setFormData({...formData,fullName:e.target.value})}/>
          </div>
          <div className='form-control w-full'>
            <label htmlFor="" className='label'>Bio</label>
            <textarea type="text" className='textarea textarea-bordered h-22 rounded-md' value={formData.bio} onChange={(e)=>setFormData({...formData,bio:e.target.value})} placeholder='Write somthing about yourself ' />
          </div>

          <div className='w-full grid md:grid-cols-2'>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Native Language</span>
              </label>
              <select
                name="nativeLanguage"
                className="select select-bordered w-full"
                value={formData.nativeLanguage}
                onChange={(e)=>setFormData({...formData,nativeLanguage:e.target.value})}
              >
                <option value="">Select your native language</option>
                {LANGUAGES.map((lang) => (
                  <option key={`native-${lang}`} value={lang.toLowerCase()}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Learning Language</span>
              </label>
              <select
                name="nativeLanguage"
                className="select select-bordered w-full"
                value={formData.learningLanguage}
                onChange={(e)=>setFormData({...formData,learningLanguage:e.target.value})}
              >
                <option value="">Select your learning language</option>
                {LANGUAGES.map((lang) => (
                  <option key={`native-${lang}`} value={lang.toLowerCase()}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='form-control w-full'>
            <label htmlFor="" className='label'>Location</label>
            <div className='relative'>
               <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
            <input type="text" className='input input-bordered w-full px-10' placeholder='City,Country' value={formData.location} onChange={(e)=>setFormData({...formData,location:e.target.value})} />
            </div>
          </div>

          <button className='btn btn-primary w-full mt-2 md:mt-4 flex gap-4 justify-center items-center ' type='submit'>
            <ShipWheelIcon className='size-7'/>
            {isPending?<LoaderIcon/>:"Complete Onboarding"}
          </button>

        </form>
      </div>
    </div>
  )
}

export default Onboarding
