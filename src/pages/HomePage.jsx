import React, { useState } from 'react';
import Register from './Auth/Register';
import Login from './Auth/Login';
import Header from '../components/Header';

const HomePage = () => {

    const [switchPage,setSwitchPage]=useState(false);
    return (
        <div>
            <div className="bg-background-light dark:bg-background-dark text-med-dark dark:text-white font-display overflow-x-hidden transition-colors duration-200 min-h-screen flex flex-col">
  
  <Header/>
  
  <main className="flex-1 flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 lg:px-12 py-8 lg:py-0 max-w-[1440px] mx-auto w-full gap-12 lg:gap-20">
    <div className="hidden lg:flex flex-col justify-center flex-1 max-w-xl">
      <h1 className="text-4xl lg:text-5xl font-bold text-med-dark dark:text-white leading-[1.15] mb-6">
        Connect with the <br />
        <span className="text-primary">future of healthcare.</span>
      </h1>
      <p className="text-lg text-med-text-secondary dark:text-gray-400 mb-10 leading-relaxed">
        MedPulse bridges the gap between patients and medical professionals. Share symptoms securely, get verified advice, and join a community that cares.
      </p>
      <div className="space-y-8">
        <div className="flex items-start gap-4">
          <div className="size-12 rounded-2xl bg-white dark:bg-[#1a2c2c] shadow-sm border border-[#e5e7eb] dark:border-[#2a3838] flex items-center justify-center shrink-0 text-primary">
            <span className="material-symbols-outlined text-[28px]">verified_user</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-med-dark dark:text-white">Expert Guidance</h3>
            <p className="text-med-text-secondary dark:text-gray-400 mt-1 text-sm">Access insights from verified doctors and specialists quickly.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="size-12 rounded-2xl bg-white dark:bg-[#1a2c2c] shadow-sm border border-[#e5e7eb] dark:border-[#2a3838] flex items-center justify-center shrink-0 text-primary">
            <span className="material-symbols-outlined text-[28px]">vital_signs</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-med-dark dark:text-white">Symptom Tracking</h3>
            <p className="text-med-text-secondary dark:text-gray-400 mt-1 text-sm">Log your health data and receive community-driven analysis.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="size-12 rounded-2xl bg-white dark:bg-[#1a2c2c] shadow-sm border border-[#e5e7eb] dark:border-[#2a3838] flex items-center justify-center shrink-0 text-primary">
            <span className="material-symbols-outlined text-[28px]">lock</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-med-dark dark:text-white">Privacy First</h3>
            <p className="text-med-text-secondary dark:text-gray-400 mt-1 text-sm">Your medical data is encrypted and remains under your control.</p>
          </div>
        </div>
      </div>
    </div>

    { switchPage ? <Register setLoginPage={setSwitchPage}/> :<Login setRegisterPage={setSwitchPage}/>}

    <div className="mt-8 flex justify-center gap-6 text-sm text-med-text-secondary dark:text-gray-500 lg:hidden">
      <a className="hover:text-med-dark dark:hover:text-white transition-colors" href="#">Help Center</a>
      <a className="hover:text-med-dark dark:hover:text-white transition-colors" href="#">Privacy</a>
      <a className="hover:text-med-dark dark:hover:text-white transition-colors" href="#">Terms</a>
    </div>
  </main>
</div>
        </div>
    );
}

export default HomePage;
