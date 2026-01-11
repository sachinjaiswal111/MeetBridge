import React from 'react'
import { Routes,Route, Navigate } from 'react-router'   
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Call from './Pages/Call'

import Onboarding from './Pages/Onboarding'

import PageLoader from './component/PageLoader'

import useAuthUser from './hooks/useAuthUser.js'
import Layout from './component/Layout.jsx'
import useThemeStore from '../store/useThemeStore.js'
import NotificationPage from './Pages/NotificationPage.jsx'
import ChatPage from './Pages/Chat.jsx'
function App() {

    const {authUser,isLoading}=useAuthUser();
    const {theme}=useThemeStore();
    if(isLoading){return <PageLoader/>}
    const isAuthnaticated = Boolean(authUser);
    const isOnboarded = authUser?.isOnboarded;
    

  return (
    <div className=' h-screen ' data-theme={theme}>
       <Routes>
        <Route path='/' element={isOnboarded?<Layout showSidebar={true}><Home/></Layout>:<Navigate to={isAuthnaticated?"/onboarding":"/login"}/>}/>
        <Route path='/signup' element={!isAuthnaticated?<Signup/>:<Navigate to='/'/>}/>
        <Route path='/login' element={!isAuthnaticated?<Login/>:<Navigate to='/'/>}/>
        <Route path='/notificatoins'  element={isAuthnaticated && isOnboarded?<Layout showSidebar={true}><NotificationPage/></Layout>:<Navigate to={isAuthnaticated?"/onboarding":"/login"}/>}/>
        <Route path='/call/:id' element={
           isAuthnaticated && isOnboarded ? (
              <Call />
            ) : (
              <Navigate to={!isAuthnaticated? "/login" : "/onboarding"} />
            )
          } />
        <Route path='/chat/:id'element={isOnboarded?<Layout showSidebar={false}><ChatPage/></Layout>:<Navigate to={isAuthnaticated?"/onboarding":"/login"}/>}/>
        <Route path='/onboarding' element={isOnboarded?<Navigate to='/'/>:isAuthnaticated?<Onboarding/>:<Navigate to= "/login"/>}/>
        
       </Routes>
    </div>
  )
}

export default App
