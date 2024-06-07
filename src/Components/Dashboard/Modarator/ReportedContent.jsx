import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import useDocumentTitle from "../../../CustomHooks/useDocumentTitle";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const ReportedContent = () => {
    useDocumentTitle('Reported Content');
    const axiosSecure = useAxiosSecure();
    const { refetchProducts, refetchAcceptedProducts,featuredRefetch } = useContext(AuthContext);
  
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const {data:reports, isPending:reportsLoading, refetch:refetchReports} = useQuery({
        queryKey:['report'],
        queryFn: async () =>{
            const {data} = await axiosSecure.get('/product/report');
            return data;
        }
    })
  
    if (reportsLoading) {
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
  
    const totalPage = Math.ceil([reports?.length / itemsPerPage]);
  
    const currentProducts = reports?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

    const handleDelete = async(id,productID) => {
      await axiosSecure.delete(`/product/report?id=${id}`);
      await axiosSecure.delete(`/products/delete?id=${productID}`);
      await axiosSecure.delete(`/featured/delete?id=${productID}`);
      refetchReports(),
      refetchProducts(),
      refetchAcceptedProducts(),
      featuredRefetch()
    };

    return (
        <div>
            <div className="border-b-2 p-4">
                <h1 className="text-2xl">Reports</h1>
            </div>
            <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Product</th>
              <th>Product Details</th>
              <th>Delete</th>
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
                        <Link to={`/product/${product.productID}`}>Details</Link>
                    </button>
                </td>
                <th>
                 <button onClick={()=>handleDelete(product._id,product.productID)} className="btn btn-error btn-xs">
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <th>Product</th>
              <th>Product Details</th>
              <th>Delete</th>
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

export default ReportedContent;