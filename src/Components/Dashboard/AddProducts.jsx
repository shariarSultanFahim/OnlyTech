import { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import useDocumentTitle from "../../CustomHooks/useDocumentTitle";
import { AuthContext } from "../AuthProvider/AuthProvider";


const AddProducts = () => {
    useDocumentTitle('Add Products');
    const {user,refetchProducts}=useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const handleAddProduct = async(e) =>{
        e.preventDefault();
        const productName = e.target.productName.value;
        const productImg = e.target.productImg.value;
        const productLink = e.target.productLink.value;
        const tag = e.target.tag.value;
        const description = e.target.description.value;

        const product = {
            productName,
            productImg,
            productLink,
            tag,
            description,
            email : user?.email,
            author: user?.displayName,
            postedTime: new Date().toISOString(),
            upVote:0
        }

        try{
            const res = await axiosSecure.post('/products/add',product);
            toast.success('Product Added Sucessfully',{
                position:"top-center",
                style: {
                  border: '1px solid #eef1f0',
                  padding: '16px',
                  color: '#bac3bf',
                },
                iconTheme: {
                  primary: '#eef1f0',
                  secondary: '#bac3bf',
                },
              });
            e.target.reset();
            refetchProducts();
        }catch(error){
            toast.error(error.massege,{
                position:"top-center",
                style: {
                  border: '1px solid #eef1f0',
                  padding: '16px',
                  color: '#bac3bf',
                },
                iconTheme: {
                  primary: '#eef1f0',
                  secondary: '#bac3bf',
                },
              });
        }
    }
    return (
        <div className="hero w-full h-full">
        <div className="hero-content flex-row-reverse w-full">
            <div className="card shrink-0 w-full max-w-sm shadow-2xl">
            <form className="card-body bg-primaryColor rounded-lg" onSubmit={handleAddProduct}>
                <div className="form-control">
                     <input type="text" name="productName" placeholder="product name" className="input input-bordered bg-secendaryColor" required />
                </div>
                <div className="form-control">
                     <input type="text" name="productImg" placeholder="product image url" className="input input-bordered bg-secendaryColor" required />
                </div>
                <div className="form-control">
                     <input type="text" name="productLink" placeholder="product url" className="input input-bordered bg-secendaryColor" required />
                </div>
                <div className="form-control">
                     <input type="text" name="tag" placeholder="tag" className="input input-bordered bg-secendaryColor" required />
                </div>
                <div className="form-control">
                     <textarea name="description" placeholder="product description" className="input input-bordered bg-secendaryColor" required ></textarea>
                </div>
                <button type="submit">Add</button>
            </form>
            </div>
        </div>
        <div><Toaster position="top-right"/></div>
    </div>
    );
};

export default AddProducts;