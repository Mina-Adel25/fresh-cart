import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function LoaderScreen() {
  return (
    <div className="fixed top-0 left-0 h-screen  w-screen z-[999] flex flex-col justify-center items-center 
      bg-gradient-to-br from-green-50 via-white to-green-100 
      overflow-hidden">

 
      <div className="w-40 h-40 md:w-60 md:h-60 flex flex-col justify-center items-center">
        <DotLottieReact
          src="https://lottie.host/998dd09f-544f-43f4-a515-fb9f67035174/54KaW0osii.lottie"
          loop
          autoplay
        />
      </div>
    </div>
  );
}
