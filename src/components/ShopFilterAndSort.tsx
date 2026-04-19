import { useAppSelector } from "../hooks";
import { useState } from "react";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import MobileFilterSidebar from "./MobileFilterSidebar";

const ShopFilterAndSort = ({
  sortCriteria,
  setSortCriteria,
}: {
  sortCriteria: string;
  setSortCriteria: (value: string) => void;
}) => {
  const { showingProducts, totalProducts } = useAppSelector(state => state.shop)
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center px-5 max-sm:flex-col max-sm:gap-5">
        <p className="text-lg">Showing 1-{ showingProducts } of { totalProducts } results</p>
        <div className="flex gap-3 items-center">
          <p className="hidden sm:block">Sort by:</p>
          <div className="relative hidden sm:block">
            <select
              className="border border-[rgba(0,0,0,0.40)] px-2 py-1"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setSortCriteria(e.target.value)
              }
              value={sortCriteria}
            >
              <option value="default">Default</option>
              <option value="popularity">Popularity</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </div>
          
          {/* Mobile filter button */}
          <button
            className="sm:hidden flex items-center gap-2 border border-[rgba(0,0,0,0.40)] px-3 py-1 rounded-lg"
            onClick={() => setIsFilterOpen(true)}
          >
            <HiAdjustmentsHorizontal className="w-4 h-4" />
            <span>Sort</span>
          </button>
        </div>
      </div>
      
      {/* Mobile filter sidebar */}
      <MobileFilterSidebar
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        sortCriteria={sortCriteria}
        setSortCriteria={setSortCriteria}
      />
    </>
  );
};
export default ShopFilterAndSort;
