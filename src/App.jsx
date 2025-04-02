import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import IndexPage from "./pages/indexPage";
import TestPage from "./pages/testPage";
import LoginPage from "./pages/LoginPage";
import BrandPage from "./pages/BrandPage";
import MarkerPage from "./pages/MarkerPage";
import ProductPage from "./pages/ProductPage";
import AccesPage from "./pages/AccsesPage";
import { CartProvider } from "./components/data/CartContext";
import { ProductsProvider } from "./components/contexts/ProductsContext";
import Bucket from "./pages/Bucket";
import NewProductPage from "./pages/NewProductPage";
import SalePage from "./pages/SalePage";
import Order from "./pages/Order";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage></IndexPage>,
  },
  {
    path: "/test",
    element: <TestPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/Brand",
    element: <BrandPage />,
  },
  {
    path: "/Marker",
    element: <MarkerPage />,
  },
  {
    path: "/product",
    element: <ProductPage />,
  },
  {
    path: "/accessories",
    element: <AccesPage />,
  },
  {
    path: "/bucket",
    element: <Bucket />,
  },
  {
    path: "/NewProduct",
    element: <NewProductPage />,
  },
  {
    path: "/SalePage",
    element: <SalePage />,
  },
  {
    path: "/Order",
    element: <Order />,
  },
]);

function App() {
  return (
    <ProductsProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </ProductsProvider>
  );
}

export default App;
