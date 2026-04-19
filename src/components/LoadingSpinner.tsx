
const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }: { size?: 'small' | 'medium' | 'large', text?: string }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-gray-200 border-t-blue-500`}></div>
      <p className={`${textSizeClasses[size]} text-gray-600 font-medium`}>{text}</p>
    </div>
  );
};

export default LoadingSpinner;
