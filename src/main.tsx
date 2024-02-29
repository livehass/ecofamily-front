import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/root/Root.tsx";
import Home from "./pages/home/Home.tsx";
import Contact from "./pages/contact/Contact.tsx";
import AboutUs from "./pages/about/About.tsx";
import Login from "./pages/login/Login.tsx";
import Register from "./pages/register/Register.tsx";
import AuthProvider from "./components/authProvider/AuthProvider.tsx";
import Categories from "./components/lists/Categories.tsx";
import Products from "./components/lists/Products.tsx";
import { loader as categoryLoader } from "./components/lists/Categories.tsx";
import { action as categoryAction } from "./components/forms/CategoryForm.tsx";
import { loader as productLoader } from "./components/lists/Products.tsx";
import { action as productAction } from "./components/forms/ProductForm.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
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
      },
      {
        path: "/categorias",
        element: <Categories />,
        loader: categoryLoader,
        action: categoryAction,
      },
      {
        path: "/produtos",
        element: <Products />,
        loader: productLoader,
        action: productAction,
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
