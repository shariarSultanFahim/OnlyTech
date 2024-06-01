import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import ProductCard from "../ProductCard/ProductCard";

const Products = () => {
    const {products} = useContext(AuthContext)
    return (
        <div className="my-10 flex flex-wrap gap-6">
                {
                    products?.map(product => <ProductCard  key={product._id} product={product}  /> )
                }
        </div>
    );
};

export default Products;