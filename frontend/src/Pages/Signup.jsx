import React, { useState } from 'react'
import { ShipWheelIcon } from "lucide-react";
import imagefile from '../../public/i.png'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { signup } from '../lib/api';

function Signup() {

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate('/');
  const queryClient = useQueryClient();
  const { mutate: signupMuatation, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['authUser'] })
  })
  const handleSignup = (e) => {
    e.preventDefault();
    signupMuatation(signupData);
  }


  return (
    <div>
      <div className='h-screen p-4 sm:p-6 md:p-12 md:px-64  flex items-center justify-center   ' data-theme='forest'>
        {/* left box */}
        <div className=' sm:border border-primary/25 flex flex-col gap-2 md:gap-4 w-full  lg:w-1/2 sm:p-10 sm:py-14   rounded-l-xl bg-base-100 shadow-xl sm:border-r-0'>
          <div className='flex gap-2 items-center'>
            <ShipWheelIcon className='size-8 text-primary' />
            <span className='text-2xl text-primary'>MeetBridge</span>
          </div>
          {error && (
            <div className='alert alert-error mb-4'>
              <span>{error.response.data.message}</span>
            </div>
          )}
          <div>
            <p className='text-[18px] font-bold'>Create an Account</p>
            <p className='font-normal text-[12px]'>Join MeetBridge and start your language learning Adventure</p>
          </div>
          <form action="" className='flex flex-col gap-2' onSubmit={handleSignup}>
            <div className='flex flex-col gap-1'>
              <label htmlFor="">Full Name</label>
              <input type="text" placeholder='Sachin Kumar' required className='h-10 rounded-2xl bg-transparent border border-white/20 p-2' value={signupData.fullName} onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })} />
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor="">Email</label>
              <input type="email" placeholder='sachin@gmail.com' required className='h-10 rounded-2xl bg-transparent border border-white/20 p-2' value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} />
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor="">Password</label>
              <input type="password" placeholder='*********' required className='h-10 rounded-2xl bg-transparent border border-white/20 p-2' value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} />
              <p className='font-normal text-[12px] pl-1'>Password must be at least 6 charchter long</p>
            </div>
            <div className='flex items-center gap-2 pl-4'>
              <input type="checkbox" name="" id="" className='size-4 rounded-full' />
              <p className='font-normal text-[12px] pl-1'>I agree to the <span className='text-primary'>Terms of Service</span>  and <span className='text-primary'>Privacy Policy</span>.</p>
            </div>
            <button className='bg-primary p-4 py-2 text-black text-xl rounded-full' type='submit'>{isPending ? (<div className='flex items-center justify-center gap-2'>Loading <span className='loading loading-bars'></span></div>) : "Create Account"}</button>
            <div className='flex justify-center'>
              <p className='font-normal text-[14px] pl-1'>
                Allready have an Account?  <span className='text-primary mx-auto cursor-pointer' onClick={()=>navigate('/login')}>Signup</span></p>
            </div>


          </form>
        </div>
        {/* right */}
        <div className='hidden  lg:flex w-full lg:w-1/2 justify-center items-center  bg-primary/10 relative left-[-5px] z-10'>
          <div className='max-w-md p-4 py-2 backdrop-blur-md'>
            <div className='relative aspect-square max-w-sm mx-auto'>
              <img src={imagefile} alt="" />
            </div>
            <div className="text-center space-y-3 mt-6 p-4 ">
              <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
              <p className="opacity-70 ">
                Practice conversations, make friends, and improve your language skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
