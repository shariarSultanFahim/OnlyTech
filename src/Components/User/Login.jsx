import { useContext, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Lottie from "react-lottie";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useDocumentTitle from "../../CustomHooks/useDocumentTitle";
import { AuthContext } from "../AuthProvider/AuthProvider";
import animationData from "/public/LoginAnimation";

const Login = () => {
  useDocumentTitle('Login');
  
  const [passVisibility,setPassVisibility] = useState(false);
  const {loginUser, googleLogin, setUser, user} = useContext(AuthContext)
  const handlePassVisibility = () =>{
    setPassVisibility(!passVisibility);
  }

  const location = useLocation()
  const navigate = useNavigate()

    if(location.state === null){
        location.state = '/';
    }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const handleLogin = (e) =>{
    e.preventDefault()
 
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    loginUser(email,password)
        .then(result =>{
            toast.success('Logged in sucessfully!',{
              position:"top-center",
              style: {
                border: '1px solid #eef1f0',
                padding: '16px',
                color: '#bac3bf',
              },
              iconTheme: {
                primary: '#eef1f0',
                secondary: '#bac3bf',
              },
            });
        })
        .catch((error) =>{
            toast.error(error.code,{
              position:"top-center"
            });
        })
  }
  const handleGoogleLogin = () =>{
    googleLogin()
    .then(result =>{
        setUser(result.user)
        toast.success('Logged in sucessfully!',{
          position:"top-center",
          style: {
            border: '1px solid #eef1f0',
            padding: '16px',
            color: '#bac3bf',
          },
          iconTheme: {
            primary: '#eef1f0',
            secondary: '#bac3bf',
          },
        });
    })  
    .catch((error) =>{
        toast.error(error.code,{
          position:"top-center"
        });
    })
}
useEffect(()=>{
    if(user){
        setTimeout(()=>{
            navigate(location.state);
        },1000); 
    }
},[user]);  

  return (
    <div className="hero min-h-screen w-full">
        <div className="hero-content flex-row-reverse w-full">
            <div className="hidden md:block text-center lg:text-left">
                <Lottie options={defaultOptions} height={400} width={360} />
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl">
            <form className="card-body bg-primaryColor rounded-lg" onSubmit={handleLogin}>
                
            <button
            onClick={handleGoogleLogin} className='p-4 text-3xl inline-flex items-center gap-2'><FcGoogle/>Login with Google</button>


                <div className="flex flex-col w-full border-opacity-50"> 
                    <div className="divider">OR</div>
                </div>

                <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" placeholder="email" className="input input-bordered bg-secendaryColor" required />
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <div className="relative">
                <input 
                type={passVisibility?'text':'password'}
                name="password" placeholder="password" className="input input-bordered w-full bg-secendaryColor" required />
                <a type="" onClick={handlePassVisibility} className="absolute right-2 top-1/4 text-xl   hover:cursor-pointer">
                {passVisibility?<AiOutlineEye/>:<AiOutlineEyeInvisible/>}
                </a>
                </div>
                <label className="label">
                    <Link to='/signUp' className="label-text-alt link link-hover">Register</Link>
                </label>
                </div>
                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary ">Login</button>
                </div>
            </form>
            </div>
        </div>
        <div><Toaster position="top-right"/></div>
    </div>
  );
};

export default Login;
