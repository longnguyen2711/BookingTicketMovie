import React from 'react'
import {NavLink} from 'react-router-dom'
import './Header.css'

export default function Header(props) {
  return (
    <header id="header" className="p-4 dark:bg-coolGray-800 dark:text-coolGray-100 bg-opacity-40 bg-black text-white fixed top-0 left-0 w-full z-10">
        <div className="container flex justify-between h-16 mx-auto max-w-screen-xl">
            <a id="header_home" href="#" aria-label="Back to homepage" className="flex items-center p-2">
                <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="cyberlearn.vn"/>
            </a>
            <ul className="items-stretch hidden space-x-3 lg:flex">
                <li className="flex">
                    <NavLink to="/home" className="flex items-center px-4 text-white" activeClassName='font-bold border-b-2 text-violet-400 border-violet-400'>Trang chủ</NavLink>
                </li>
                <li className="flex">
                    <NavLink to="/contact" className="flex items-center px-4 text-white" activeClassName='font-bold border-b-2 text-violet-400 border-violet-400'>Liên hệ</NavLink>
                </li>
                <li className="flex">
                    <NavLink to="/news" className="flex items-center px-4 text-white" activeClassName='font-bold border-b-2 text-violet-400 border-violet-400'>Tin tức</NavLink>
                </li>
                <li className="flex">
                    <NavLink to="/products" className="flex items-center px-4 text-white" activeClassName='font-bold border-b-2 text-violet-400 border-violet-400'>Sản phẩm</NavLink>
                </li>
            </ul>
            <div className="items-center flex-shrink-0 hidden lg:flex">
                <button className="self-center px-8 py-3 rounded">Sign in</button>
                <button className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-coolGray-900">Sign up</button>
            </div>
            <button className="p-4 lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-coolGray-100">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </div>
        <a class="back-to-top" href="#" title="Về đầu trang"><i class="fa fa-angle-up"></i></a>
    </header>
  )
}
