import Banner from "./Banner";
import FeaturedProducts from "./FeaturedProducts";

const Home = () => {
    return (
        <div>
            <div className="bg-primaryColor">
                <Banner/>
            </div>
            <div className="max-w-screen-xl mx-auto my-10">
                <FeaturedProducts/>
            </div>
        </div>
    );
};

export default Home;