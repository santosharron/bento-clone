import React, { useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const heroRef = useRef();

  useEffect(() => {
    // Your useEffect code here
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Head>
        <title>Bento - Elevate Your Online Presence</title>
        // Meta tags and other Head content
      </Head>

      <main className="max-w-[1280px] mx-auto">
        <HeroSection ref={heroRef} />
      </main>
    </div>
  );
}

const HeroSection = React.forwardRef((props, ref) => {
  // HeroSection component code
});

HeroSection.displayName = 'HeroSection';

function FloatingIcons() {
  // FloatingIcons component code
}

function OrigamiIcon(props) {
  // OrigamiIcon component code
}
