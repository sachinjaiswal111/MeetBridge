import { LoaderIcon } from 'lucide-react'
import React from 'react'
import useThemeStore from '../../store/useThemeStore'

function PageLoader() {
  const{theme}=useThemeStore()
  return (
    <div className='min-h-screen flex justify-center items-center' data-theme={theme}>
        <LoaderIcon className='animate-spin text-primary size-10'/>
    </div>
  )
}

export default PageLoader
