import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const MyProfile = () => {
    const {user}=useContext(AuthContext)
    return (
        <div>
            <div className="border-b-2 p-4">
                <h1 className="text-2xl">User Information</h1>
            </div>
            <div className="p-4 space-y-4 flex flex-col items-center">
                <div className="overflow-hidden rounded-full h-52 w-52">
                <img src={user?.photoURL} alt="User Photo" />
                </div>
                <div className="w-full text-left flex flex-col lg:flex-row justify-around">
                    <div>
                        <h1 className="text-2xl font-semibold">Name</h1>
                        <h1 className="text-xl font-semibold opacity-70">{user?.displayName}</h1>
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold">Email</h1>
                        <h1 className="text-xl font-semibold opacity-70">{user?.email}</h1>
                    </div>
                </div>
                <div className="w-full text-left flex flex-col lg:flex-row justify-around">
                    <div>
                        <h1 className="text-2xl font-semibold">Subscribe</h1>
                        <h1 className="text-xl font-semibold opacity-70">{user?.displayName}</h1>
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold">Subscribe Status</h1>
                        <h1 className="text-xl font-semibold opacity-70">{user?.email}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;