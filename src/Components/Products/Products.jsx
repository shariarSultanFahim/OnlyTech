import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import ProductCard from "../ProductCard/ProductCard";

const Products = () => {
    const {products} = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const totalPage = Math.ceil([products?.length / itemsPerPage]);
    const currentProducts = products?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
      const handlePageChange = (page) =>{
        setCurrentPage(page);
      }
    return (
       <div>
            <div className="my-10 flex flex-wrap gap-6">
                    {
                        currentProducts?.map(product => <ProductCard  key={product._id} product={product}  /> )
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