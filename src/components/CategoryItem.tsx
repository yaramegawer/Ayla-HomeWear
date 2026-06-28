import { Link } from "react-router-dom";

const CategoryItem = ({ categoryTitle, image } : { categoryTitle: string; image: string; }) => {
  return (
    <div className="w-full relative aspect-square">
      <Link to="/shop" className="block h-full w-full">
        <img src={`/assets/${image}`} alt={categoryTitle} className="h-full w-full object-cover" />
        <div className="bg-secondaryBrown text-white absolute bottom-0 w-full h-16 flex justify-center items-center max-sm:h-12">
          <h3 className="text-2xl max-sm:text-xl">{ categoryTitle }</h3>
        </div>
      </Link>
    </div>
  );
};
export default CategoryItem;
