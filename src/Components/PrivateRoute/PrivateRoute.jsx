import { useContext } from "react";
import ReactLoading from 'react-loading';
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children}) => {

    const location = useLocation()
    const {userLoding, user} = useContext(AuthContext)

    if(user){
        return children
    }
    else if(userLoding){
        <div className="min-h-screen grid place-items-center">
            <ReactLoading type={'spinningBubbles'} color={'#0E7490'} height={100} width={100}/>
        </div>
    }

    return <Navigate to="/login" state={location.pathname}></Navigate>
};

export default PrivateRoute;