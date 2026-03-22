import React from 'react';

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'Dr. Elena Ross',
      role: 'Chief Medical Officer',
      description: '20 years in neurosurgery. Advocating for digitized patient safety.',
      isLead: true,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC21J8lG717pOAGEQHzh4zrRSggoJtQjxQLneytrvzaxo4QeWHWxFFdFFgqA7TDWt7ivfkHznSLJkzBOZnYGvCxHeHCNCDHzLJc4W_rpLdyxmp40Xf13h2GNYc__SOWQYIczh9d14PU3_Uk7EVvEdlpEbtFhRyZ7H8yAPgmuWZkVzJiuNaeo-oDUWS__67Hc9XIK0f_mRsIulEkecv2z4miLuDgvnrG3yzUfnsiQ5I_2hKvG9A9mT3VXdxsb6pq9r1SPHoHry1yw-w'
    },
    {
      name: 'Marcus Thorne',
      role: 'Head of Design',
      description: 'Ex-Apple design lead focused on human-centric health UI.',
      isLead: false,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgKMIAz2yX9usyxrmpTD3nX5x5obZaL6INOhaPDic_H0Za_eNm3ID_ZQZ61r8er2nG9DleDAzyFH-MTIMy9uBARgvaEkAGjZApbJbFIrkvZjvbMlYmrh_e2ylcXERkhb1M1QgOD3VUYOTWWfzQvFDC7n76V9N1rrZMxL7CYlAF_r6srHujD521_Q2rd4XHwuTbmWX2kH8_VPbdwikJhp5ffXE-HqaAigEBvSuT13Dczjlo9S3GOlYy-pK82Z3J0sEpWl3WAPUVttg'
    },
    {
      name: 'Sarah Chen',
      role: 'CTO',
      description: 'AI researcher specializing in medical diagnostic accuracy.',
      isLead: false,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARJVPb3qLWmInGhhrFHUifVC20w4a54oA-9YmbuAT19mgChr-ZG7XmHcqVdfwlUAbvoRXs45zITjHem4XNWmApHwi-1vKb5P-mD_LByniY-TKBikk2GvpYrRnTbMkaFyFZEJy1UjCUXLIRQL5snIMRpp0bLueHOMxbhoEhnk9Mi2nEJ8fS5qZbWle1fUWZvLDF0-CP2zcgFgJW_JIvGnYmcB5E1pqyzBJSrpBAXd_tuyrBkwqpSL_SIviXHOHZmnDviioz1vp5730'
    },
    {
      name: 'Dr. Julian Vance',
      role: 'VP Clinical Research',
      description: 'Epidemiologist leading our data verification protocols.',
      isLead: false,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsDnSgoUICKoDLXJQlMNDx3Br1dPNXPMzaB-fGQNwJeB79H4evbxB5Alq1ovCsN2w1wCHEjU_cQKUKNd3vzGzWrhSbvMv8jxSFxKXcK7pHWj7uSt30tKNGt0iu2ccaJdkLbPs4r5KAyE-RYzoKw47aMIG2GtzLo4lOpO-mU9dz6Klyx-iBNI3BgEJzn7tSMqSB7VLQTFWXy88chQbNRWHhBahQNlmAVhQxkUENuN8ICyvx3p771Cx01Jauvf4wMJnT3njobgnRmnM'
    }
  ];

  return (
    <div className="pt-8 pb-20">
        <section className="max-w-7xl  mx-auto px-6 py-20 md:py-24">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#76f3ea] text-[#002204] text-xs font-bold mb-6 tracking-wider uppercase">
              Our Mission
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-med-dark dark:text-white leading-[1.1] mb-8 tracking-tight">
              A clinical sanctuary for the{' '}
              <span className="text-primary italic">modern healer.</span>
            </h1>
            <p className="text-lg md:text-xl text-med-text-secondary dark:text-gray-400 leading-relaxed font-light">
              MedPulse was born from a simple observation: medical professionals deserve a space that feels as sophisticated and thoughtful as the work they do. We are redefining medical networking through a lens of serenity and precision.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto pt-15 px-6 mb-32">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-8 bg-surface-container-lowest dark:bg-[#1a2c2c] rounded-xl p-10 md:p-14 relative overflow-hidden group">
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-med-dark dark:text-white mb-6">Our Story</h2>
                <div className="space-y-6 text-med-text-secondary dark:text-gray-400 leading-relaxed">
                  <p>Founded in 2022, MedPulse started as a small collaboration between three cardiologists and two software architects who were tired of the "noise" in traditional professional networks.</p>
                  <p>They envisioned a platform where verified clinical knowledge could flow freely, without the clutter of non-essential content. A place where the interface itself worked to reduce the cognitive load of a physician's day.</p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            </div>

            <div className="col-span-12 md:col-span-4 bg-primary text-white rounded-xl p-10 flex flex-col justify-between">
              <div>
                <span className="material-symbols-outlined text-4xl text-black mb-6">visibility</span>
                <h3 className="text-2xl text-black font-bold mb-4">The Vision</h3>
                <p className="text-black font-light">To become the global standard for clinical exchange, where every interaction contributes to the collective health of humanity.</p>
              </div>
            </div>

            <div className="col-span-12 md:col-span-4 bg-[#1e862d] text-white rounded-xl p-10">
              <h3 className="text-xl font-bold mb-4">Integrity First</h3>
              <p className="text-sm opacity-90 leading-relaxed">Every account is verified. Every post is peer-reviewed. We prioritize clinical truth over engagement metrics.</p>
            </div>

            <div className="col-span-12 md:col-span-8 bg-surface-container-highest dark:bg-[#2a3838] rounded-xl p-10 flex items-center justify-between flex-wrap gap-8">
              <div className="flex flex-col">
                <span className="text-4xl font-extrabold text-primary">50k+</span>
                <span className="text-xs font-bold uppercase tracking-widest text-med-text-secondary dark:text-gray-400">Verified Specialists</span>
              </div>
              <div className="hidden md:block h-12 w-px bg-[#c1c6d7]/30 dark:bg-gray-600/30"></div>
              <div className="flex flex-col">
                <span className="text-4xl font-extrabold text-primary">120+</span>
                <span className="text-xs font-bold uppercase tracking-widest text-med-text-secondary dark:text-gray-400">Hospitals Joined</span>
              </div>
              <div className="hidden md:block h-12 w-px bg-[#c1c6d7]/30 dark:bg-gray-600/30"></div>
              <div className="flex flex-col">
                <span className="text-4xl font-extrabold text-primary">99.9%</span>
                <span className="text-xs font-bold uppercase tracking-widest text-med-text-secondary dark:text-gray-400">Uptime SLA</span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low dark:bg-[#1a2c2c] py-24 mb-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-med-dark dark:text-white mb-4">Why MedPulse?</h2>
              <p className="text-med-text-secondary dark:text-gray-400 max-w-2xl mx-auto">Beyond just networking, we provide the tools for a sustainable medical career.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-surface-container-lowest dark:bg-[#1a2c2c] p-8 rounded-xl hover:shadow-xl transition-all duration-300 border border-[#e5e7eb] dark:border-gray-700">
                <div className="w-12 h-12 bg-[#76f3ea] rounded-lg flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-[#002204]">shield</span>
                </div>
                <h4 className="text-xl font-bold text-med-dark dark:text-white mb-3">Clinical Privacy</h4>
                <p className="text-med-text-secondary dark:text-gray-400 text-sm leading-relaxed">End-to-end encrypted discussions for sensitive cases. Compliant with global healthcare privacy standards including HIPAA and GDPR.</p>
              </div>
              <div className="bg-surface-container-lowest dark:bg-[#1a2c2c] p-8 rounded-xl hover:shadow-xl transition-all duration-300 border border-[#e5e7eb] dark:border-gray-700">
                <div className="w-12 h-12 bg-[#76f3ea] rounded-lg flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-[#002204]">psychology</span>
                </div>
                <h4 className="text-xl font-bold text-med-dark dark:text-white mb-3">Burnout Mitigation</h4>
                <p className="text-med-text-secondary dark:text-gray-400 text-sm leading-relaxed">An interface designed by cognitive psychologists to reduce eye strain and digital fatigue during long shifts.</p>
              </div>
              <div className="bg-surface-container-lowest dark:bg-[#1a2c2c] p-8 rounded-xl hover:shadow-xl transition-all duration-300 border border-[#e5e7eb] dark:border-gray-700">
                <div className="w-12 h-12 bg-[#76f3ea] rounded-lg flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-[#002204]">groups</span>
                </div>
                <h4 className="text-xl font-bold text-med-dark dark:text-white mb-3">Global Collaboration</h4>
                <p className="text-med-text-secondary dark:text-gray-400 text-sm leading-relaxed">Instant consultation tools that connect you with top-tier specialists from across the globe in seconds.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-med-dark dark:text-white mb-2">The Architects of Care</h2>
              <p className="text-med-text-secondary dark:text-gray-400">Combining medical excellence with technological precision.</p>
            </div>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-[#006b1b]"></div>
              <div className="w-2 h-2 rounded-full bg-primary/20"></div>
              <div className="w-2 h-2 rounded-full bg-primary/20"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-surface-container-lowest dark:bg-[#1a2c2c] rounded-xl overflow-hidden group border border-[#e5e7eb] dark:border-gray-700">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    src={member.image}
                    alt={member.name}
                  />
                  {member.isLead && (
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-[#006b1b] rounded-full shadow-lg">
                        <span className="w-2 h-2 bg-[#94f990] rounded-full animate-pulse"></span>
                        <span className="text-[10px] text-white font-bold tracking-widest uppercase">Lead</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-lg text-med-dark dark:text-white">{member.name}</h4>
                  <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-xs text-med-text-secondary dark:text-gray-400 leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="bg-gradient-to-br from-primary to-[#0070ea] rounded-3xl p-12 md:p-20 text-center text-white shadow-2xl overflow-hidden relative">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">Ready to join the sanctuary?</h2>
              <p className="text-lg text-[#d8e2ff]/90 mb-10 max-w-2xl mx-auto">Experience the medical platform that treats your attention with the respect it deserves.</p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <button className="bg-[#79f6ed] text-[#00201e] px-10 py-4 rounded-full font-bold text-lg hover:shadow-lg transition-all duration-300">Create Your Profile</button>
                <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300">View Open Positions</button>
              </div>
            </div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#76f3ea]/20 rounded-full blur-3xl"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          </div>
        </section>
    </div>
  );
};

export default AboutUs;
