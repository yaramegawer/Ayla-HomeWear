const ProductSkeleton = () => {
  return (
    <div className="w-[400px] flex flex-col gap-2 justify-center md:max-lg:w-[350px] max-md:w-[48%] max-sm:w-[48%] max-[400px]:w-full">
      <div className="w-full h-[300px] max-md:h-[200px] overflow-hidden relative">
        <div className="w-full h-full bg-gray-200 animate-pulse"></div>
      </div>
      <div className="text-center">
        <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
