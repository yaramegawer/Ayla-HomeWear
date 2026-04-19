import { HiShoppingBag } from "react-icons/hi2";

const NoProducts = ({ message = "No products found" }: { message?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-gray-400 mb-4">
        <HiShoppingBag className="w-24 h-24 max-md:w-16 max-md:h-16" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-600 mb-2 max-md:text-xl">
        {message}
      </h2>
      <p className="text-gray-500 text-center max-md:text-sm">
        Try adjusting your filters or search terms to find what you're looking for.
      </p>
    </div>
  );
};

export default NoProducts;
