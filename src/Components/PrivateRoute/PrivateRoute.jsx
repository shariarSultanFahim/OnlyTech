import { useContext } from "react";
import ReactLoading from 'react-loading';
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children}) => {

    const location = useLocation()
    const {user,userLoading} = useContext(AuthContext)

    if(userLoading){
        return(
            <div className="min-h-screen grid place-items-center">
                <ReactLoading type={'spinningBubbles'} color={'#bac3bf'} height={100} width={100}/>
            </div>
        )
    }
    if(user){
        return children;
    }
    return <Navigate to="/login" state={location.pathname}></Navigate>
};

export default PrivateRoute;