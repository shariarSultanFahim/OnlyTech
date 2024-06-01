import { Outlet } from "react-router-dom";
import Navbar from "../Nav/Navbar";

const Root = () => {
  return (
    <div className="bg-secendaryColor min-h-screen">
      <Navbar />
      <div className="container mx-auto max-w-screen-xl">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
