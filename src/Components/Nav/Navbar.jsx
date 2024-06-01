import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import useDocumentTitle from "../../CustomHooks/useDocumentTitle";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Navbar = () => {
    useDocumentTitle('Home')
const {user,logOut}  = useContext(AuthContext);
const handleLogout = () =>{
  logOut();
}
const items = <>
    <li><NavLink to={"/"} className={({ isActive }) => isActive ? 'underline font-semibold' :''}>Home</NavLink></li>

    <li><NavLink to={"/products"} className={({ isActive }) => isActive ? 'underline font-semibold' : ''}>Products</NavLink></li>
</>


  return (
    <div className="bg-primaryColor">
      <div className="navbar  mx-auto max-w-screen-xl">
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
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {
                items
              }
            </ul>
          </div>
          <Link to-='/' className="btn bg-transparent border-transparent hover:bg-transparent hover:border-transparent text-xl">OnlyTech</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-8">
            {
                items
            }
          </ul>
        </div>
        <div className="navbar-end">
            {
                user?
                <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                <img alt="Profile Picture" src={user?.photoURL} />
                </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li className="text-center font-semibold py-4">{user?.displayName}</li>
                <li><Link to='/dashboard'>Dashboard</Link></li>
                <li onClick={handleLogout}><Link>Logout</Link></li>
            </ul>
                </div>
                :
                <div className="inline-flex items-center gap-2">
                    <Link to='/login' className="hover:underline">Login</Link>
                    <h1>/</h1>
                    <Link to='/signUp' className="hover:underline">SignUp</Link>
                </div>
            }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
