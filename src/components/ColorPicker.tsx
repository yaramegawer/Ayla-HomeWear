import React from 'react';

interface ColorOption {
  color: string;
  stock: number;
}

interface ColorPickerProps {
  colors: ColorOption[];
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ colors, selectedColor, onColorChange }) => {
  const getLowStockWarning = (stock: number) => {
    if (stock === 0) return null;
    if (stock <= 3) return `Only ${stock} left in stock`;
    return null;
  };

  const getColorDisplay = (colorName: string) => {
    // Map color names to actual color values for display
    const colorMap: { [key: string]: string } = {
      'red': '#ef4444',
      'blue': '#3b82f6',
      'green': '#10b981',
      'yellow': '#eab308',
      'black': '#000000',
      'white': '#ffffff',
      'gray': '#6b7280',
      'grey': '#6b7280',
      'brown': '#92400e',
      'pink': '#ec4899',
      'purple': '#9333ea',
      'orange': '#f97316',
      'beige': '#f5f5dc',
      'navy': '#1e3a8a',
      'cream': '#fffacd',
    };

    return colorMap[colorName.toLowerCase()] || '#6b7280';
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-gray-900">Color</label>
      
      <div className="flex flex-wrap gap-2">
        {colors.map((colorOption) => {
          const isSelected = selectedColor === colorOption.color;
          const isOutOfStock = colorOption.stock === 0;
          const lowStockWarning = getLowStockWarning(colorOption.stock);
          const displayColor = getColorDisplay(colorOption.color);

          return (
            <div key={colorOption.color} className="relative group">
              <button
                type="button"
                onClick={() => !isOutOfStock && onColorChange(colorOption.color)}
                disabled={isOutOfStock}
                className={`
                  relative w-10 h-10 rounded-full border-2 transition-all duration-200
                  ${isSelected 
                    ? 'border-gray-900 ring-2 ring-gray-400 ring-offset-2' 
                    : 'border-gray-300 hover:border-gray-500'
                  }
                  ${isOutOfStock 
                    ? 'opacity-40 cursor-not-allowed grayscale' 
                    : 'cursor-pointer hover:scale-110'
                  }
                `}
                style={{ backgroundColor: displayColor }}
                title={`${colorOption.color.charAt(0).toUpperCase() + colorOption.color.slice(1)}${
                  isOutOfStock ? ' (Out of Stock)' : lowStockWarning ? ` (${lowStockWarning})` : ''
                }`}
              >
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full border border-gray-900"></div>
                  </div>
                )}
                {isOutOfStock && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                )}
              </button>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                {colorOption.color.charAt(0).toUpperCase() + colorOption.color.slice(1)}
                {isOutOfStock && ' (Out of Stock)'}
                {lowStockWarning && ` (${lowStockWarning})`}
              </div>
            </div>
          );
        })}
      </div>

      {/* Low Stock Warning */}
      {selectedColor && (() => {
        const selectedColorData = colors.find(c => c.color === selectedColor);
        if (selectedColorData) {
          const warning = getLowStockWarning(selectedColorData.stock);
          if (warning) {
            return (
              <div className="text-sm text-amber-600 font-medium">
                {warning}
              </div>
            );
          }
        }
        return null;
      })()}
    </div>
  );
};

export default ColorPicker;
