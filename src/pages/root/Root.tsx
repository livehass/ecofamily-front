import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function Root() {
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  )
}
