import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ShipWheelIcon } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import imagefile from '../../public/i.png'


import { login } from '../lib/api';

function Login() {

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })
  const navigate=useNavigate();
  const queryClient = useQueryClient()
  const { mutate: loginMutation, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] })
          navigate('/');

    }
  })
  const handlelogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  }
  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-[300px]' data-theme='forest'>
      {/* left box */}
      <div className='w-full md:w-1/2 p-4 sm:p-8 flex flex-col'>
        <div className='mb-4 flex items-center justify-start gap-2'>
          <ShipWheelIcon className='size-9 text-primary' />
          <span className='text-3xl fntbold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
            MeetBridge
          </span>
        </div>
        {
          error && (
            <div className='alert alert-error mb-4'>
              <span>{error.response.data.message}</span>
            </div>
          )
        }
        <div className='w-full'>
          <form onSubmit={handlelogin}>
            <div className='space-y-4'>
              <div>
                <h2 className='text-xl font-semibold'>Welcome back</h2>
                <p className='text-sm opacity-70'>
                  sign in to your account to continue your language journey
                </p>
              </div>

              <div className='flex flex-col gap-3'>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="">Email</label>
                  <input type="email" placeholder='sachin@gmail.com' required className='h-10 rounded-2xl bg-transparent border border-white/20 p-2' value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
                </div>
                <div className='flex flex-col gap-3'>
                  <div className='flex flex-col gap-1'>
                    <label htmlFor="">Password</label>
                    <input type="password" placeholder='sachin@123' required className='h-10 rounded-2xl bg-transparent border border-white/20 p-2' value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
                  </div>

                  <button className='bg-primary p-4 py-2 text-black text-xl rounded-full' type='submit'>{isPending ? (<div className='flex items-center justify-center gap-2'>Loading <span className='loading loading-bars'></span></div>) : "SignIn"}</button>

                  <div className='flex justify-center'>
                    <p className='font-normal text-[14px] pl-1'>
                      Don't have an Account?  <span className='text-primary mx-auto cursor-pointer' onClick={()=>{navigate('/signup')}}>Create one</span></p>
                  </div>


                </div>

              </div>
            </div>
          </form>

        </div>
        
        

      </div>
      {/* right div */}
        <div className='hidden  lg:flex w-full lg:w-1/2 justify-center items-center  bg-primary/10 relative left-   [-5px] z-10'>
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
  )
}

export default Login
