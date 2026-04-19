import { useEffect } from "react";
import { HiXMark } from "react-icons/hi2";

const MobileFilterSidebar = ({
  isFilterOpen,
  setIsFilterOpen,
  sortCriteria,
  setSortCriteria,
}: {
  isFilterOpen: boolean;
  setIsFilterOpen: (prev: boolean) => void;
  sortCriteria: string;
  setSortCriteria: (value: string) => void;
}) => {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(e.target.value);
    setIsFilterOpen(false); // Auto-close after selection
  };

  useEffect(() => {
    // Prevent body scroll when sidebar is open
    if (isFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFilterOpen]);

  return (
    <>
      {isFilterOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsFilterOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Sort & Filter</h3>
              <HiXMark
                className="text-2xl cursor-pointer"
                onClick={() => setIsFilterOpen(false)}
              />
            </div>
            
            <div className="p-4">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort by:
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleSortChange}
                  value={sortCriteria}
                >
                  <option value="default">Default</option>
                  <option value="popularity">Popularity</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                </select>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MobileFilterSidebar;
