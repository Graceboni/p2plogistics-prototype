
import React from 'react';
import { ArrowRight, Plane, ShoppingBag } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[95vh] flex items-center pt-32 md:pt-40 pb-20 overflow-hidden">
      {/* Background with Gradient and Pattern */}
      <div className="absolute inset-0 gradient-hero -z-10">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-nearWhite to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-navy space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="inline-flex items-center space-x-2 bg-navy/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-navy/20">
              <span className="text-xs font-bold uppercase tracking-widest text-navy">UK & USA • Safe • Reliable</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] text-navy">
              UK & USA <br />
              <span className="text-navy/60">to Ghana Shipping</span>
            </h1>

            <p className="text-lg md:text-xl text-navy/80 max-w-lg font-medium leading-relaxed">
              The premier air freight link between the UK, USA, and Ghana. You do the shopping across two continents, we handle the shipping to your doorstep.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-navy text-white hover:bg-navy/90 px-8 py-4 rounded-full font-extrabold flex items-center justify-center space-x-2 transition-all shadow-xl group">
                <span>Ship My Package</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="#tariffs" className="bg-white border-2 border-navy/20 hover:bg-nearWhite text-navy px-8 py-4 rounded-full font-extrabold transition-all shadow-lg text-center">
                View Tariffs
              </a>
            </div>

            <div className="flex items-center space-x-6 pt-4 text-navy/60">
              <div className="flex items-center space-x-2">
                <ShoppingBag size={20} />
                <span className="text-sm font-semibold">Shop UK & USA</span>
              </div>
              <div className="flex items-center space-x-2">
                <Plane size={20} />
                <span className="text-sm font-semibold">Fast Air Cargo</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block relative animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="relative z-10 animate-bounce-slow">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-[3rem] border border-white/20 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop"
                  alt="International Logistics"
                  className="rounded-[2.5rem] shadow-2xl object-cover h-[450px] w-full"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-3xl shadow-2xl space-y-2 max-w-[220px] border border-slate-50">
                  <p className="text-navy font-extrabold text-2xl leading-none">Global Reach</p>
                  <p className="text-primary text-xs font-bold uppercase tracking-tight">Active UK & USA Hubs</p>
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-white/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
