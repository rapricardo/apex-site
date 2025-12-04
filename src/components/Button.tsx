import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide uppercase text-sm";
  
  const variants = {
    primary: "bg-apex-accent text-black hover:bg-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] rounded-sm",
    secondary: "bg-white text-black hover:bg-gray-200 border border-transparent rounded-sm",
    outline: "bg-transparent border border-gray-600 text-gray-300 hover:border-apex-accent hover:text-apex-accent rounded-sm"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
};

