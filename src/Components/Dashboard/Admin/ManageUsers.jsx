import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ReactLoading from "react-loading";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import useDocumentTitle from "../../../CustomHooks/useDocumentTitle";


const ManageUsers = () => {
    useDocumentTitle('Manage Users')

    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const {data:users={},isPending:usersLoading,refetch:refetchUsers} = useQuery({
        queryKey:['usersData'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users`);
            return res.data;
        }
    })

    if(usersLoading){
      return (
        <div className="min-h-screen grid place-items-center">
        <ReactLoading
          type={"spinningBubbles"}
          color={"#bac3bf"}
          height={100}
          width={100}
        />
      </div>
      )
    }
    

    const usersPerPage = 6;
    const totalPage = Math.ceil([users?.length / usersPerPage]);

    const currentUsers = users?.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

  const handleMakeAdmin = (id)=>{
    const updatedUser = {
      userType:'admin'
    }
    Swal.fire({
        title: "Do you want to make the user an  admin?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            const res = axiosSecure.put(`/users/update?id=${id}`,updatedUser).then((result)=>{
                refetchUsers();
            });
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
  }
  const handleMakeMod = (id)=>{
    const updatedUser = {
      userType:'modarator'
    }
    Swal.fire({
        title: "Do you want to make the user a modarator?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            const res = axiosSecure.put(`/users/update?id=${id}`,updatedUser).then((result)=>{
                refetchUsers();
            });
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
  }


  return (
    <div>
        <div className="border-b-2 p-4">
                <h1 className="text-2xl">Manage Users</h1>
            </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>User Info</th>
              <th>User Type</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentUsers?.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={user.photo} alt="Product Image" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>{user.userType}</td>
                <th>
                  <button onClick={()=>{handleMakeMod(user._id)}}  className="btn btn-ghost btn-xs bg-primaryColor"
                  disabled={user.userType === 'admin'}
                  >
                    Make Mod
                  </button>
                </th>
                <th>
                  <button onClick={()=>handleMakeAdmin(user._id)}  className="btn btn-ghost btn-xs bg-red-300"
                  disabled={user.userType === 'admin'}
                  >
                    Make Admin
                  </button>
                </th>
              </tr>
            ))}
          </tbody>

          <tfoot>
          <tr>
              <th>User Info</th>
              <th>User Type</th>
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

export default ManageUsers;

