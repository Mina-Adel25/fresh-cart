import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Products from './components/Products/Products';
import Brandes from './components/Brandes/Brandes';
import Categories from './components/Categories/Categories';
import NotFound from './components/NotFound/NotFound';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import AuthContextProvider from './Context/AuthContext';
import ProtectedRote from './components/ProtectedRote/ProtectedRote';
import AuthRoute from './components/AuthRoute/AuthRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';
import ProductDetails from './components/ProductDetails/ProductDetails';
import ItemsPage from './components/ItemsPage/ItemsPage';
import CartContextProVider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Orders from './components/Orders/Orders';
import Allorders from './components/Allorders/Allorders';
import WishlistContext from './Context/WishlistContext';
import Wishlist from './components/Wishlist/Wishlist';
import ForgotPassword from './components/Forgot-password/ForgotPassword';
import VerifyCode from './components/VerifyCode/VerifyCode';
import ResetPassword from './components/ResetPassword/ResetPassword';

const Browser = createBrowserRouter(
  [
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "", element: <ProtectedRote><Home /></ProtectedRote> },
        { path: "home", element: <ProtectedRote><Home /></ProtectedRote> },
        { path: "cart", element: <ProtectedRote><Cart /></ProtectedRote> },
        { path: "products", element: <ProtectedRote><Products /></ProtectedRote> },
        { path: "categories", element: <ProtectedRote><Categories /></ProtectedRote> },
        { path: "brandes", element: <ProtectedRote><Brandes /></ProtectedRote> },
        { path: "Productdetails/:id", element: <ProtectedRote><ProductDetails /></ProtectedRote> },
        { path: "ItemsPage/:type/:id", element: <ProtectedRote><ItemsPage /></ProtectedRote> },
        { path: "orders", element: <ProtectedRote><Orders /></ProtectedRote> },
        { path: "allorders", element: <ProtectedRote><Allorders /></ProtectedRote> },
        { path: "wishlist", element: <ProtectedRote><Wishlist /></ProtectedRote> },

        { path: "login", element: <AuthRoute><Login /></AuthRoute> },
        { path: "register", element: <AuthRoute><Register /></AuthRoute> },
        { path: "forgot-password", element: <AuthRoute><ForgotPassword /></AuthRoute> },
        { path: "verify-code", element: <AuthRoute><VerifyCode /></AuthRoute> },
        { path: "reset-password", element: <AuthRoute><ResetPassword /></AuthRoute> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,  
  }
)

const client = new QueryClient();
function App() {

  useEffect(() => {
    AOS.init({
      duration: 1000,

    });
  }, []);

  return (
    <>
      <QueryClientProvider client={client}>

        <AuthContextProvider>

          <CartContextProVider>

            <WishlistContext>

              <RouterProvider router={Browser} />

            </WishlistContext>

          </CartContextProVider>

        </AuthContextProvider>

      </QueryClientProvider>


      <Toaster />
    </>

  )
}

export default App
