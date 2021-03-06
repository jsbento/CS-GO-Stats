import React from "react";
import Cookies from "js-cookie";

const AuthNav: React.FC = () => {
    const logout = () => {
      Cookies.remove("info");
      window.location.href = "/login";
    }

    return (
        <>
            <li className='hover:scale-105 font-bold'>
              <a href='/statistics'>View Stats</a>
            </li>
            <li className='hover:scale-105 font-bold'>
              <a href='/visualizations'>Visualizations</a>
            </li>
            <li className='hover:scale-105 font-bold'>
                <a href='/profile'>Profile</a>
            </li>
            <li className='hover:scale-105 font-bold'>
              <button className="font-bold" onClick={() => logout()}>Logout</button>
            </li>
        </>
    );
}

export default AuthNav;