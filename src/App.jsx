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
import { NotificationProvider } from "./components/contexts/NotificationContext";
import Bucket from "./pages/Bucket";
import NewProductPage from "./pages/NewProductPage";
import SalePage from "./pages/SalePage";
import Order from "./pages/Order";
import BrandCardPage from "./pages/BrandCardPage";
import NewsPage from './pages/NewsPage.jsx';
import NewsDetailPage from './pages/NewsDetailPage.jsx';
import ProfilePage from './pages/ProfilePage';

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
    path: "/product/:id",
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
  {
    path: "/BrandCardPage/:brandId",
    element: <BrandCardPage />,
  },
  {
    path: "/news",
    element: <NewsPage />,
  },
  {
    path: "/news/:id",
    element: <NewsDetailPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
]);

function App() {
  return (
    <ProductsProvider>
      <CartProvider>
        <NotificationProvider>
          <RouterProvider router={router} />
        </NotificationProvider>
      </CartProvider>
    </ProductsProvider>
  );
}

export default App;
