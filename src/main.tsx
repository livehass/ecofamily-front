import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/root/Root.tsx";
import Home from "./pages/home/Home.tsx";
import Login from "./pages/login/Login.tsx";
import Register, { createNewUser } from "./pages/register/Register.tsx";
import AuthProvider from "./components/authProvider/AuthProvider.tsx";
import Categories from "./components/lists/Categories.tsx";
import { loader as categoryLoader } from "./components/lists/Categories.tsx";
import { action as categoryAction } from "./components/forms/CategoryForm.tsx";
import { loader as productLoader } from "./components/lists/Products.tsx";
import { action as productAction } from "./components/forms/ProductForm.tsx";
import {
  singleProductAction,
  loader as singleProductLoader,
} from "./components/lists/ProductContainer.tsx";
import {
  singleCategoryAction,
  loader as singularCategoryLoader,
} from "./components/lists/CategoryContainer.tsx";

import ProductContainer from "./components/lists/ProductContainer.tsx";
import CategoryContainer from "./components/lists/CategoryContainer.tsx";
import categoryDelete from "./components/delete/CategoryDelete.tsx";
import productDelete from "./components/delete/ProductDelete.tsx";
import Comprar from "./pages/comprar/Comprar.tsx";
import Settings from "./pages/settings/Settings.tsx";
import TransactionHistory, {
  transactionLoader,
} from "./pages/history/TransactionHistory.tsx";
import NovoProduto, {
  novoProdutoLoader,
} from "./pages/novoProduto/NovoProduto.tsx";
import Loja, { lojaLoader } from "./pages/loja/Loja.tsx";
import AboutUs from "./pages/about/About.tsx";
import NotFound from "./components/pageNotFound/PageNotFound.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home />, loader: productLoader },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/cadastrar",
        element: <Register />,
        action: createNewUser,
      },
      {
        path: "/categorias/:id",
        element: <CategoryContainer />,
        loader: singularCategoryLoader,
        action: singleCategoryAction,
      },
      {
        path: "/categorias",
        element: <Categories />,
        loader: categoryLoader,
        action: categoryAction,
      },
      {
        path: "categorias/:id/delete",
        action: categoryDelete,
      },
      {
        path: "/produtos/:id",
        element: <ProductContainer />,
        loader: singleProductLoader,
        action: singleProductAction,
      },
      {
        path: "produtos/:id/delete",
        action: productDelete,
      },
      {
        path: "/comprar",
        element: <Comprar />,
      },
      {
        path: "/conta",
        element: <Settings />,
      },
      {
        path: "/historico-compras",
        element: <TransactionHistory />,
        loader: transactionLoader,
      },
      {
        path: "/novo-produto",
        element: <NovoProduto />,
        loader: novoProdutoLoader,
        action: productAction,
      },
      {
        path: "/lojas/:id",
        element: <Loja />,
        loader: lojaLoader,
      },
      {
        path: "/about",
        element: <AboutUs />,
        
      },
      {
        path: "*",
        element: <NotFound />,
        
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
