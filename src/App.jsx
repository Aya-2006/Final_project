import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Products from "./components/Products/Products";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Notfound from "./components/Notfound/Notfound";
import Categories from "./components/Categories/Categories";
import Cart from "./components/Cart/Cart";
import Brands from "./components/Brands/Brands";
import Login from "./components/Login/Login";
import Layout from "./components/Layout/Layout";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Context/CartContext";
import WishContextProvider from "./Context/WishContext";
import WishList from "./components/WishList/WishList"; 
import Checkout from "./components/Checkout/Checkout";
import Allorders from "./components/Allorders/Allorders";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import VerfiyCode from "./components/VerfiyCode/VerfiyCode";
import { Toaster } from "react-hot-toast";
import ResetPassword from './components/ResetPassword/ReserPassword';

const query = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Allorders />
          </ProtectedRoute>
        ),
      },
      {
        path: "wish",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "forgetpassword", element: <ForgetPassword /> },
      { path: "register", element: <Register /> },
      { path: "verfiycode", element: <VerfiyCode /> },
      { path: "resetpassword", element: <ResetPassword /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <UserContextProvider>
      <QueryClientProvider client={query}>
        <CartContextProvider>
          <WishContextProvider>
            <RouterProvider router={router} />
            <Toaster />
          </WishContextProvider>
        </CartContextProvider>
      </QueryClientProvider>
    </UserContextProvider>
  );
}

export default App;
