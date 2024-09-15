'use client';
import Image from 'next/image';

export const Footer = () => {

  return (
    <div className='pt-10'>
      <div className='bg-black h-[2px]'></div>
      <div className="flex justify-between pt-5 pb-5">

        <div className='flex-1 flex justify-center items-center'>
          <a href='/'>
            <Image alt="Logo" src="/images/logo.png" width={220} height={100} className="" />
          </a>
        </div>

        <div className='flex-1 flex justify-center items-center'>
          <div className='card-body'>
            <h2>About Unmukto Bangladesh</h2>
            <p>
              An anonymous platform to expose corruptions and irregularities in different sectors of Bangladesh.
            </p>
            <p>
              This website doesn&apos;t accept donation or advertisement.
            </p>
          </div>
        </div>


        <div className='flex-1 flex justify-center items-center'>
          <div className='card-body'>
            <p>
              Contents published on this platform are open for journalists, government, or non government organizations to investigate.
            </p>
            <p>Since 2024</p>
          </div>
        </div>


      </div>


    </div>
  );
};;