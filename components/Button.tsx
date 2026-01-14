import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'whatsapp';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  fullWidth = false, 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative overflow-hidden group inline-flex items-center justify-center px-6 py-3 border text-base font-bold rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 uppercase tracking-wide transform hover:-translate-y-1 active:translate-y-0";
  
  const variants = {
    // Primary: Glow effects added specifically for light and dark modes
    primary: "border-transparent text-white bg-brand-blue-deep hover:bg-blue-800 focus:ring-blue-500 shadow-lg shadow-brand-blue-deep/30 dark:bg-brand-blue dark:hover:bg-blue-400 dark:shadow-brand-blue/40 hover:shadow-brand-blue-deep/50 dark:hover:shadow-brand-blue/60", 
    
    // Secondary: Subtle shadow
    secondary: "border-transparent text-brand-blue-deep bg-white hover:bg-gray-50 focus:ring-gray-200 dark:bg-brand-dark-card dark:text-brand-blue dark:hover:bg-gray-800 border dark:border-gray-700 shadow-md hover:shadow-xl",
    
    // Outline: Minimal changes
    outline: "border-brand-blue-deep text-brand-blue-deep bg-transparent hover:bg-blue-50 focus:ring-blue-500 dark:border-brand-blue dark:text-brand-blue dark:hover:bg-brand-blue/10",
    
    // WhatsApp: Consistent Green Glow
    whatsapp: "border-transparent text-white bg-green-600 hover:bg-green-700 focus:ring-green-500 shadow-lg shadow-green-500/30 hover:shadow-green-500/50"
  };

  const widthStyle = fullWidth ? "w-full" : "";

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--x', `${x}px`);
    e.currentTarget.style.setProperty('--y', `${y}px`);
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`} 
      onMouseMove={handleMouseMove}
      {...props}
    >
      {/* Spotlight Effect Layer */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at var(--x) var(--y), rgba(255,255,255,0.25) 0%, transparent 50%)` // White glow following mouse
        }}
      />
      
      {/* Content Layer (z-10 ensures text is above the glow) */}
      <span className="relative z-10 flex items-center justify-center w-full">
        {children}
      </span>
    </button>
  );
};