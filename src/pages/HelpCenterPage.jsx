import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HelpCenterPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const helpCategories = [
    {
      icon: 'account_circle',
      title: 'Account Support',
      description: 'Manage your profile, security settings, and subscription plans. Everything you need to keep your account secure and up-to-date.',
      link: '/contact',
      accentColor: 'primary',
      items: [
        { text: 'Reset your password', icon: 'arrow_forward' },
        { text: 'Update billing information', icon: 'arrow_forward' },
        { text: 'Two-factor authentication', icon: 'arrow_forward' },
      ]
    },
    {
      icon: 'patient_list',
      title: 'Patient Guide',
      description: 'How to manage your health records, message your doctor, and book new appointments.',
      link: '/contact',
      accentColor: 'secondary',
      items: []
    },
    {
      icon: 'medical_services',
      title: 'Doctor Guide',
      description: 'Clinical tools, telemedicine setup, patient monitoring, and prescription management tutorials.',
      link: '/contact',
      accentColor: 'tertiary',
      items: []
    },
    {
      icon: 'security',
      title: 'Privacy & Security',
      description: 'Understand how we protect your data with HIPAA-compliant encryption and privacy protocols.',
      link: '/contact',
      accentColor: 'primary',
      items: []
    }
  ];

  const quickLinks = [
    { label: 'System Status', status: 'operational', icon: null },
    { label: 'Release Notes', icon: 'history' },
    { label: 'Community Forum', icon: 'forum' },
    { label: 'API Documentation', icon: 'code' },
  ];

  const faqs = [
    {
      question: 'How do I export my medical history for another clinic?',
      answer: 'You can export your clinical summary as a PDF or secure digital file from the "Records" tab in your profile. Select "Export All" and choose your preferred format. Your data is exported in compliance with healthcare data transfer regulations.'
    },
    {
      question: 'Can I manage health profiles for my family members?',
      answer: 'Yes, MedPulse supports "Guardian Mode." You can link minor accounts or elderly family profiles to your primary login with authorized legal consent forms. This allows you to manage appointments and health records for dependents under your care.'
    },
    {
      question: 'Is telemedicine available 24/7?',
      answer: 'Our clinical network provides 24/7 urgent care access. For specific specialist appointments, availability depends on individual practitioner schedules. You can view real-time availability when booking through the appointment system.'
    },
    {
      question: 'How do I verify my medical credentials?',
      answer: 'Medical professionals can submit their credentials through the verification portal. Our clinical admin team reviews all submissions within 48 hours. Verified practitioners receive a badge displayed on their profile.'
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'MedPulse accepts all major credit cards, debit cards, and supports integration with major insurance providers. Telehealth consultations may be covered by your insurance plan - check with your provider for coverage details.'
    }
  ];

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-med-dark dark:text-white font-display overflow-x-hidden transition-colors duration-200 min-h-screen flex flex-col">
      <main className="flex-1 pt-24 pb-20 px-6 max-w-7xl mx-auto w-full">
        <header className="text-center mb-16 space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-med-dark dark:text-white tracking-tight">
              How can we help you today?
            </h1>
            <p className="text-med-text-secondary dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Search our knowledge base for guides, FAQs, and clinical resources to streamline your sanctuary experience.
            </p>
          </div>
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-med-text-secondary dark:text-gray-400">search</span>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-32 py-5 rounded-xl bg-[#e6e8ea] dark:bg-[#253636] border-none focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-[#1a2c2c] text-med-dark dark:text-white placeholder:text-med-text-secondary dark:placeholder:text-gray-400 transition-all duration-300 shadow-sm"
              placeholder="Search for 'Password recovery' or 'Patient scheduling'..."
            />
            <div className="absolute right-3 top-3">
              <button className="bg-primary text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-[#0070ea] transition-colors">
                Search
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-8 bg-surface-container-lowest dark:bg-[#1a2c2c] p-10 rounded-xl flex flex-col justify-between group cursor-pointer transition-all hover:bg-[#f2f4f6] dark:hover:bg-[#253636] border-b-4 border-transparent hover:border-primary/10">
            <div>
              <div className="w-14 h-14 bg-[#d8e2ff] dark:bg-[#004493] rounded-xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary dark:text-white text-3xl">account_circle</span>
              </div>
              <h2 className="text-3xl font-bold text-med-dark dark:text-white mb-4">Account Support</h2>
              <p className="text-med-text-secondary dark:text-gray-400 text-lg mb-8 max-w-md">
                Manage your profile, security settings, and subscription plans. Everything you need to keep your account secure and up-to-date.
              </p>
              <ul className="space-y-3">
                {helpCategories[0].items.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-primary font-semibold hover:translate-x-1 transition-transform cursor-pointer">
                    <span className="material-symbols-outlined text-sm">arrow_forward</span> {item.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 flex justify-end">
              <Link to="/contact">
                <span className="material-symbols-outlined text-[#c1c6d7] dark:text-gray-500 group-hover:text-primary transition-colors text-4xl">north_east</span>
              </Link>
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 bg-[#76f3ea]/20 dark:bg-[#1a2c2c] p-8 rounded-xl flex flex-col">
            <h3 className="text-xl font-bold text-med-dark dark:text-white mb-6">Quick Links</h3>
            <div className="flex flex-col gap-4">
              {quickLinks.map((link, index) => (
                <a key={index} href="#" className="p-4 bg-surface-container-lowest dark:bg-[#253636] rounded-lg flex items-center justify-between group hover:bg-white dark:hover:bg-[#2a3838] transition-all">
                  <span className="font-medium text-med-dark dark:text-white">{link.label}</span>
                  {link.status === 'operational' ? (
                    <span className="w-2 h-2 rounded-full bg-[#006b1b]"></span>
                  ) : (
                    <span className="material-symbols-outlined text-[#717786] group-hover:text-primary">{link.icon}</span>
                  )}
                </a>
              ))}
            </div>
            <div className="mt-auto pt-8">
              <div className="p-6 bg-primary rounded-xl text-white">
                <p className="text-sm font-medium mb-2 opacity-80">Need live help?</p>
                <p className="font-bold mb-4">Chat with a Support Agent</p>
                <Link to="/contact">
                  <button className="w-full bg-white text-primary py-2 rounded-lg font-bold text-sm hover:bg-[#d8e2ff] transition-colors">
                    Start Chat
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {helpCategories.slice(1).map((category, index) => (
            <div key={index} className={`col-span-12 md:col-span-4 bg-surface-container-lowest dark:bg-[#1a2c2c] p-8 rounded-xl transition-all hover:bg-[#f2f4f6] dark:hover:bg-[#253636] border-b-4 border-transparent hover:border-${category.accentColor === 'secondary' ? '[#79f6ed]/10' : category.accentColor === 'tertiary' ? '[#94f990]/10' : 'primary/10'} cursor-pointer`}>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${
                category.accentColor === 'secondary' 
                  ? 'bg-[#79f6ed] text-[#00201e]' 
                  : category.accentColor === 'tertiary'
                  ? 'bg-[#94f990] text-[#002204]'
                  : 'bg-[#d8e2ff] text-primary'
              }`}>
                <span className="material-symbols-outlined text-2xl">{category.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-med-dark dark:text-white mb-3">{category.title}</h3>
              <p className="text-med-text-secondary dark:text-gray-400 text-sm mb-6">{category.description}</p>
              <Link to="/contact" className="text-primary font-bold text-sm flex items-center gap-1 group">
                Explore Guides <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
          ))}
        </div>

        <section className="mt-24">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-med-dark dark:text-white">Frequently Asked Questions</h2>
            <Link to="/contact" className="text-primary font-bold hover:underline">View All FAQs</Link>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-surface-container-lowest dark:bg-[#1a2c2c] rounded-xl p-6 flex items-start gap-4 cursor-pointer hover:bg-[#f2f4f6] dark:hover:bg-[#253636] transition-colors"
                onClick={() => toggleFaq(index)}
              >
                <div className=" bg-[#d8e2ff] dark:bg-[#004493] w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined  text-xl">help_outline</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-med-dark dark:text-white mb-2">{faq.question}</h4>
                  {expandedFaq === index && (
                    <p className="text-med-text-secondary dark:text-gray-400 leading-relaxed">{faq.answer}</p>
                  )}
                </div>
                <span className="material-symbols-outlined text-med-text-secondary dark:text-gray-400 transition-transform duration-300">
                  {expandedFaq === index ? 'expand_less' : 'expand_more'}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 rounded-2xl bg-gradient-to-br from-primary to-[#0070ea] p-12 text-center text-white relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-[#76f3ea]/20 rounded-full blur-3xl"></div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Still looking for answers?</h2>
            <p className="text-lg text-[#d8e2ff] max-w-xl mx-auto">
              Our dedicated support sanctuary is here for you. Reach out to us via email or schedule a callback with our tech-clinical team.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link to="/contact">
                <button className="bg-white text-primary px-10 py-4 rounded-full font-bold shadow-xl hover:bg-[#d8e2ff] transition-all">
                  Contact Support
                </button>
              </Link>
              <button className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-all">
                Visit the Community
              </button>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
};

export default HelpCenterPage;
