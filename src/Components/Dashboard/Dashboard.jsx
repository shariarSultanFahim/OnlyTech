import { useContext } from "react";
import ReactLoading from 'react-loading';
import { Outlet } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import DashboardNavbar from "./DashboardNavbar";

const Dashboard = () => {
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
            <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row min-h-screen lg:py-10">
                <div className="lg:w-1/3">
                    <DashboardNavbar/>
                </div>
                <div className="lg:w-2/3 bg-bgColor min-h-screen">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;