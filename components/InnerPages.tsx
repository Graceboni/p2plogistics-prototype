
import React from 'react';
import Features from './Features';
import TariffSection from './TariffSection';
import HowItWorks from './HowItWorks';
import ContactSection from './ContactSection';

const PageHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="bg-navy pt-40 pb-24 text-center relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }}></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">{title}</h1>
      <p className="text-xl text-white/70 max-w-2xl mx-auto font-medium leading-relaxed">{subtitle}</p>
    </div>
  </div>
);

export const ServicesPage: React.FC = () => (
  <div className="animate-in fade-in duration-500">
    <PageHeader
      title="Our Logistics Services"
      subtitle="Comprehensive air freight and consolidation solutions from the UK and USA directly to Ghana."
    />
    <Features />
    <section className="py-24 bg-nearWhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1494412574735-a119c6070a27?q=80&w=1000" alt="Consolidation" className="rounded-3xl shadow-2xl relative z-10" />
            <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-xl -z-0"></div>
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl font-extrabold text-navy leading-tight">Professional Consolidation Services</h2>
            <p className="text-slate-600 font-medium text-lg leading-relaxed">Buying from multiple stores like Amazon, eBay, and Walmart? We collect all your items at our UK or USA hubs and combine them into a single shipment. This minimizes space wastage and significantly reduces your total shipping cost.</p>
            <div className="grid gap-4">
              {[
                "Free 30-day storage in UK & USA",
                "Secure professional repacking & boxing",
                "Fragile item handling specialists",
                "Detailed digital inventory of your items"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-50">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-navy font-bold">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export const TariffsPage: React.FC = () => (
  <div className="animate-in fade-in duration-500">
    <PageHeader
      title="Shipping Tariffs"
      subtitle="Transparent, flat-rate pricing based on weight classes. No hidden clearing fees, no surprises."
    />
    <TariffSection />
    <section className="py-20 bg-lightBg/20 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-white/50 inline-block w-full">
          <h2 className="text-3xl font-extrabold text-navy mb-4">Custom Quotes for Bulk or Large Items</h2>
          <p className="text-slate-500 max-w-2xl mx-auto mb-10 font-medium text-lg">Shipping heavy machinery, vehicles, or bulk commercial goods? Contact our specialized freight team for a custom quote tailored to your volume and requirements.</p>
          <button className="bg-navy text-white px-12 py-5 rounded-full font-bold shadow-2xl hover:bg-primary transition-all text-lg">Request Custom Quote</button>
        </div>
      </div>
    </section>
  </div>
);

export const HowItWorksPage: React.FC = () => (
  <div className="animate-in fade-in duration-500">
    <PageHeader
      title="How It Works"
      subtitle="A simple, four-step journey from your online shopping cart to your hands in Accra."
    />
    <HowItWorks />
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-navy mb-4">Frequently Asked Questions</h2>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
        </div>
        <div className="space-y-6">
          {[
            { q: "How long does shipping take?", a: "Air freight usually takes 5-7 working days from the scheduled flight departure date. We'll notify you via WhatsApp as soon as your items land." },
            { q: "Do you handle customs clearing?", a: "Yes! Our tariffs are inclusive of standard customs clearance in Ghana for most general goods. For special items, our team will provide guidance." },
            { q: "Where can I pick up my items?", a: "Our main hub is in Accra. We also offer doorstep delivery across Ghana (Kumasi, Takoradi, etc.) for a small additional delivery fee." },
            { q: "Can I shop from US sites like Amazon.com?", a: "Absolutely. We provide a secure New Jersey address for all US orders, which are then consolidated and shipped to Ghana." }
          ].map((faq, i) => (
            <div key={i} className="group bg-nearWhite p-8 rounded-3xl border border-transparent hover:border-primary/20 hover:bg-white transition-all shadow-sm hover:shadow-xl">
              <h3 className="text-xl font-extrabold text-navy mb-4 group-hover:text-primary transition-colors">{faq.q}</h3>
              <p className="text-slate-600 font-medium leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export const ContactPage: React.FC = () => (
  <div className="animate-in fade-in duration-500">
    <PageHeader
      title="Contact Us"
      subtitle="Got questions? Our support team is ready to help you with your UK and USA shipping needs."
    />
    <ContactSection />
  </div>
);
