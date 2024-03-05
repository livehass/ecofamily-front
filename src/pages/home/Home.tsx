import { useContext, useEffect } from "react";
import Products from "../../components/lists/Products";
import { Link, Element } from "react-scroll";
import { AuthContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.tipo === 0) navigate(`/lojas/${user.id}`);
  }, [user]);

  return (
    <>
      <Element name="home">
        <div id="hero" className="md:pt-28 flex justify-center min-h-screen">
          <div className="container grid grid-cols-1 text-white bg-white/40 backdrop-blur-lg md:backdrop-blur-0 md:bg-transparent">
            <div className="flex flex-col gap-4 items-center justify-center py-4">
              <h2 className="md:text-7xl text-4xl font-bold text-gray-900 mt-56">
                Seja bem vindo!
              </h2>
              <p className="md:text-2xl text-gray-900">
                Compre de Pequenos Produtores
              </p>

              <div className="flex justify-around gap-4">
                <Link
                  id="btn-explorar"
                  smooth={true}
                  duration={500}
                  to="products"
                  className="cursor-pointer align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                >
                  Explorar
                </Link>
              </div>
            </div>

            <div className="flex justify-center ">
              <img src="" alt="" className="w-2/3" />
            </div>
          </div>
        </div>
      </Element>
      <Element name="products">
        <Products />
      </Element>
    </>
  );
}

export default Home;
