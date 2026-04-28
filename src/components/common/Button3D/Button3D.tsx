import React from 'react';

interface Button3DProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'danger';
  fullWidth?: boolean;
}

const Button3D: React.FC<Button3DProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  disabled = false,
  ...props
}) => {
  const gradients = {
    primary: 'from-emerald-500 to-teal-500',
    secondary: 'from-amber-400 to-orange-500',
    accent: 'from-red-500 to-rose-500',
    danger: 'from-pink-500 to-rose-500',
  };

  return (
    <button
      className={`
        bg-gradient-to-br ${gradients[variant]}
        text-white
        py-4
        rounded-2xl
        font-semibold
        text-lg
        flex items-center justify-center gap-2
        border-2 border-indigo-600
        transition-all
        duration-200
        active:scale-95
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      style={{
        boxShadow: '4px 4px 0px 0px rgb(79, 70, 229)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '2px 2px 0px 0px rgb(79, 70, 229)';
        e.currentTarget.style.transform = 'translate(2px, 2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '4px 4px 0px 0px rgb(79, 70, 229)';
        e.currentTarget.style.transform = 'translate(0, 0)';
      }}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button3D;
