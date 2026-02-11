import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12 md:py-20">
      <div className="layout-content-container flex flex-col max-w-[560px] w-full">
        
        {/* Central Card Container */}
        <div className="bg-white dark:bg-[#162a2a] rounded-xl shadow-sm border border-[#13ecec]/10 dark:border-slate-800 p-8 md:p-12 text-center">
          
          {/* Status Icon (Subtle Error) */}
          <div className="flex justify-center mb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <span className="material-symbols-outlined !text-[40px] text-red-600 dark:text-red-400">
                error
              </span>
            </div>
          </div>

          {/* Error Message */}
          <div className="flex flex-col gap-3 mb-10">
            <h1 className="text-[#111818] dark:text-white text-2xl md:text-3xl font-bold leading-tight tracking-tight">
              Payment Failed
            </h1>
            <p className="text-[#4b5563] dark:text-gray-400 text-base leading-relaxed">
              We couldn't process your payment. Please check your card details, ensure you have sufficient funds, and try again.
            </p>
          </div>

          {/* Primary Action */}
          <div className="flex flex-col gap-4">
            <button 
              className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-[#102222] text-base font-bold transition-all hover:bg-primary/90 shadow-lg shadow-primary/20"
              onClick={() => navigate(-1)}
            >
              <span className="truncate">Back to Booking Section</span>
            </button>
            
            <button 
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-[#111818] dark:text-white/60 hover:text-primary transition-colors py-2" 
              onClick={() => navigate('/user')}
            >
              <span className="material-symbols-outlined !text-[18px]">home</span>
              Return to Dashboard
            </button>
          </div>
        </div>

        {/* Contact Support Info */}
        <div className="mt-8 text-center">
          <p className="text-[#618989] dark:text-gray-500 text-sm font-normal leading-normal px-4">
            If the problem persists, please contact our support team at{" "}
            <a 
              className="text-primary font-medium underline underline-offset-4" 
              href="mailto:support@medpulse.com"
            >
              support@medpulse.com
            </a>.
          </p>
        </div>
      </div>
    </main>
  );
};

export default PaymentFailed;
