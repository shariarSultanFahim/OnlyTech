import { updateProfile } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Lottie from "react-lottie";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useDocumentTitle from "../../CustomHooks/useDocumentTitle";
import { AuthContext } from "../AuthProvider/AuthProvider";
import animationData from "/public/LoginAnimation";

const Signup = () => {
  useDocumentTitle('Sign Up');
  
  const [passVisibility,setPassVisibility] = useState(false);
  const {googleLogin, setUser, user,registerUser} = useContext(AuthContext)
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
  const [error,setError] = useState("");
  const handleSignUp = (e) =>{
    e.preventDefault()
 
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    if(password.length==0){
        setError("Enter a valid password");
        return
    }
    if(password.length<6){
        setError("Password must be at least 6 characters");
        return
    }
    if(!/[A-Z]/.test(password)){    
        setError("Must have an Uppercase letter in the password");
        return
    }
    if(!/[a-z]/.test(password)){
        setError("Must have a Lowercase letter in the password");
        return
    }
    if(!/[0-9]/.test(password)){
        setError("Must have a Numaric character in the password");
        return
    }
    if(!/[@.#$!%*?&^]/.test(password)){
        setError("Must have a special character in the password");
        return
    }
    
    setError('');
    registerUser(email,password)
        .then(result=>{
            updateProfile(result.user,{
                displayName:name,
                photoURL:photo
            });
            setUser(result.user);
            toast.success('Sign Up sucessfully!',{
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
            e.target.reset();
        })  
        .catch(error=> setError(error.message));


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
    <div className="hero w-full">
        <div className="hero-content flex-row w-full">
            <div className="hidden md:block text-center lg:text-left">
                <Lottie options={defaultOptions} height={400} width={360} />
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl">
            <form className="card-body bg-primaryColor rounded-lg" onSubmit={handleSignUp}>
                
            <button
            onClick={handleGoogleLogin} className='px-2 py-4 text-3xl inline-flex items-center gap-2'><FcGoogle/>Signup with Google</button>


                <div className="flex flex-col w-full border-opacity-50"> 
                    <div className="divider">OR</div>
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input type="text" name="name" placeholder="name" className="input input-bordered bg-secendaryColor" required />
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
                {
                    error && <small className='text-red-500'>{error}</small>
                    }
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Photo</span>
                </label>
                <input type="text" name="photo" placeholder="photo url" className="input input-bordered bg-secendaryColor" required />
                </div>
                    
                <label className="label">
                    <Link to='/login' className="label-text-alt link link-hover">Login</Link>
                </label>
                </div>
                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary ">Sign Up</button>
                </div>
            </form>
            </div>
        </div>
        <div><Toaster position="top-right"/></div>
    </div>
  );
};

export default Signup;
