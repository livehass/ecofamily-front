import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/root/Root.tsx";
import Home from "./pages/home/Home.tsx";
import Contact from "./pages/contact/Contact.tsx";
import AboutUs from "./pages/about/About.tsx";
import Login from "./pages/login/Login.tsx";
import Register, { createNewUser } from "./pages/register/Register.tsx";
import AuthProvider from "./components/authProvider/AuthProvider.tsx";
import Categories from "./components/lists/Categories.tsx";
import Products from "./components/lists/Products.tsx";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home />, loader: productLoader },
      {
        path: "/contato",
        element: <Contact />,
      },
      {
        path: "/sobre",
        element: <AboutUs />,
      },
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
        path: "/categorias",
        element: <Categories />,
        loader: categoryLoader,
        action: categoryAction,
      },
      {
        path: "/categorias/:id",
        element: <CategoryContainer />,
        loader: singularCategoryLoader,
        action: singleCategoryAction,
      },
      {
        path: "categorias/:id/delete",
        action: categoryDelete,
      },
      {
        path: "/produtos",
        element: <Products />,
        action: productAction,
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
