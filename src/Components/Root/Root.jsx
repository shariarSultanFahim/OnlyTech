import { Outlet } from "react-router-dom";
import Navbar from "../Nav/Navbar";

const Root = () => {
  return (
    <div className="bg-secendaryColor h-screen">
      <div className="container mx-auto max-w-screen-xl">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
