import React from 'react';

export interface LogEntry {
  id: number;
  text: string;
  status?: 'success' | 'warning' | 'error' | 'process';
  timestamp: string;
}

export interface SectionProps {
  className?: string;
}

export type ProcessStep = {
  title: string;
  description: string;
  icon: React.ElementType;
  isAi: boolean;
};