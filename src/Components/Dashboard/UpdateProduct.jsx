import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import ReactLoading from 'react-loading';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import useDocumentTitle from "../../CustomHooks/useDocumentTitle";
import { AuthContext } from "../AuthProvider/AuthProvider";

const UpdateProduct = () => {
    useDocumentTitle('Update Products');
    const imagebb_key = import.meta.env.VITE_IMAGEBB_KEY;
    const imagebb_api = `https://api.imgbb.com/1/upload?key=${imagebb_key}`;
    const {user,refetchProducts,refetchUsersProducts,featuredRefetch}=useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const {id} = useParams();
    const [imageUpload, setImageUpload]=useState(true);
    const { register, handleSubmit,reset } = useForm();


    
    const location = useLocation();
    const navigate = useNavigate();
    if(location.state === null){
        location.state = '/dashboard/myProducts';
    }

    const {data:currentProduct} = useQuery({
        queryKey:['currentProduct',id],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/products?id=${id}`)
            return res.data;
        }
    })
    if(!currentProduct){
        return (
            <div className="min-h-screen grid place-items-center">
                <ReactLoading type={'spinningBubbles'} color={'#bac3bf'} height={100} width={100}/>
            </div>
        )
    }


    const handleImageUpload = () =>{
      setImageUpload(!imageUpload);
    }
    
    const onSubmit = async(data) => {
      
      let product = {};

      product = Object.assign({},data)
      // console.log(product);
      if(product?.productImg[0]?.name){
      const imageFile = {image: data.productImg[0]};
      const res = await axios.post(imagebb_api, imageFile, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      // console.log(res.data);
      if(res.data.success){
      // console.log(res.data.data.display_url);
      product.productImg = res.data.data.display_url;
      // console.log(product);
      await axiosSecure.put(`/products/update?id=${id}`,product);
      await axiosSecure.put(`/featured/update?id=${id}`,product);
      // console.log(res2)
      toast.success('Product Updated Sucessfully',{
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
      refetchProducts();
      refetchUsersProducts();
      featuredRefetch();
      navigate(location.state);
      } 
      }
      else{
        // product.productImg = currentProduct?.productImg
        await axiosSecure.put(`/products/update?id=${id}`,product);
        await axiosSecure.put(`/featured/update?id=${id}`,product);
      // console.log(res2)
      toast.success('Product Updated Sucessfully',{
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
      refetchProducts();
      refetchUsersProducts();
      featuredRefetch();
      navigate(location.state);
      }
        
  }

    
    return (
        <div className="hero w-full h-full">
        <div className="hero-content flex-row-reverse w-full">
            <div className="card shrink-0 w-full shadow-2xl">
            <form className="card-body bg-primaryColor rounded-lg" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col lg:flex-row justify-between gap-2">
                <div className="form-control lg:w-6/12">
                     <input {...register("productName")} type="text" name="productName" placeholder="product name" className="input input-bordered bg-secendaryColor" defaultValue={currentProduct?.productName} />
                </div>
                <div className="form-control lg:w-5/12" >
                     {
                      (imageUpload)?
                        <input {...register("productImg")} type="file" name="productImg" className="file-input w-full"/>
                        :
                      <input {...register("productImg")} type="text" name="productImg" className="input input-bordered bg-secendaryColor" placeholder="image url" defaultValue={currentProduct?.productImg} />
                     }
                </div>
                <div className="lg:w-1/12">
                  {
                    imageUpload?
                    <button type="button" className="btn w-full" onClick={handleImageUpload}>url</button>
                    :
                    <button type="button" className="btn w-full" onClick={handleImageUpload}>file</button>
                  }
                </div>
                </div>
               <div className="flex flex-col lg:flex-row justify-between gap-2">
               <div className="form-control w-full">
                     <input {...register("productLink")} type="text" name="productLink" placeholder="product url" className="input input-bordered bg-secendaryColor"  defaultValue={currentProduct?.productLink}/>
                </div>
                <div className="form-control w-full">
                     <input {...register("tag")} type="text" name="tag" placeholder="tag" className="input input-bordered bg-secendaryColor" defaultValue={currentProduct?.tag} />
                </div>
               </div>
                <div className="form-control">
                     <textarea {...register("description")} name="description" placeholder="product description"  className="textarea textarea-bordered bg-secendaryColor" defaultValue={currentProduct?.description}></textarea>
                </div>

                <div className="flex flex-col lg:flex-row justify-between items-center gap-2">
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
                <button type="submit" className="btn mx-auto">Update</button>
            </form>
            </div>
        </div>
        <div><Toaster position="top-right"/></div>
    </div>
    );
};

export default UpdateProduct;