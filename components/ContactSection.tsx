
import React from 'react';
import { Phone, Instagram, Send, Mail, MapPin } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-nearWhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-12 lg:p-20 bg-navy text-white">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-8">Get in touch with us</h2>
            <p className="text-white/70 text-lg font-medium mb-12 max-w-md">
              Have questions about our drop dates or special shipping requirements? We're here to help.
            </p>

            <div className="space-y-8">
              <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center space-x-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white/50 text-sm font-bold uppercase tracking-wider">WhatsApp & Call</p>
                  <p className="text-xl font-bold">{CONTACT_INFO.phone}</p>
                </div>
              </a>

              <a href="#" className="flex items-center space-x-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white/50 text-sm font-bold uppercase tracking-wider">Instagram</p>
                  <p className="text-xl font-bold">{CONTACT_INFO.instagram}</p>
                </div>
              </a>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white/50 text-sm font-bold uppercase tracking-wider">Locations</p>
                  <p className="text-xl font-bold">UK Warehouse | Accra, Ghana</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 p-12 lg:p-20">
            <h3 className="text-3xl font-extrabold text-navy mb-8">Send us a message</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-navy/60 uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full px-6 py-4 rounded-2xl bg-lightBg/30 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-bold text-navy"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-navy/60 uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full px-6 py-4 rounded-2xl bg-lightBg/30 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-bold text-navy"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-extrabold text-navy/60 uppercase tracking-wider">Package Details (Optional)</label>
                <input 
                  type="text" 
                  className="w-full px-6 py-4 rounded-2xl bg-lightBg/30 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-bold text-navy"
                  placeholder="Weight, dimensions, contents..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-extrabold text-navy/60 uppercase tracking-wider">Your Message</label>
                <textarea 
                  rows={4}
                  className="w-full px-6 py-4 rounded-2xl bg-lightBg/30 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-bold text-navy resize-none"
                  placeholder="How can we help you today?"
                ></textarea>
              </div>
              <button className="w-full bg-primary hover:bg-secondary text-white py-5 rounded-2xl font-extrabold text-lg flex items-center justify-center space-x-3 transition-all shadow-xl shadow-primary/20">
                <span>Send Message</span>
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
