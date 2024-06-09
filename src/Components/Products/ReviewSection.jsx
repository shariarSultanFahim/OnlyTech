
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import { AuthContext } from "../AuthProvider/AuthProvider";


const ReviewSection = ({product,refetchReview}) => {
    const {user} = useContext(AuthContext)
    const { register, handleSubmit,reset } = useForm();
    const [rating, setRating] = useState(5);
    const axiosSecure = useAxiosSecure();


    const onSubmit = async(data) =>{
        let review = {};
        const additionalData = {
            productId:product?._id,
            userPhoto:user?.photoURL,   
            rating
        }
        review = Object.assign({},data,additionalData);

        await axiosSecure.post('/review',review).then((res)=>{
            toast.success('Thanks for your feedback',{
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
           reset();
           setRating(1);
           refetchReview(); 
        })
    }

    return (
        <div className="hero w-full h-full">
        <div className="hero-content flex-row-reverse w-full">
            <div className="card shrink-0 w-full shadow-2xl">
            <form className="card-body bg-primaryColor rounded-lg" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col lg:flex-row justify-between items-center gap-2">
                <div className="avatar">
                  <div className="w-12 mask mask-squircle">
                    <img src={user?.photoURL} />
                  </div>
                </div>
                <div className="form-control w-full">
                     <input {...register("userEmail")} type="email" name="email" placeholder="user email" className="input input-bordered bg-secendaryColor" value={user?.email} readOnly/>
                </div>
                <div className="form-control w-full">
                     <input {...register("userName")} type="text" name="username" placeholder="username" className="input input-bordered bg-secendaryColor" value={user?.displayName} readOnly/>
                </div>
                </div>
                <div className="form-control">
                     <textarea {...register("description")} name="description" placeholder="your feedback"  className="textarea textarea-bordered bg-secendaryColor" required  ></textarea>
                </div>
                <div className="rating rating-lg">
                    <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400"
                    onClick={()=>setRating(1)} checked = {rating===1} />
                    <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" 
                    onClick={()=>setRating(2)} checked = {rating===2} />
                    <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" 
                    onClick={()=>setRating(3)} checked = {rating===3} />
                    <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" 
                    onClick={()=>setRating(4)} checked = {rating===4} />
                    <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" 
                    onClick={()=>setRating(5)} checked = {rating===5} />
                </div>
                <button type="submit" className="btn mx-auto">Submit</button>
            </form>
            </div>
        </div>
        <div><Toaster position="top-right"/></div>
        </div>
 
    );
};

export default ReviewSection;