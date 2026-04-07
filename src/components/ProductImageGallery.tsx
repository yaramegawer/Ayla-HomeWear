import { useState, useRef, useEffect } from 'react';

const ProductImageGallery = ({ 
  images, 
  defaultImage 
}: { 
  images: Array<{ id: string; url: string }>; 
  defaultImage: { id: string; url: string } 
}) => {
  const [selectedImage, setSelectedImage] = useState(defaultImage.url);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const allImages = [defaultImage, ...images.filter(img => img.url !== defaultImage.url)];

  // Handle swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < allImages.length - 1) {
      // Swipe left - next image
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setSelectedImage(allImages[newIndex].url);
    } else if (isRightSwipe && currentIndex > 0) {
      // Swipe right - previous image
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setSelectedImage(allImages[newIndex].url);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        const newIndex = currentIndex - 1;
        setCurrentIndex(newIndex);
        setSelectedImage(allImages[newIndex].url);
      } else if (e.key === 'ArrowRight' && currentIndex < allImages.length - 1) {
        const newIndex = currentIndex + 1;
        setCurrentIndex(newIndex);
        setSelectedImage(allImages[newIndex].url);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, allImages]);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image with swipe support */}
      <div 
        className="w-full h-[500px] overflow-hidden relative cursor-pointer select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img 
          src={selectedImage} 
          alt="Product" 
          className="w-full h-full object-cover"
        />
        
        {/* Navigation arrows for desktop */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={() => {
                if (currentIndex > 0) {
                  const newIndex = currentIndex - 1;
                  setCurrentIndex(newIndex);
                  setSelectedImage(allImages[newIndex].url);
                }
              }}
              className={`absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 transition-opacity ${
                currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
              }`}
              disabled={currentIndex === 0}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => {
                if (currentIndex < allImages.length - 1) {
                  const newIndex = currentIndex + 1;
                  setCurrentIndex(newIndex);
                  setSelectedImage(allImages[newIndex].url);
                }
              }}
              className={`absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 transition-opacity ${
                currentIndex === allImages.length - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
              }`}
              disabled={currentIndex === allImages.length - 1}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
        
        {/* Image counter */}
        {allImages.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/60 text-white px-2 py-1 rounded text-sm">
            {currentIndex + 1} / {allImages.length}
          </div>
        )}
      </div>
      
      {/* Thumbnail Gallery */}
      <div className="flex gap-2 overflow-x-auto">
        {allImages.map((image, index) => (
          <button
            key={image.id}
            onClick={() => {
              setSelectedImage(image.url);
              setCurrentIndex(index);
            }}
            className={`flex-shrink-0 w-20 h-20 border-2 transition-all ${
              selectedImage === image.url 
                ? 'border-secondaryBrown scale-105' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <img 
              src={image.url} 
              alt={`Product ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
