import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import useDocumentTitle from "../../CustomHooks/useDocumentTitle";
import { AuthContext } from "../AuthProvider/AuthProvider";


const AddProducts = () => {
    useDocumentTitle('Add Products');
    const imagebb_key = import.meta.env.VITE_IMAGEBB_KEY;
    const imagebb_api = `https://api.imgbb.com/1/upload?key=${imagebb_key}`;
    const {user,refetchProducts}=useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit,reset } = useForm();

    const onSubmit = async(data) => {
      
      let product = {};
      const additionalData = 
      {
        email : user?.email,
        author: user?.displayName,
        authorPhoto:user?.photoURL,
        postedTime: new Date().toISOString(),
        upVote:0
      }
      product = Object.assign({},data,additionalData)

      const imageFile = {image: data.productImg[0]};
      const res = await axios.post(imagebb_api, imageFile, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(res.data);
      if(res.data.success){
      reset();
      // console.log(res.data.data.display_url);
      product.productImg = res.data.data.display_url;
      // console.log(product);

      await axiosSecure.post('/products/add',product);
      // console.log(res2)
      toast.success('Product Added Sucessfully',{
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
      refetchProducts();
      } 
    
  }

    
    return (
        <div className="hero w-full h-full">
        <div className="hero-content flex-row-reverse w-full">
            <div className="card shrink-0 w-full shadow-2xl">
            <form className="card-body bg-primaryColor rounded-lg" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col lg:flex-row justify-between gap-2">
                <div className="form-control w-full ">
                     <input {...register("productName")} type="text" name="productName" placeholder="product name" className="input input-bordered bg-secendaryColor" required />
                </div>
                <div className="form-control w-full" >
                     <input {...register("productImg")} type="file" name="productImg" className="file-input w-full" required/>
                </div>
                </div>
               <div className="flex flex-col lg:flex-row justify-between gap-2">
               <div className="form-control w-full">
                     <input {...register("productLink")} type="text" name="productLink" placeholder="product url" className="input input-bordered bg-secendaryColor" required />
                </div>
                <div className="form-control w-full">
                     <input {...register("tag")} type="text" name="tag" placeholder="tag" className="input input-bordered bg-secendaryColor" required />
                </div>
               </div>
                <div className="form-control">
                     <textarea {...register("description")} name="description" placeholder="product description"  className="textarea textarea-bordered bg-secendaryColor" ></textarea>
                </div>

                <div className="flex flex-col lg:flex-row justify-between gap-2">
                <div className="avatar">
                  <div className="w-12 mask mask-squircle">
                    <img src={user?.photoURL} />
                  </div>
                </div>
                <div className="form-control w-full">
                     <input type="email" name="email" placeholder="user email" className="input input-bordered bg-secendaryColor" value={user?.email} readOnly/>
                </div>
                <div className="form-control w-full">
                     <input type="text" name="username" placeholder="username" className="input input-bordered bg-secendaryColor" value={user?.displayName} readOnly/>
                </div>
                </div>
                <button type="submit">Add</button>
            </form>
            </div>
        </div>
        <div><Toaster position="top-right"/></div>
    </div>
    );
};

export default AddProducts;