import { useContext, useState } from "react";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import useDocumentTitle from "../../CustomHooks/useDocumentTitle";
import { AuthContext } from "../AuthProvider/AuthProvider";

const MyProducts = () => {
    useDocumentTitle('My Products')
  const axiosSecure = useAxiosSecure();
  const { user, usersProducts, usersProductLoading,refetchUsersProducts,refetchProducts } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;


  if (usersProductLoading) {
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

  const totalPage = Math.ceil([usersProducts?.length / itemsPerPage]);

  const currentProducts = usersProducts?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (id)=>{
    Swal.fire({
        title: "Do you want to delete the product?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Delete",
        denyButtonText: `Don't Delete`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            const res = axiosSecure.delete(`/products/delete?id=${id}`).then((result)=>{
                refetchUsersProducts();
                refetchProducts(); 
            });
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
  }


  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Up Votes</th>
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
                <td>{product.upVote}</td>
                <td>{product.status}</td>
                <th>
                  <Link to={`/dashboard/updateProduct/${product._id}`}><button  className="btn btn-ghost btn-xs bg-primaryColor">
                    Update
                  </button></Link>
                </th>
                <th>
                  <button onClick={()=>handleDelete(product._id)} className="btn btn-ghost btn-xs bg-red-300">
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <th>Product Name</th>
              <th>Up Votes</th>
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

export default MyProducts;
