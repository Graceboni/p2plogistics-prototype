
import React from 'react';
import { Plane, Facebook, Twitter, Instagram, Linkedin, Phone } from 'lucide-react';
import { NAV_LINKS, CONTACT_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="bg-primary p-1.5 rounded-lg">
                <Plane className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-extrabold tracking-tighter">
                P2P<span className="text-primary">LOGISTICS</span>
              </span>
            </div>
            <p className="text-white/60 font-medium leading-relaxed">
              Bridging the gap between the UK, USA, and Ghana. We offer premium air freight solutions for shoppers and businesses alike.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-extrabold mb-8 uppercase tracking-widest text-primary">Quick Links</h4>
            <ul className="space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/60 hover:text-white font-bold transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
              <li><a href="#" className="text-white/60 hover:text-white font-bold transition-colors">Get a Quote</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-extrabold mb-8 uppercase tracking-widest text-primary">Services</h4>
            <ul className="space-y-4">
              {['UK Consolidation', 'USA Consolidation', 'Air Cargo', 'P2P Doorstep Delivery', 'Shopping Concierge'].map((item) => (
                <li key={item} className="text-white/60 font-bold">{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-extrabold mb-8 uppercase tracking-widest text-primary">Contact</h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-3">
                <Phone size={20} className="text-primary mt-1" />
                <span className="text-white/60 font-bold">{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex items-start space-x-3">
                <Instagram size={20} className="text-primary mt-1" />
                <span className="text-white/60 font-bold">{CONTACT_INFO.instagram}</span>
              </li>
              <li className="bg-white/5 p-4 rounded-2xl">
                <p className="text-xs font-bold text-white/40 uppercase mb-2 tracking-widest">Our Motto</p>
                <p className="text-sm font-extrabold italic">&quot;You do the shopping, We do the shipping.&quot;</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm font-bold text-white/40 uppercase tracking-widest">
          <p>© 2024 P2P LOGISTICS. UK & USA HUBS ACTIVE.</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
