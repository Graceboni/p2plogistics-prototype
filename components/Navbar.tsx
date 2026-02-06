
import React, { useState } from 'react';
import { Menu, X, Plane } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { View } from '../App';

interface NavbarProps {
  isScrolled: boolean;
  currentView: View;
  setView: (view: View) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled, currentView, setView }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string) => {
    const view = href.replace('#', '') as View;
    setView(view);
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 mb-8 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 backdrop-blur-md py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => setView('home')}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="bg-primary p-1.5 rounded-lg shadow-sm">
              <Plane className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-extrabold tracking-tighter text-navy">
              P2P<span className="text-primary">LOGISTICS</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => {
              const viewKey = link.href.replace('#', '');
              const isActive = currentView === viewKey;
              
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-sm font-bold transition-all hover:text-primary ${isActive ? 'text-primary border-b-2 border-primary pb-1' : 'text-navy'}`}
                >
                  {link.label}
                </button>
              );
            })}
            <button 
              onClick={() => setView('contact')}
              className="bg-navy hover:bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-navy/20"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-navy p-2 hover:bg-nearWhite rounded-lg transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden bg-white fixed inset-x-0 transition-all duration-300 shadow-2xl ${isOpen ? 'top-[74px] opacity-100' : '-top-full opacity-0'}`}>
        <div className="px-4 pt-2 pb-8 space-y-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="block w-full text-left px-4 py-4 text-base font-bold text-navy hover:bg-lightBg rounded-xl transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-4 px-2">
            <button 
              onClick={() => { setView('contact'); setIsOpen(false); }}
              className="w-full bg-primary text-white px-6 py-4 rounded-xl font-bold shadow-lg"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
