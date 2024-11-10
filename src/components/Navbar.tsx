'use client';
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { useAuth } from '@/utils/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { CategoryNavbar } from './CategoryNavbar';
import { useDispatch } from 'react-redux';
import { logout, setCredentials } from '@/libs/redux-store/apiSlice/authApi';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { isAuthenticated } = useAuth();
  const router = useRouter();  const dispatch = useDispatch();


  const handleLogout = () => {
    try {
      dispatch(logout());
      router.push('/'); // Redirect to login page
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') ?? "") : null;
    if (token) {
      dispatch(setCredentials({ token, user })); // Set token if it exists
    }
  }, [dispatch]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e : React.KeyboardEvent<HTMLInputElement> ) => {
    console.log(e);
    if (e.key === 'Enter') {
      const value = (e.target as HTMLInputElement).value; 
      console.log('enter pressed');

      router.push(`/posts/search/${value}`);
    }
  };

  return (
    <nav className="w-full">
      {/* Top Section */}
      <div className="flex items-center justify-between p-5">
        {/* Hamburger Menu for mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="btn btn-ghost btn-circle text-xl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>
        </div>

        {/* Search Bar for desktop */}
        <div className="hidden md:flex">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
              <input type="text" onKeyDown={handleKeyDown} className="grow" placeholder="Search here" />
          </label>
        </div>

        {/* Logo */}
        <div className="text-xl font-bold">
          <a href='/'>
            <Image alt="Logo" src="/images/logo.png" width={195} height={80} className="" />
          </a>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-2">
          <a href='/posts/create' className="btn btn-sm lg:btn-md btn-neutral text-white">Blow the whistle</a>
          <a href='#' className="hidden md:flex btn btn-sm btn-outline">English</a>
          {isAuthenticated ?
            <a onClick={handleLogout} className="hidden md:flex btn btn-sm">Logout</a>
            :
            <a href='/login' className="hidden md:flex btn btn-sm">Login</a>
          }
        </div>
      </div>


      <div className='bg-gray-300 h-[1px]'></div>

      {/* Category List for desktop */}
      <div className="hidden md:flex justify-center py-2">
        <CategoryNavbar />
      </div>

      <div className='bg-gray-300 h-[1px]'></div>

      {/* Drawer for mobile (search and categories) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex flex-col lg:hidden">
          <div className="w-64 bg-white h-full p-6">
            <button
              className="btn btn-square btn-ghost mb-4"
              onClick={() => setIsOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {/* Search input */}
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
              <input type="text" className="grow" placeholder="Search here" />
            </label>

            {/* Vertical categories */}
            <div className="space-y-4">
              <CategoryNavbar />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
