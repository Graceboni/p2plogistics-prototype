
import React from 'react';

export interface TariffItem {
  weight: string;
  price: number;
}

export interface Step {
  title: string;
  description: string;
  // Fixed: Added React import to provide access to the React namespace
  icon: React.ReactNode;
}

export interface NavLink {
  label: string;
  href: string;
}

export enum ShippingStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
