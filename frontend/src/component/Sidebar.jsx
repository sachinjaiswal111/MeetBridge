import React from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { useLocation } from 'react-router'
import { BellIcon, DotIcon, HomeIcon, ShipWheelIcon, User } from 'lucide-react'
import { Link } from 'react-router'

function Sidebar() {
    const {authUser}=useAuthUser()
    const location=useLocation()
    const currentPath=location.pathname;
  return (
   <aside className='w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0'>
    <div className='p-5 border-b border-base-300'>
        <Link to='/' className='flex items-center gap-2.5'>
            <ShipWheelIcon className='size-9 text-primary'/>
            <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
                MeetBridge
            </span>
        </Link>
    </div>
    <nav className='flex-1 p-4 space-y-1'>
        <Link to="/" className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case rounded ${currentPath=='/'?"btn-active":""} `}>
        <HomeIcon className='size-5 text-base-content opacity-70 '/>
        <span>Home</span>
        </Link>
        <Link to="/friends" className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath=='/friends'?"btn-active":""} rounded `}>
        <User className='size-5 text-base-content opacity-70'/>
        <span>friends</span>
        </Link>
        <Link to="/notificatoins" className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case rounded ${currentPath=='/notificatoins'?"btn-active":""} `}>
        <BellIcon className='size-5 text-base-content opacity-70'/>
        <span>notificatoins</span>
        </Link>

    </nav>
    <div className='flex gap-4 p-4'>
        <div>
            <img src={authUser.profilePic} alt="user profile " className='size-11' />
        </div>
        <div className='flex flex-col'>
            <p>{authUser.fullName}</p>
            <span className='text-primary inline-flex items-center'><DotIcon/> online</span>
        </div>

    </div>
   </aside>
  )
}

export default Sidebar
