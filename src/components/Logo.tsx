import { Link } from "react-router-dom";

const Logo = ({ 
  size = 'large', 
  showText = true,
  className = "",
  onClick 
}: { 
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  className?: string;
  onClick?: () => void;
}) => {
  const imageSizes = {
    small: 'h-6 w-auto',
    medium: 'h-7 w-auto', 
    large: 'h-10 w-auto'
  };

  const textSizes = {
    small: 'text-sm',
    medium: 'text-base', 
    large: 'text-lg'
  };

  const responsiveClasses = {
    small: 'max-sm:text-xs',
    medium: 'max-sm:text-sm',
    large: 'max-sm:text-sm max-[400px]:text-xs'
  };

  return (
    <Link
      to="/"
      className={`flex items-center justify-start ${className}`}
      onClick={onClick}
    >
      <img 
        src="assets/WhatsApp Image 2026-04-11 at 5.00.00 PM.jpeg" 
        alt="Ayla HomeWear Logo" 
        className={`${imageSizes[size]} object-contain mr-2`}
      />
      
      {showText && (
        <span className={`${textSizes[size]} font-light tracking-[1.08px] ${responsiveClasses[size]} text-black hover:text-gray-700 transition-colors text-left`}>
          Ayla <br className="max-sm:hidden" /> HomeWear
        </span>
      )}
    </Link>
  );
};

export default Logo;
