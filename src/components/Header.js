import React, { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import {Link} from 'gatsby'

const HeaderItem = ({text}) => {
    return (
        <a href="#responsive-header" class="px-5 py-3 rounded-md hover:bg-background-hover block lg:inline-block lg:mt-0 text-font hover:text-white">
            {text}
        </a>
    )
}

const Header = ({ title }) => {
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    const handleMenuClicked = (e) => {
        setIsMenuOpened(!isMenuOpened)
    }

    const headerIcon = (
        <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" /></svg>
    )
    const menuButton = (
        <button onClick={handleMenuClicked}>
            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
        </button>
    )
    return (
        <nav class="flex items-center justify-between flex-wrap p-6">
            <div class="flex items-center flex-shrink-0 text-textTitle mr-6">
                {headerIcon}
                <Link to='/'>
                    <span class="font-semibold text-xl tracking-tight">{title}</span>
                </Link>
            </div>
            <div class="block lg:hidden">
                <button class="flex items-center px-3 py-2 border rounded text-font border-font hover:text-white hover:border-white">
                    {menuButton}
                </button>
            </div>
            <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto` + (isMenuOpened ? '' : ' hidden')}>
                {/* LEFT HEADER */}
                <div class="text-sm lg:flex-grow">
                    <HeaderItem text='Blog'/>
                    <HeaderItem text='About'/>
                </div>
                {/* RIGHT HEADER */}
                <div>
                    <div className='ml-4'>
                        <ThemeToggle />
                    </div>
                    {/* <a href="#" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Download</a> */}
                </div>
            </div>
        </nav>
    )

    // return (
    //     <div className="w-full flex justify-between items-center py-8 px-4">
    //         <div>
    //             <Link
    //                 className="border-none text-textTitle font-medium text-2xl"
    //                 style={{
    //                     boxShadow: 'none',
    //                     textDecoration: 'none',
    //                 }}
    //                 to={'/'}
    //             >
    //                 {title}
    //             </Link>
    //         </div>
    //         <div className="font-normal text-xl flex items-center">
    //             <span className="px-5 py-3 hover:bg-background-hover rounded-md mr-3">
    //                 About
    //             </span>
    //             <ThemeToggle />
    //         </div>
    //     </div>
    // )
}

export default Header