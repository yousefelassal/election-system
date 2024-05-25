import { useLocation } from "react-router-dom";
import { useUserStore } from "../stores/user"
import {Button} from "@nextui-org/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, removeUser } = useUserStore()
  const { pathname } = useLocation()
  const tabs = [
    {href: '/', text: user.admin ? 'Panel' : 'Home'},
    {href: '/stats', text: 'Stats'},
  ]
  return (
    <div className="flex items-center justify-between p-4 lg:px-8">
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44" fill="none">
            <path d="M23 0L23.823 3.36707C25.109 8.62855 25.752 11.2593 27.1233 13.3821C28.336 15.2593 29.9527 16.8418 31.8554 18.0139C34.0071 19.3395 36.651 19.926 41.9388 21.0991L46 22L41.9388 22.9009C36.651 24.074 34.0071 24.6605 31.8554 25.9861C29.9527 27.1582 28.336 28.7407 27.1233 30.6179C25.752 32.7407 25.109 35.3714 23.823 40.6329L23 44L22.177 40.6329C20.891 35.3714 20.248 32.7407 18.8767 30.6179C17.664 28.7407 16.0473 27.1582 14.1446 25.9861C11.9929 24.6605 9.34898 24.074 4.06116 22.9009L0 22L4.06116 21.0991C9.34897 19.926 11.9929 19.3395 14.1446 18.0139C16.0473 16.8418 17.664 15.2593 18.8767 13.3821C20.248 11.2593 20.891 8.62855 22.177 3.36707L23 0Z" fill="#006FEE"/>
        </svg>
        <div className="flex flex-row p-1 bg-[#E0E0E0] rounded-xl gap-2 items-center justify-center min-w-[100px]">
            {tabs.map(tab => (
            <Link key={tab.href} to={tab.href} className={`flex flex-col flex-1 rounded-lg gap-1 text-sm relative items-center justify-center px-5 py-2 ${pathname === tab.href ? 'text-black' : 'text-gray-500 hover:text-gray-900'} cursor-pointer transition-colors`}>
                <span className="z-10 font-medium">{tab.text}</span>
                {
                    pathname === tab.href && (
                        <>
                            <motion.div 
                                layout
                                layoutId="bg"
                                className="absolute w-full h-full rounded-xl bg-white"
                                initial={false}
                            />
                        </>
                    )
                }
            </Link>
            ))}
        </div>
        <div className="flex gap-2 items-center">
            <Button variant="faded" onClick={removeUser}>Logout</Button>
        </div>
    </div>
  )
}

export default Header