import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './pages/root/Root.tsx'
import Home from './pages/home/Home.tsx'
import Contact from './pages/contact/Contact.tsx'
import AboutUs from './pages/about/About.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {index: true, element: <Home /> },
      {
        path: "/contato",
        element: <Contact />
      },
      {
        path: "/sobre",
        element: <AboutUs />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
