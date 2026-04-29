import React from 'react';

interface Button3DProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'danger';
  fullWidth?: boolean;
  borderColor?: string;
  shadowColor?: string;
}

const Button3D: React.FC<Button3DProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  disabled = false,
  borderColor,
  shadowColor = 'rgb(168, 85, 247)',
  ...props
}) => {
  const finalBorderColor = borderColor || 'rgb(79, 70, 229)';

  return (
    <button
      className={`
        bg-slate-900
        text-white
        py-4
        rounded-2xl
        font-semibold
        text-lg
        flex items-center justify-center gap-2
        transition-all
        duration-200
        active:scale-95
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      style={{
        border: `2px solid ${finalBorderColor}`,
        boxShadow: `4px 4px 0px 0px ${shadowColor}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `2px 2px 0px 0px ${shadowColor}`;
        e.currentTarget.style.transform = 'translate(2px, 2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `4px 4px 0px 0px ${shadowColor}`;
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
