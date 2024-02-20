import './App.css';
import Home from './assets/pages/home/Home';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import AboutUs from './assets/pages/home/About';
import Contato from './assets/pages/Contato';

function App() {
  return (
    <>
    <Navbar/>
    <Home/>
    <AboutUs/>
    <Contato/>
    <Footer/>
    
    </>
);
}
export default App;