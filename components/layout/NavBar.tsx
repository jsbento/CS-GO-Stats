import React from "react";
import AuthNav from "./AuthNav";
import Logo from "./Logo";
import Cookies from "js-cookie";

const NavBar:React.FC = () => {
  return (
    <>
        <ul className='flex justify-end p-8 gap-5 items-center bg-gray-800 text-white mb-5'>
            <li className='mr-auto'><Logo /></li>
            { Cookies.get('info') ?
                <AuthNav /> : <li><a className='hover:scale-105 font-bold' href='/login'>Login</a></li>
            }
        </ul>
    </>
  );
}

export default NavBar;