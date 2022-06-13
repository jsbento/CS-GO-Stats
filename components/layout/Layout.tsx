import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout:React.FC = ({children}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-1 justify-center">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;