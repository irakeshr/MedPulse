import React, { useState, useEffect } from 'react';

const MedPulseSplash = ({ finishLoading, onAnimationComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // We use a timer to simulate progress
    const timer = setInterval(() => {
       
      setProgress((prevProgress) => {
       
        // Rapidly fill the bar to 100%
        if (finishLoading) {
          const nextStep = prevProgress + 15; // Speed up closing animation
          if (nextStep >= 100) {
            clearInterval(timer);
            // Wait 200ms at 100% so the user sees it finish, then unmount
            if (onAnimationComplete) setTimeout(onAnimationComplete, 200);
            return 100;
          }
          return nextStep;
        }

        // 2. IF API IS STILL LOADING:
        // Increase slowly but STALL at 90% so we don't finish prematurely
        if (prevProgress >= 90) {
          return 90;
        }

        // Random slow increment to simulate "thinking"
        
        return prevProgress + Math.random() * 2;
      });
    }, 100); // Updates every 50ms

    return () => {
      clearInterval(timer);
    };
  }, [finishLoading, onAnimationComplete]);

  return (
    <main className="bg-background-light dark:bg-background-dark text-med-dark dark:text-white font-display overflow-hidden transition-colors duration-200 selection:bg-primary/30 h-screen w-full">
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
        
        {/* --- Background Gradients --- */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[100px] dark:bg-primary/5"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#618989]/10 rounded-full blur-[100px] dark:bg-[#618989]/5"></div>
        </div>

        {/* --- Center Content --- */}
        <div className="z-10 flex flex-col items-center justify-center gap-8 p-6">
          
          {/* Logo Icon */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative text-primary w-24 h-24 md:w-32 md:h-32 drop-shadow-sm animate-pulse">
              <svg 
                className="w-full h-full" 
                fill="currentColor" 
                viewBox="0 0 48 48" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  clipRule="evenodd" 
                  d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" 
                  fillRule="evenodd" 
                />
              </svg>
            </div>
          </div>

          {/* Text & Loading Bar */}
          <div className="flex flex-col items-center gap-3 text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-med-dark dark:text-white">
              MedPulse
            </h1>
            <div className="flex flex-col items-center gap-4">
              {/* Dynamic Status Text */}
              <p className="text-med-text-secondary dark:text-gray-400 text-sm md:text-base font-medium opacity-80 min-h-[24px]">
                {progress === 100 
                  ? "Welcome back" 
                  : "Connecting you to better health..."}
              </p>
              
              {/* Progress Bar Container */}
              <div className="h-1.5 w-48 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden mt-2">
                {/* Animated Inner Bar */}
                <div 
                  className="h-full bg-primary rounded-full relative overflow-hidden transition-all duration-100 ease-out"
                  style={{ width: `${progress}%` }}
                >
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-white/30 w-full h-full -translate-x-full animate-[translateX_1s_infinite]"></div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* --- Footer / Security Note --- */}
        <div className="absolute bottom-10 flex flex-col items-center gap-2 opacity-60">
          <div className="flex items-center gap-2 text-xs font-semibold text-med-text-secondary dark:text-gray-500 uppercase tracking-widest">
            {/* Ensure you have Material Icons loaded or replace with an SVG */}
            <span className="material-symbols-outlined text-[16px]">lock</span>
            Secure & Encrypted
          </div>
        </div>
        
      </div>
    </main>
  );
};

export default MedPulseSplash;