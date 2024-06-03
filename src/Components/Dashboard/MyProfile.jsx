import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import ReactLoading from 'react-loading';
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import useDocumentTitle from "../../CustomHooks/useDocumentTitle";
import { AuthContext } from "../AuthProvider/AuthProvider";

const MyProfile = () => {
    useDocumentTitle('Dashboard')
    const {user}=useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const {data:userData,isPending:userDataLoading} = useQuery({
        queryKey:['usersData',user],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users?email=${user?.email}`);
            return res.data;
        }
    })

    return (
        <div>
            <div className="border-b-2 p-4">
                <h1 className="text-2xl">User Information</h1>
            </div>
            {
                userDataLoading?
                <div className="grid place-items-center">
                <ReactLoading type={'spinningBubbles'} color={'#bac3bf'} height={100} width={100}/>
            </div>
                :
                <div className="p-4 space-y-4 flex flex-col items-center">
                <div className="overflow-hidden rounded-full h-52 w-52">
                <img className="h-full w-full" src={user?.photoURL} alt="User Photo" />
                </div>
                <div className="w-full flex flex-col lg:flex-row justify-around gap-6">
                <div className="w-full flex flex-col justify-between gap-6">
                    <div>
                        <h1 className="text-2xl font-semibold">Name</h1>
                        <h1 className="text-xl font-semibold opacity-70">{userData?.name}</h1>
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold">Email</h1>
                        <h1 className="text-xl font-semibold opacity-70">{userData?.email}</h1>
                    </div>
                </div>
                <div className="w-full flex flex-col justify-between gap-6">
                    {
                        (userData?.membershipType === 'free') ?
                        <div>
                            <h1 className="text-2xl font-semibold">Subscribe Now</h1>
                            <button className="btn btn-primary ">$49.99</button>
                        </div>
                        :
                        <div>
                            <h1 className="text-2xl font-semibold">Subscribe Status</h1>
                            <h1 className="text-xl font-semibold opacity-70">{userData?.membershipType}</h1>
                        </div>
                    }
                    <div>
                        <h1 className="text-2xl font-semibold">Account Type</h1>
                        <h1 className="text-xl font-semibold opacity-70">{userData?.userType}</h1>
                    </div>
                    
                </div>
                </div>
            </div>
            }
            
        </div>
    );
};

export default MyProfile;