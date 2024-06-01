import { IoMdArrowDropup } from "react-icons/io";

const ProductCard = ({product}) => {
    return (
        <div className="max-w-sm mx-auto flex flex-col rounded-lg bg-primaryColor">
                    <div className="overflow-hidden h-52 rounded-t-lg flex justify-center items-center">
                        <img className="object-cover rounded-t-lg" src={product.productImg} alt="Product Image" />
                    </div>
                    <div className="p-4 space-y-4">
                        <h1 className="text-md md:text-lg lg:text-xl font-bold">{product.productName}</h1>
                        <p>Author: {product.author}</p>
                        <div className="flex">
                            <h1 className="py-2 px-4 rounded-full text-center bg-secendaryColor">{product.tag}</h1>
                        </div>
                    </div>
                    <div>
                        <button className="inline-flex items-center"><IoMdArrowDropup className="text-5xl"/>Vote</button>
                    </div>
                </div>
    );
};

export default ProductCard;