
import React from 'react';
import { ShieldCheck, Zap, Globe, Lock } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      title: "UK & USA Addresses",
      description: "Get dedicated delivery addresses in London and New Jersey for your shopping from Amazon, eBay, Walmart, and more.",
      icon: <Globe className="text-primary" size={32} />
    },
    {
      title: "Safe Consolidation",
      description: "We store your items in our secure UK and USA facilities, combining packages to save you shipping costs.",
      icon: <Lock className="text-primary" size={32} />
    },
    {
      title: "Priority Air Freight",
      description: "Regular flight departures from both regions ensure your goods arrive in Accra within competitive timelines.",
      icon: <Zap className="text-primary" size={32} />
    },
    {
      title: "End-to-End Tracking",
      description: "From the moment it hits our international warehouse to the point of pickup in Ghana, your package is safe.",
      icon: <ShieldCheck className="text-primary" size={32} />
    }
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary font-bold text-sm uppercase tracking-[0.2em] mb-4">Our Service Reach</h2>
          <p className="text-4xl md:text-5xl font-extrabold text-navy mb-6">Why Trust P2P Logistics?</p>
          <p className="text-lg text-slate-500 font-medium">We provide a reliable bridge between the world&apos;s biggest markets and consumers in Ghana.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="group p-8 rounded-3xl bg-nearWhite border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
              <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                {f.icon}
              </div>
              <h3 className="text-xl font-extrabold text-navy mb-3">{f.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
