import React from 'react';
import { Users, Code, Zap, Globe } from 'lucide-react';

export interface FeatureItem {
  key: string;
  icon: React.ReactNode;
}

export const FEATURES_DATA: FeatureItem[] = [
  {
    key: 'innovation',
    icon: <Zap className="w-6 h-6 text-blue-400" />
  },
  {
    key: 'teamwork',
    icon: <Users className="w-6 h-6 text-purple-400" />
  },
  {
    key: 'speed',
    icon: <Code className="w-6 h-6 text-green-400" />
  },
  {
    key: 'global',
    icon: <Globe className="w-6 h-6 text-pink-400" />
  }
];
