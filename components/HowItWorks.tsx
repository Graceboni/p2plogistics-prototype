
import React from 'react';
import { STEPS } from '../constants';

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-lightBg/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-primary font-bold text-sm uppercase tracking-[0.2em] mb-4 text-center lg:text-left">Simple Process</h2>
            <p className="text-4xl md:text-5xl font-extrabold text-navy mb-8 text-center lg:text-left leading-tight">From your cart to your doorstep in Ghana</p>
            <p className="text-lg text-slate-600 mb-10 text-center lg:text-left font-medium leading-relaxed">
              We&apos;ve refined our logistics chain to make international shopping feel like local shopping. No complex paperwork, just reliable shipping.
            </p>
            <div className="flex justify-center lg:justify-start">
              <button className="bg-navy text-white hover:bg-navy/90 px-10 py-4 rounded-full font-bold transition-all shadow-xl">
                Read Full FAQ
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 grid gap-6">
            {STEPS.map((step, idx) => (
              <div key={idx} className="flex gap-6 items-start p-6 rounded-3xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-lightBg flex items-center justify-center font-extrabold text-2xl text-primary">
                  {step.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-extrabold text-navy">{step.title}</h4>
                  <p className="text-slate-500 font-medium">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
