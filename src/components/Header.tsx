import { HiBars3 } from "react-icons/hi2";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Link } from "react-router-dom";
import SidebarMenu from "./SidebarMenu";
import Logo from "./Logo";
import { useState } from "react";

const Header = () => {
  const [ isSidebarOpen, setIsSidebarOpen ] = useState(false);
  return (
    <>
    <header className="max-w-screen-2xl flex text-center justify-between items-center py-4 px-5 text-black mx-auto max-sm:px-5 max-[400px]:px-3">
      <div className="flex items-center gap-4">
        <HiBars3 className="text-2xl max-sm:text-xl cursor-pointer" onClick={() => setIsSidebarOpen(true)} />
        <Logo size="large" />
      </div>
      <div className="flex gap-4 items-center max-sm:gap-2">
        <Link to="/policy" className="text-sm max-sm:text-xs hover:text-gray-600">
          Shipping Policy
        </Link>
        <Link to="/cart">
          <HiOutlineShoppingBag className="text-2xl max-sm:text-xl" />
        </Link>
      </div>
    </header>
    <SidebarMenu isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
    </>
  );
};
export default Header;
