
import React, { useState } from 'react';
import { TARIFFS_UK, TARIFFS_USA } from '../constants';
import { Info, Globe } from 'lucide-react';

const TariffSection: React.FC = () => {
  const [region, setRegion] = useState<'UK' | 'USA'>('UK');
  const activeTariffs = region === 'UK' ? TARIFFS_UK : TARIFFS_USA;
  const currencySymbol = region === 'UK' ? '£' : '$';

  return (
    <section id="tariffs" className="py-24 bg-white relative overflow-hidden">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold text-sm uppercase tracking-[0.2em] mb-4">Pricing</h2>
          <p className="text-4xl md:text-5xl font-extrabold text-navy mb-8">Transparent Regional Rates</p>
          
          {/* Region Toggle */}
          <div className="inline-flex p-1 bg-nearWhite rounded-2xl mb-8">
            <button 
              onClick={() => setRegion('UK')}
              className={`px-8 py-3 rounded-xl font-extrabold text-sm transition-all ${region === 'UK' ? 'bg-primary text-white shadow-lg' : 'text-navy hover:text-primary'}`}
            >
              UK to Ghana
            </button>
            <button 
              onClick={() => setRegion('USA')}
              className={`px-8 py-3 rounded-xl font-extrabold text-sm transition-all ${region === 'USA' ? 'bg-primary text-white shadow-lg' : 'text-navy hover:text-primary'}`}
            >
              USA to Ghana
            </button>
          </div>

          <div className="flex justify-center">
            <div className="inline-flex items-center space-x-2 bg-lightBg/50 px-4 py-2 rounded-lg text-primary text-sm font-bold">
              <Info size={16} />
              <span>Prices cover standard shipping to our Accra hub.</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-3">
             <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100">
               <div className="bg-primary px-8 py-5 flex justify-between items-center">
                 <span className="text-white font-extrabold uppercase tracking-widest text-sm">Weight ({region === 'UK' ? 'KG' : 'LBS'})</span>
                 <span className="text-white font-extrabold uppercase tracking-widest text-sm">Tariff ({currencySymbol})</span>
               </div>
               <div className="divide-y divide-slate-50">
                 {activeTariffs.map((t, idx) => (
                   <div key={idx} className="flex justify-between items-center px-8 py-4 hover:bg-nearWhite transition-colors">
                     <span className="text-navy font-bold text-lg">{t.weight}</span>
                     <span className="text-primary font-extrabold text-2xl">{currencySymbol}{t.price}</span>
                   </div>
                 ))}
               </div>
               <div className="bg-nearWhite p-6 text-center">
                 <p className="text-slate-500 font-bold text-sm">
                   {region === 'UK' ? 'UK rates are calculated per KG.' : 'USA rates are calculated per LB.'} Prices may vary for fragile or heavy items.
                 </p>
               </div>
             </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-navy p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                 <Globe size={120} />
               </div>
               <h3 className="text-3xl font-extrabold mb-6 relative z-10">Consolidate & Save</h3>
               <p className="text-white/80 font-medium mb-8 leading-relaxed relative z-10">
                 Shipping from multiple stores? We can combine your orders from the UK or USA into one shipment to minimize your shipping costs.
               </p>
               <ul className="space-y-4 mb-10 relative z-10">
                 {['Bi-weekly flights', 'Secure US/UK Warehousing', 'Expert Re-packing', 'Daily Accra Pickups'].map((item, i) => (
                   <li key={i} className="flex items-center space-x-3">
                     <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                       <div className="w-2 h-2 rounded-full bg-white"></div>
                     </div>
                     <span className="font-bold">{item}</span>
                   </li>
                 ))}
               </ul>
               <button className="w-full bg-primary hover:bg-secondary text-white py-4 rounded-2xl font-extrabold text-lg transition-all shadow-lg relative z-10">
                 Get Shipping Address
               </button>
            </div>

            <div className="p-8 rounded-3xl border-2 border-dashed border-primary/20 bg-nearWhite text-center">
               <p className="text-navy font-bold italic">"Worldwide shopping, local delivery: the P2P way!"</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TariffSection;
