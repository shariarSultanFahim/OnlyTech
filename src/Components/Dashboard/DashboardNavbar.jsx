import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AiOutlineLogout, AiOutlineMenu, AiOutlineProduct, AiOutlineProfile } from "react-icons/ai";
import { FcStatistics } from "react-icons/fc";
import { GoReport } from "react-icons/go";
import { IoHomeOutline } from "react-icons/io5";
import { LuUserSquare } from "react-icons/lu";
import { RiCoupon2Line } from "react-icons/ri";
import ReactLoading from "react-loading";
import { NavLink } from "react-router-dom";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import { AuthContext } from "../AuthProvider/AuthProvider";


const DashboardNavbar = () => {
  const { user,logOut } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
    const {data:userData,isPending:userDataLoading} = useQuery({
        queryKey:['usersData',user],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users?email=${user?.email}`);
            return res.data;
        }
    })

    if(userDataLoading){
      return (
        <div className="min-h-screen grid place-items-center">
        <ReactLoading
          type={"spinningBubbles"}
          color={"#bac3bf"}
          height={100}
          width={100}
        />
      </div>
      )
    }
    // console.log(user,userData);

  const items = <>
    <NavLink to={"/"}>
            <li className="inline-flex items-center gap-4">
              <IoHomeOutline className="text-xl" />
              Home
            </li>
    </NavLink>
    {(userData.userType === 'user') && <NavLink to={"/dashboard/myProfile"}>
            <li className="inline-flex items-center gap-4">
              <AiOutlineProfile className="text-xl" />
              My Profile
            </li>
    </NavLink>}
    {(userData.userType === 'user') && <NavLink to={"/dashboard/addProducts"}>
            <li className="inline-flex items-center gap-4">
              <AiOutlineProduct className="text-xl" />
              Add Products
            </li>
    </NavLink>}
    {(userData.userType === 'user') && <NavLink to={"/dashboard/myProducts"}>
            <li className="inline-flex items-center gap-4">
              <AiOutlineMenu className="text-xl" />
              My Products
            </li>
    </NavLink>}
    {(userData.userType === 'modarator') && <NavLink to={"/dashboard/productReview"}>
            <li className="inline-flex items-center gap-4">
              <AiOutlineMenu className="text-xl" />
              Product Review
            </li>
    </NavLink>}
    {(userData.userType === 'modarator') && <NavLink to={"/dashboard/reportedContent"}>
            <li className="inline-flex items-center gap-4">
              <GoReport className="text-xl" />
              Reported Products
            </li>
    </NavLink>}
    {(userData.userType === 'admin') && <NavLink to={"/dashboard/statistics"}>
            <li className="inline-flex items-center gap-4">
              <FcStatistics className="text-xl" />
              Statistics
            </li>
    </NavLink>}
    {(userData.userType === 'admin') && <NavLink to={"/dashboard/manageUsers"}>
            <li className="inline-flex items-center gap-4">
              <LuUserSquare className="text-xl" />
              Manage Users
            </li>
    </NavLink>}
    {(userData.userType === 'admin') && <NavLink to={"/dashboard/manageCoupons"}>
            <li className="inline-flex items-center gap-4">
              <RiCoupon2Line className="text-xl" />
              Manage Coupons
            </li>
    </NavLink>}
    <NavLink >
            <li onClick={()=>logOut()} className="inline-flex items-center gap-4">
              <AiOutlineLogout  className="text-xl" />
              Logout
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
