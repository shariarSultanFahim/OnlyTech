import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { IoMdArrowDropup } from "react-icons/io";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import useDocumentTitle from "../../CustomHooks/useDocumentTitle";
import { AuthContext } from "../AuthProvider/AuthProvider";

const ProductDetails = () => {
    useDocumentTitle('Details');
    const {id} = useParams();
    const axiosSecure = useAxiosSecure();
    const {user,refetchProducts}=useContext(AuthContext);

    const {data:product,isPending} = useQuery({
        queryKey:['product-details',id],
        queryFn: async()=>{
            const {data} = await axiosSecure.get(`/products?id=${id}`);
            return data;
        }
    })
    
    const handleUpVote = () =>{
        axiosSecure.post(`products/vote?id=${product?._id}&email=${user?.email}`);
        refetchProducts();
    }

    return (
        <div className="max-w-screen-xl mx-auto my-10 min-h-screen">
            <section className="p-4 flex flex-col lg:flex-row justify-between items-start gap-4">
                <div className="overflow-hidden lg:w-2/5 rounded-md">
                    <img className="w-full h-full object-cover" src={product?.productImg} alt="Product Image" />
                </div>
                <div className="lg:w-3/5 flex flex-col gap-4 lg:gap-0 lg:flex-row items-start">
                    <div className="space-y-6">
                        <h3 className="text-xl">{product?.author}</h3>
                        <h1 className="text-5xl">{product?.productName}</h1>
                        <p className="text-xl opacity-80">{product?.description}</p>
                        <p className="text-md opacity-80">Tags: {product?.tag}</p>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <button onClick={() => window.open(product?.productLink, '_blank', 'noopener,noreferrer')} className="btn">Visit</button>
                        <button onClick={handleUpVote} disabled={product.email == user?.email || product?.upvoteEmail?.includes(user?.email)} className="btn bg-primaryColor">
                            <IoMdArrowDropup className="text-2xl"/> Upvote {product?.upVote}</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductDetails;