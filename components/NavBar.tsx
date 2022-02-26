import { Button } from '@chakra-ui/react';
import React from 'react';
import Logo from './Logo';

const NavBar = () => {
  return (
    <>
        <ul className='flex justify-end p-10 gap-5 items-center'>
            <li className='mr-auto'><Logo></Logo></li>
            <li className='hover:scale-105 font-bold'>Item 1</li>
            <li className='hover:scale-105 font-bold'>Item 2</li>
            <li className='hover:scale-105 font-bold'>Item 3</li>
            <Button>Sign In</Button>
        </ul>
    </>
  );
}

export default NavBar;