import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Header from "../Header/Header";
import ProductCard from "../ProductCard/ProductCard";

const TrendingProducts = () => {
    const {acceptedProducts} = useContext(AuthContext);
    return (
        <div className="pt-20">
            <Header title={'Discover the Latest Trends'} subtitle={'Explore Our Selection of Trending Products Across Various Categories'}/>
            
            <div className="my-10 flex flex-wrap gap-6">
                {
                    acceptedProducts?.slice(0,6).map(product => <ProductCard  key={product._id} product={product}  /> )
                }
            </div>
        </div>
    );
};

export default TrendingProducts;