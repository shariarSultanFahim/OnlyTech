import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import ProductCard from "../ProductCard/ProductCard";
const Products = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const axiosSecure = useAxiosSecure();
    const [searchKeyWord, setSearchKeyWord] = useState('');

    const {data:searcedProducts, isPending,refetch} = useQuery({
        queryKey:['searchedProducts',searchKeyWord],
        queryFn: async (searchKeyWord)=>{
          console.log(searchKeyWord.queryKey[1]);
          const query = searchKeyWord.queryKey[1] != undefined? `?search=${searchKeyWord.queryKey[1]}`:'';
          const res =await axiosSecure.get(`/products/search${query}`);
          return res.data;
        }
      })

      if(isPending){
        return (
            <div className="min-h-screen">
                <form className=" my-10 flex justify-center ">
                <div className="relative">
                    <input type="text" name="search" placeholder="ai,rpg,web,automation..." className=" input input-bordered w-full max-w-xs"/>
                    <button type="submit" className="absolute top-2 right-2"><IoSearchSharp className="text-3xl"/></button>
                </div>
                </form>
                <div className="flex my-10">
                    <span className="loading loading-dots loading-lg mx-auto"></span>
                </div>
            </div>
        )
      }

    const itemsPerPage = 6;
    
    const totalPage = Math.ceil([searcedProducts?.length / itemsPerPage]);
    
    const currentProducts = searcedProducts?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
    
      const handlePageChange = (page) =>{
        setCurrentPage(page);
      }

      const handleSearch = (e) =>{
        e.preventDefault();
        const search  = e.target.search.value;
        setSearchKeyWord(search);
        setCurrentPage(1);
        refetch();
      }

    return (
       <div>
            <form onSubmit={handleSearch} className=" my-10 flex justify-center ">
                <div className="relative">
                    <input type="text" name="search"  placeholder="ai,rpg,web,automation..."  className=" input input-bordered w-full max-w-xs"/>
                    <button type="submit" className="absolute top-2 right-2"><IoSearchSharp className="text-3xl"/></button>
                </div>
            </form>
            <div className="my-10 flex flex-wrap gap-6">
                {
                    isPending?<span className="loading loading-dots loading-lg mx-auto"></span>
                    :currentProducts?.map(product => <ProductCard  key={product._id} product={product}  /> )
                }
            </div>
            <div className="join my-10 flex justify-center">
                {Array.from({ length: totalPage }, (_, index) => (
                <button
                    key={index + 1}
                    className={`join-item btn btn-md ${currentPage === index + 1 ? 'btn-active' : ''}`}
                    onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                </button>
                ))}
            </div>
       </div>
    );
};

export default Products;