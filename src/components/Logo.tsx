import React from 'react';
// @ts-ignore
import mascotLogo from '../assets/images/mascot_logo_1783832614879.jpg';

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = '', size = 40 }: LogoProps) {
  return (
    <img
      src={mascotLogo}
      width={size}
      height={size}
      className={`rounded-full object-cover inline-block ${className}`}
      style={{ width: size, height: size }}
      alt="Melbourne Animal CT Logo"
      referrerPolicy="no-referrer"
    />
  );
}


