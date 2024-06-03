import { useContext } from "react";
import { AiFillProduct, AiOutlineProduct } from "react-icons/ai";
import { IoHome } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
const DashboardNavbar = () => {
  const { user } = useContext(AuthContext);


  const items = <>
    <NavLink to={"/dashboard/myProfile"}>
            <li className="inline-flex items-center gap-4">
              <IoHome className="text-xl" />
              My Profile
            </li>
    </NavLink>
    <NavLink to={"/dashboard/addProducts"}>
            <li className="inline-flex items-center gap-4">
              <AiFillProduct className="text-xl" />
              Add Products
            </li>
    </NavLink>
    <NavLink to={"/dashboard/myProducts"}>
            <li className="inline-flex items-center gap-4">
              <AiOutlineProduct  className="text-xl" />
              My Products
            </li>
    </NavLink>
</>

  return (
    <div className="h-full">
    <div className="lg:hidden navbar mx-auto max-w-screen-xl bg-primaryColor">
        
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52 text-center">
              {
                items
              }
            </ul>
          </div>
        </div>
    </div>
    <div className="hidden lg:flex flex-col items-center gap-16 p-4 h-full bg-primaryColor">
      <div className="space-y-4 text-center">
        <div className="overflow-hidden rounded-full h-52 w-52">
          <img className="h-full w-full" src={user?.photoURL} alt="User Photo" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl">{user?.displayName}</h1>
          <p className="text-xl">{user?.email}</p>
        </div>
      </div>
      <div>
        <ul className="flex flex-col gap-6">
          {items}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default DashboardNavbar;
