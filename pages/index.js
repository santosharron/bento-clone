import React, { useRef, forwardRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import coffee from '@/assets/coffee.svg';
import dribble from '@/assets/dribble.svg';
import github from '@/assets/github.svg';
import linkedin from '@/assets/linkedin.svg';
import twitter from '@/assets/twitter.svg';
import youtube from '@/assets/youtube.svg';
import instagram from '@/assets/instagram.svg';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const heroRef = useRef(null);

  return (
    <div className='overflow-x-hidden'>
      <Head>
        <title>Bento - Elevate Your Online Presence</title>
        <meta name='description' content='Bento - Showcase your profile with custom links. Increase engagement by up to 60% with our powerful link-in-bio platform.' />
        <meta property='og:title' content='Bento - Elevate Your Online Presence' />
        <meta property='og:description' content='Bento - Showcase your profile with custom links. Increase engagement by up to 60% with our powerful link-in-bio platform.' />
        <meta property='og:url' content='https://bento-clone-mu.vercel.app/' />
        <meta name='twitter:title' content='Bento - Elevate Your Online Presence' />
        <meta name='twitter:description' content='Bento - Showcase your profile with custom links. Increase engagement by up to 60% with our powerful link-in-bio platform.' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='max-w-[1280px] mx-auto'>
        <HeroSection ref={heroRef} />
      </main>
    </div>
  );
}

const HeroSection = forwardRef((props, ref) => {
  return (
    <section ref={ref} className='relative w-full bg-gradient-to-b from-[#F9FAFB] to-white py-20 md:py-32 overflow-hidden'>
      <div className='container mx-auto flex flex-col items-center gap-8 px-4 md:px-8 justify-center'>
        <span className='flex flex-col items-center gap-2'>
          <OrigamiIcon className='h-12 w-12 text-gray-900' />
          <span className='text-2xl font-semibold text-gray-900'>Bento</span>
        </span>
        <div className='space-y-6 text-center'>
          <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 z-10'>
            Elevate Your <span className='text-blue-600'>Online Presence</span>
          </h1>
          <p className='max-w-[600px] mx-auto text-lg sm:text-xl text-gray-700 md:text-2xl'>
            Bento is a powerful link-in-bio platform that helps you showcase your best self online. Increase engagement by up to 60%.
          </p>
          <div className='flex flex-col gap-4 xs:flex-row justify-center'>
            <Link href={'/signup'} className='relative inline-block p-px font-semibold leading-6 text-white no-underline bg-blue-600 shadow-2xl cursor-pointer group rounded-xl shadow-blue-900'>
              <div className='relative z-10 flex items-center px-6 py-3 space-x-2 rounded-xl bg-blue-600 justify-center '>
                <span className=''>Create your Bento</span>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true' data-slot='icon' className='w-6 h-6'>
                  <path fill-rule='evenodd' d='M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z' clip-rule='evenodd'></path>
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <FloatingIcons />
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

function FloatingIcons() {
  const icons = [
    { src: coffee, alt: 'Coffee', className: 'top-5 left-[8%]' },
    { src: dribble, alt: 'Dribble', className: 'top-[10%] left-[2%]' },
    { src: github, alt: 'GitHub', className: 'top-[20%] left-[15%]' },
    { src: linkedin, alt: 'LinkedIn', className: 'bottom-[10%] left-[5%]' },
    { src: twitter, alt: 'Twitter', className: 'bottom-[20%] left-[20%]' },
    { src: youtube, alt: 'YouTube', className: 'bottom-[20%] right-[20%]' },
    { src: instagram, alt: 'Instagram', className: 'bottom-[10%] right-[5%]' },
    { src: coffee, alt: 'Coffee', className: 'top-[20%] right-[15%]' },
    { src: github, alt: 'GitHub', className: 'top-[10%] right-[2%]' },
    { src: dribble, alt: 'Dribble', className: 'top-5 right-[8%]' },
  ];

  return (
    <div className='hidden md:block absolute inset-0 overflow-hidden pointer-events-none'>
      {icons.map((icon, index) => (
        <Image
          key={index}
          className={`absolute w-8 h-8 md:w-12 md:h-12 animate-float  ${icon.className}`}
          src={icon.src}
          alt={icon.alt}
        />
      ))}
    </div>
  );
}

function OrigamiIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='M12 12V4a1 1 0 0 1 1-1h6.297a1 1 0 0 1 .651 1.759l-4.696 4.025' />
      <path d='m12 21-7.414-7.414A2 2 0 0 1 4 12.172V6.415a1.002 1.002 0 0 1 1.707-.707L20 20.009' />
      <path d='m12.214 3.381 8.414 14.966a1 1 0 0 1-.167 1.199l-1.168 1.163a1 1 0 0 1-.706.291H6.351a1 1 0 0 1-.625-.219L3.25 18.8a1 1 0 0 1 .631-1.781l4.165.027' />
    </svg>
  );
}