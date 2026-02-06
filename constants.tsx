
import React from 'react';
import { Plane, ShoppingBag, Package, MapPin, Phone, Instagram, Clock, ShieldCheck, Truck } from 'lucide-react';
import { TariffItem, Step, NavLink } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Tariffs', href: '#tariffs' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Contact', href: '#contact' },
];

export const TARIFFS_UK: TariffItem[] = [
  { weight: '0 - 2kg', price: 30 },
  { weight: '2.1 - 4kg', price: 60 },
  { weight: '4.1 - 6kg', price: 80 },
  { weight: '6.1 - 8kg', price: 105 },
  { weight: '8.1 - 10kg', price: 130 },
  { weight: '10.1 - 12kg', price: 155 },
  { weight: '12.1 - 14kg', price: 170 },
  { weight: '14.1 - 16kg', price: 195 },
  { weight: '16.1 - 18kg', price: 220 },
  { weight: '18.1 - 20kg', price: 235 },
  { weight: '20.1 - 23kg', price: 250 },
];

export const TARIFFS_USA: TariffItem[] = [
  { weight: '0 - 5 lbs', price: 45 },
  { weight: '5.1 - 10 lbs', price: 85 },
  { weight: '10.1 - 15 lbs', price: 120 },
  { weight: '15.1 - 20 lbs', price: 155 },
  { weight: '20.1 - 25 lbs', price: 190 },
  { weight: '25.1 - 30 lbs', price: 220 },
  { weight: '30.1 - 40 lbs', price: 280 },
  { weight: '40.1 - 50 lbs', price: 340 },
];

export const STEPS: Step[] = [
  {
    title: 'Pick a Drop Date',
    description: 'We have specific dates each month for UK & USA to Accra shipments, typically scheduled multiple times monthly.',
    icon: <Clock className="w-8 h-8 text-primary" />,
  },
  {
    title: 'Get Your Address',
    description: 'Confirm your drop date to receive our secure UK or USA warehouse address for your online orders.',
    icon: <MapPin className="w-8 h-8 text-primary" />,
  },
  {
    title: 'Process & Re-pack',
    description: 'We consolidate your packages, ensuring they are professionally handled and ready for international transit.',
    icon: <Package className="w-8 h-8 text-primary" />,
  },
  {
    title: 'Final Delivery',
    description: 'Collect your items in Ghana the day after arrival or opt for doorstep delivery at a small fee.',
    icon: <Truck className="w-8 h-8 text-primary" />,
  },
];

export const CONTACT_INFO = {
  phone: '+233 50 389 0000',
  instagram: '@p2plogisticsgh',
};
