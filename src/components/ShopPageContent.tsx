import {
  ShopFilterAndSort,
} from "../components";
import ProductGridWithPagination from "./ProductGridWithPagination";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const categoryToSlug = (cat: string | undefined): string => {
  if (!cat) return "";
  return cat.toLowerCase();
};

const ShopPageContent = ({ category, page, season } : { category: string; page: number; season?: string; }) => {
  const [sortCriteria, setSortCriteria] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [currentPage, setCurrentPage] = useState(page);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Sync selectedCategory state with category prop from route
  useEffect(() => {
    setSelectedCategory(category);
  }, [category]);

  // Sync currentPage state with page prop from route
  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  // Update URL when page changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentPage !== parseInt(params.get('page') || '1')) {
      params.set('page', currentPage.toString());
      const slug = categoryToSlug(category);
      const basePath = season ? `/shop/${season}` : (slug ? `/shop/${slug}` : '/shop');
      navigate(`${basePath}?${params.toString()}`, { replace: true });
    }
  }, [currentPage, season, category, navigate, searchParams]);

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1'); // Reset to page 1
    
    const slug = categoryToSlug(value);
    const basePath = slug ? `/shop/${slug}` : '/shop';
    navigate(`${basePath}?${params.toString()}`);
  };

  return (
    <>
      <ShopFilterAndSort
        sortCriteria={sortCriteria}
        setSortCriteria={setSortCriteria}
        selectedCategory={selectedCategory}
        setSelectedCategory={handleCategoryChange}
      />
      <ProductGridWithPagination 
        key={`${selectedCategory}-${season || "all"}`}
        sortCriteria={sortCriteria} 
        category={selectedCategory}
        season={season}
        page={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
};
export default ShopPageContent;
