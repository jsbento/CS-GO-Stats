import React from 'react'

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="h-20 flex justify-center">
        <div className="flex justify-center items-center font-bold">
            CS:GO Stats Tracker by Jacob Benton
        </div>
    </footer>
  );
}

export default Footer;