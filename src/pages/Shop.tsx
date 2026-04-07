import {
  LoaderFunctionArgs,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";
import { ShopBanner, ShopPageContent } from "../components";

export const shopCategoryLoader = async ({ params }: LoaderFunctionArgs) => {
  const { category } = params;

  return category;
};

const Shop = () => {
  const categoryParam = useLoaderData() as string;
  const [searchParams] = useSearchParams();
  
  // Determine if it's a category or season and set appropriate filters
  const getCategoryOrSeason = (cat: string | undefined): { category?: string; season?: string } => {
    if (!cat) return {};
    
    const normalizedCat = cat.toLowerCase();
    
    if (normalizedCat === 'winter' || normalizedCat === 'summer') {
      return { season: normalizedCat };
    } else if (normalizedCat === 'pajamas' || normalizedCat === 'lingerie') {
      return { category: normalizedCat };
    }
    
    return {};
  };
  
  const { category, season } = getCategoryOrSeason(categoryParam);

  return (
    <div className="max-w-screen-2xl mx-auto pt-10">
      <ShopBanner category={category || season || ''} />
      <ShopPageContent
        category={category || ''}
        season={season}
        page={parseInt(searchParams.get("page") || "1")}
      />
    </div>
  );
};
export default Shop;
