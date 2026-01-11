import React from 'react'
import { THEMES } from '../constant'
import { PaletteIcon } from 'lucide-react'
import useThemeStore from '../../store/useThemeStore'

export default function ThemeSelctor() {
    const{theme,changeTheme}=useThemeStore();
    return (
        <div className="dropdown dropdown-bottom dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1"><PaletteIcon /></div>
            <ul tabIndex="-1" className="dropdown-content  bg-base-100 rounded-box z-1 h-72 w-[250px]  p-2 shadow-sm overflow-y-auto ">
                {
                    THEMES.map((option) => (
                        <div key={option.name} className=' p-1 w-62'>
                            <button className={`btn flex  gap-2 w-full ${theme==option.name?"btn-active":""}`} onClick={()=>changeTheme(option.name)}>
                                <PaletteIcon />
                                {option.label}
                                <div className="ml-auto flex gap-1">
                                    {
                                        option.colors.map((color, i) => (
                                        <span
                                            key={i}
                                            className="size-2 rounded-full"
                                            style={{ backgroundColor: color }}>

                                        </span>
                                    ))}
                                        

                                </div>
                            </button>

                        </div>
                    ))
                }
            </ul>
        </div>

    )
}
