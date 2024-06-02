import Banner from "./Banner";
import FeaturedProducts from "./FeaturedProducts";
import TrendingProducts from "./TrendingProducts";

const Home = () => {
    return (
        <div>
            <div className="bg-primaryColor">
                <Banner/>
            </div>
            <div className="max-w-screen-xl mx-auto my-10">
                <FeaturedProducts/>
            </div>
            <div className="max-w-screen-xl mx-auto my-10">
                <TrendingProducts/>
            </div>

        </div>
    );
};

export default Home;