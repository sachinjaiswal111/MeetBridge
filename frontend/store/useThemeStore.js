import { create } from 'zustand'

 const useThemeStore= create((set) => ({
  theme:localStorage.getItem("theme")||"coffee",
  changeTheme: (newTheme) => {
    set({ theme: newTheme })
    localStorage.setItem("theme",newTheme)
  },
}))

export default useThemeStore;