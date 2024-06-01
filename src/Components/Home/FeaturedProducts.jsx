import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Header from "../Header/Header";
import ProductCard from "../ProductCard/ProductCard";

const FeaturedProducts = () => {
    const {products} = useContext(AuthContext);
    return (
        <div className="">
            <Header title={'Featured Products'} subtitle={'Handpicked Tech Tools and Apps Just for You'}/>
            
            <div className="my-10 flex flex-wrap gap-6">
                {
                    products?.map(product => <ProductCard  key={product._id} product={product}  /> )
                }
            </div>
        </div>
    );
};

export default FeaturedProducts;