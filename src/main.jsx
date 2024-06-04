import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthProvider from "./Components/AuthProvider/AuthProvider";
import AddProducts from "./Components/Dashboard/AddProducts";
import ManageCoupons from "./Components/Dashboard/Admin/ManageCoupons";
import ManageUsers from "./Components/Dashboard/Admin/ManageUsers";
import Statistics from "./Components/Dashboard/Admin/Statistics";
import Dashboard from "./Components/Dashboard/Dashboard";
import MyProducts from "./Components/Dashboard/MyProducts";
import MyProfile from "./Components/Dashboard/MyProfile";
import UpdateProduct from "./Components/Dashboard/UpdateProduct";
import Error from "./Components/ErrorRoute/Error";
import Home from "./Components/Home/Home";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Products from "./Components/Products/Products";
import Root from "./Components/Root/Root";
import Login from "./Components/User/Login";
import Signup from "./Components/User/Signup";
import "./index.css";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/signUp',
        element:<Signup/>
      },
      {
        path:'/products',
        element:<Products/>
      },
      
    ],
  },
  {
    path:"/dashboard",
    element:<Dashboard/>,
    errorElement:<Error/>,
    children:[
      {
        path:"/dashboard",
        element:<PrivateRoute><MyProfile/></PrivateRoute>
      },
      {
        path:'/dashboard/addproducts',
        element:<PrivateRoute><AddProducts/></PrivateRoute>
      },
      {
        path:'/dashboard/myProfile',
        element:<PrivateRoute><MyProfile/></PrivateRoute>
      },
      {
        path:'/dashboard/MyProducts',
        element:<PrivateRoute><MyProducts/></PrivateRoute>
      },
      {
        path:'/dashboard/updateProduct/:id',
        element:<PrivateRoute><UpdateProduct/></PrivateRoute>
      },
      {
        path:'/dashboard/statistics',
        element:<PrivateRoute><Statistics/></PrivateRoute>
      },
      {
        path:'/dashboard/manageUsers',
        element:<PrivateRoute><ManageUsers/></PrivateRoute>
      },
      {
        path:'/dashboard/manageCoupons',
        element:<PrivateRoute><ManageCoupons/></PrivateRoute>
      }
    ]
  }

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
