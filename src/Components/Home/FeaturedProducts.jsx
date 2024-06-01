import Header from "../Header/Header";
import ProductCard from "../ProductCard/ProductCard";

const FeaturedProducts = () => {
    return (
        <div className="">
            <Header title={'Featured Products'} subtitle={'Handpicked Tech Tools and Apps Just for You'}/>
            
            <div className="my-10">
                <ProductCard/>
            </div>
        </div>
    );
};

export default FeaturedProducts;