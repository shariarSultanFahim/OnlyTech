import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { IoMdArrowDropup } from "react-icons/io";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import useDocumentTitle from "../../CustomHooks/useDocumentTitle";
import { AuthContext } from "../AuthProvider/AuthProvider";
import ReviewCard from "./ReviewCard";
import ReviewSection from "./ReviewSection";

const ProductDetails = () => {
    useDocumentTitle('Details');
    const {id} = useParams();
    const axiosSecure = useAxiosSecure();
    const {user,refetchProducts}=useContext(AuthContext);
    
    const {data:product={}} = useQuery({
        queryKey:['product-details',id],
        queryFn: async()=>{
            const {data} = await axiosSecure.get(`/products?id=${id}`);
            return data;
        }
    })

    const {data:reviews,refetch:refetchReview,isPending:reviewLoading} = useQuery({
        queryKey:['review',id],
        queryFn: async()=>{
            const {data} = await axiosSecure.get(`/review?id=${id}`);
            return data;
        }
    })
    if(reviewLoading){
        return (
            <div>Loading...</div>
        )
    }
    const handleUpVote = () =>{
        axiosSecure.post(`products/vote?id=${product?._id}&email=${user?.email}`);
        refetchProducts();
    }

    const handleReport = () =>{
        const report =
        {
            productID: product?._id,
            reporterBy: user?.email,
            productName: product?.productName,
            productImg: product?.productImg,
            author: product?.author,
            tag: product?.tag
        }
        axiosSecure.post('/product/report',report).then((result) => {
            console.log(result.data);
        })
    }

    return (
        <div className="max-w-screen-xl mx-auto my-10 min-h-screen">
            <section className="flex flex-col lg:flex-row justify-between items-center gap-4 px-2 lg:px-0">
                <div className="overflow-hidden h-80 lg:w-2/5 rounded-md">
                    <img className="w-full h-full object-cover" src={product?.productImg} alt="Product Image" />
                </div>
                <div className="lg:w-3/5 flex flex-col gap-4 lg:gap-0 lg:flex-row items-start">
                    <div className="space-y-6">
                        <h3 className="text-xl">{product?.author}</h3>
                        <h1 className="text-5xl">{product?.productName}</h1>
                        <p className="text-xl opacity-80">{product?.description}</p>
                        <p className="text-md opacity-80">Tags: {product?.tag}</p>
                        <button onClick={handleReport} className="p-2 bg-red-400 rounded-md text-white font-semibold">Report</button>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <button onClick={() => window.open(product?.productLink, '_blank', 'noopener,noreferrer')} className="btn">Visit</button>
                        <button onClick={handleUpVote} disabled={product?.email == user?.email || product?.upvoteEmail?.includes(user?.email)} className="btn bg-primaryColor">
                            <IoMdArrowDropup className="text-2xl"/> Upvote {product?.upVote}</button>
                    </div>
                </div>
            </section>

            <section className="my-10 py-10">
                <div>
                    <h1 className="p-2 text-xl font-semibold border-b-4 border-primaryColor opacity-90">Reviews</h1>
                </div>
                {
                (user?.email === product?.email)?"You can't review your own post" 
                :
                (reviews?.some(review => review?.userEmail === user?.email))?
                "You've already posted a review"
                :
                <ReviewSection product={product} refetchReview={refetchReview}/>
                }
            </section>
            <section className="flex flex-wrap justify-evenly ">
                {
                    reviews?.map(review => <ReviewCard key={review?._id} review={review}/>)
                }
            </section>
        </div> 
    );
};

export default ProductDetails;