import Image from 'next/image';
import { CategoryNavbar } from './CategoryNavbar';

export const Navbar = () => {
  return (
    <>
      {/* // < !--Navbar -- > */}
      <div className="navbar justify-between pt-5 pb-5">
        {/* <!-- Logo --> */}

        <div className='pl-5'>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd" />
            </svg>
            <input type="text" className="grow" placeholder="Search here" />
          </label>
        </div>

        <div>
          <a href='/'>

          <Image alt="Logo" src="/images/logo.png" width={195} height={80} className="" />
          </a>
        </div>

        {/* <!-- Menu for desktop --> */}
        {/* <ul className="hidden menu sm:menu-horizontal gap-2">
          <li><a>About</a></li>
          <li><a>Pricing</a></li>
          <li><a>Blog</a></li>
          <li><a>Contact</a></li>
          <a className="btn btn-sm btn-primary">Log in</a>
        </ul> */}

        <div className="flex gap-5 pr-5">
          <a href='/posts/create' className="btn btn-neutral text-white">Blow the whistle</a>
          <a href='#' className="btn btn-sm btn-outline">English</a>
        </div>
      </div>

      <div className='bg-gray-300 h-[1px]'></div>

      <CategoryNavbar />

      <div className='bg-gray-300 h-[1px]'></div>

    </>
  );
};;