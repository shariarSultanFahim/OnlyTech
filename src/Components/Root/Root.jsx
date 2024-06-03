import { useContext } from "react";
import ReactLoading from 'react-loading';
import { Outlet } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Footer from "../Footer/Footer";
import Navbar from "../Nav/Navbar";

const Root = () => {
  const {userLoading}=useContext(AuthContext);
  if(userLoading){
    return (
      <div className="min-h-screen grid place-items-center">
            <ReactLoading type={'spinningBubbles'} color={'#bac3bf'} height={100} width={100}/>
        </div>
    )
  }

  return (
    <div className="bg-secendaryColor min-h-screen">
      <Navbar />
      <div className="">
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
};

export default Root;
