// src/routes/Routes.jsx
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";

import Login from "../pages/Login";
import Register from "../pages/Register";

import EmployeDashboard from "../pages/EmployeDashboard";
import ProductList from "../pages/products/ProductList";
import AddProduct from "../pages/products/AddProduct";
import EditProduct from "../pages/products/EditProduct";
import CustomerList from "../pages/customers/CustomerList";
import AddCustomer from "../pages/customers/AddCustomer";
import EditCustomer from "../pages/customers/EditCustomer";
import TransactionList from "../pages/transactions/TransactionList";
import TransactionDetails from "../pages/transactions/TransactionDetails";
import AddTransaction from "../pages/transactions/AddTransaction";

import AdminDashboard from "../pages/AdminDashboard";
import UserList from "../pages/users/UserList";
import AddUser from "../pages/users/AddUser";
import EditUser from "../pages/users/EditUser";
import UserDetails from "../pages/users/UserDetails";

import AdminLayout from "../components/AdminLayout";
import EmployeLayout from "../components/EmployeLayout";

import Unauthorized from "../pages/Unauthorized";


const Routes = () => {
  const { token, role } = useAuth();

  const router = createBrowserRouter([
    // ROUTE UNAUTHORIZED
    {
      path: "/unauthorized",
      element: <Unauthorized />,
    },

    // ROUTE PUBLIK
    {
      path: "/",
      element: token ? (
        <Navigate
          to={role === "admin" ? "/admin/dashboard" : "/employe/dashboard"}
        />
      ) : (
        <Login />
      ),
    },
    {
      path: "/register",
      element: <Register />,
    },

    // ROUTE ADMIN
    {
      path: "/",
      element: <ProtectedRoute allowedRoles={["admin"]} />,
      children: [
        {
          path: "/",
          element: <AdminLayout />,
          children: [
            { path: "admin/dashboard", element: <AdminDashboard /> },
            { path: "admin/users", element: <UserList /> },
            { path: "admin/users/add", element: <AddUser /> },
            { path: "admin/users/edit", element: <EditUser /> },
            { path: "admin/users/details/:id", element: <UserDetails /> },
            { path: "admin/products", element: <ProductList /> },
            { path: "admin/products/add", element: <AddProduct /> },
            { path: "admin/products/edit/:id", element: <EditProduct /> },
            { path: "admin/customer", element: <CustomerList /> },
            { path: "admin/customer/add", element: <AddCustomer /> },
            { path: "admin/transaction", element: <TransactionList /> },
            {
              path: "admin/transaction/details",
              element: <TransactionDetails />,
            },
            { path: "admin/transaction/add", element: <AddTransaction /> },
          ],
        },
      ],
    },

    // ROUTE EMPLOYEE
    {
      path: "/",
      element: <ProtectedRoute allowedRoles={["employee"]} />,
      children: [
        {
          path: "/",
          element: <EmployeLayout />,
          children: [
            { path: "employe/dashboard", element: <EmployeDashboard /> },
            
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
