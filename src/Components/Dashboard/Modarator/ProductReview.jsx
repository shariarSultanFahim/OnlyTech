import { useContext, useState } from "react";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import useDocumentTitle from "../../../CustomHooks/useDocumentTitle";
import { AuthContext } from "../../AuthProvider/AuthProvider";


const ProductReview = () => {
  useDocumentTitle("Review Product");
  const axiosSecure = useAxiosSecure();
  const { products, productsLoadig,refetchProducts, refetchAcceptedProducts,featuredRefetch } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (productsLoadig) {
    return (
      <div className="min-h-screen grid place-items-center">
        <ReactLoading
          type={"spinningBubbles"}
          color={"#bac3bf"}
          height={100}
          width={100}
        />
      </div>
    );
  }

  const totalPage = Math.ceil([products?.length / itemsPerPage]);

  const currentProducts = products?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleMakeFeatured = async(product) => {
    await axiosSecure.post('/featured/add',product);
    refetchProducts(),
    refetchAcceptedProducts(),
    featuredRefetch()
  }
  const handleAccept = async(id) => {
    const product = {status : 'accepted'};
    await axiosSecure.put(`/products/update?id=${id}`,product);
    refetchProducts(),
    refetchAcceptedProducts()
  };
  const handleReject = async(id) => {
    const product = {status : 'rejected'};
    await axiosSecure.put(`/products/update?id=${id}`,product);
    refetchProducts(),
    refetchAcceptedProducts()
  };
  return (
    <div>
      <div className="border-b-2 p-4">
        <h1 className="text-2xl">Product Review Queue</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Details</th>
              <th>Status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentProducts?.map((product) => (
              <tr key={product._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={product.productImg} alt="Product Image" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{product.productName}</div>
                      <div className="text-sm opacity-50">{product.tag}</div>
                    </div>
                  </div>
                </td>
                <td>
                    <button className="btn btn-ghost btn-xs bg-primaryColor">
                        <Link to={`/products/${product._id}`}>Details</Link>
                    </button>
                </td>
                <td>{product.status}</td>
                <th>
                 <button
                 disabled = {product.status !== 'accepted'}
                 onClick={()=>handleMakeFeatured(product)}  className="btn btn-ghost btn-xs bg-primaryColor">
                    Make Featured
                  </button>
                </th>
                <th>
                 <button onClick={()=>handleAccept(product._id)} className="btn btn-ghost btn-xs bg-primaryColor">
                    Accept
                  </button>
                </th>
                <th>
                  <button onClick={()=>handleReject(product._id)} className="btn btn-ghost btn-xs bg-red-300">
                    Reject
                  </button>
                </th>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <th>Product Name</th>
              <th>Product Details</th>
              <th>Status</th>
              <th></th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="join my-10 flex justify-center">
        {Array.from({ length: totalPage }, (_, index) => (
          <button
            key={index + 1}
            className={`join-item btn btn-md ${
              currentPage === index + 1 ? "btn-active" : ""
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductReview;
