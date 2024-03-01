import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/UserContext";

function Navbar() {
  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  return (
    <>
      <div className="fixed w-full bg-white text-gray-800 flex justify-center py-4 drop-shadow-md z-50">
        <div className="container flex justify-between gap-64 text-lg items-center">
          <Link to="/" className="text-2xl font-bold text-green-800">
            <i className="fa-solid fa-leaf"></i> ecoFamily
          </Link>

          <div className="flex items-center bg-gray-50 border rounded-md h-9 px-1 flex-grow has-[:focus-visible]:bg-gray-200/80">
            <input
              id="Search"
              type="search"
              placeholder="Busque um produto"
              className="bg-transparent h-full flex-grow text-green-700 text-sm px-1 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <i className="fa-solid fa-magnifying-glass text-green-700"></i>
          </div>

          <div className="flex gap-4 items-center">
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isActive
                  ? "p-2 border-b-2 border-b-gray-200 rounded-md hover:bg-gray-200 transition-all"
                  : isPending
                  ? "bg-gray-200 animate-pulse"
                  : "p-2 hover:bg-gray-200 rounded-md"
              }
            >
              <div className="h-7">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100%"
                  height="100%"
                  viewBox="0 0 48 48"
                  fill="rgb(21 128 61)"
                >
                  <path d="M 23.951172 4 A 1.50015 1.50015 0 0 0 23.070312 4.3222656 L 8.8730469 15.521484 C 7.0935305 16.919676 6 19.100391 6 21.400391 L 6 40.5 C 6 41.133333 6.2367979 41.80711 6.7148438 42.285156 C 7.1928895 42.763202 7.8666667 43 8.5 43 L 18.5 43 C 19.133333 43 19.80711 42.763202 20.285156 42.285156 C 20.763202 41.80711 21 41.133333 21 40.5 L 21 30.5 C 21 30.218182 21.218182 30 21.5 30 L 26.5 30 C 26.781818 30 27 30.218182 27 30.5 L 27 40.5 C 27 41.133333 27.236798 41.80711 27.714844 42.285156 C 28.19289 42.763202 28.866667 43 29.5 43 L 39.5 43 C 40.133333 43 40.80711 42.763202 41.285156 42.285156 C 41.763202 41.80711 42 41.133333 42 40.5 L 42 21.400391 C 42 19.155946 41.012069 16.901298 39.087891 15.490234 L 24.929688 4.3222656 A 1.50015 1.50015 0 0 0 23.951172 4 z M 24 7.4101562 L 37.271484 17.876953 A 1.50015 1.50015 0 0 0 37.3125 17.910156 C 38.388318 18.699095 39 20.044835 39 21.400391 L 39 40 L 30 40 L 30 30.5 C 30 28.581818 28.418182 27 26.5 27 L 21.5 27 C 19.581818 27 18 28.581818 18 30.5 L 18 40 L 9 40 L 9 21.400391 C 9 20.100391 9.7060794 18.680715 10.726562 17.878906 A 1.50015 1.50015 0 0 0 10.728516 17.876953 L 24 7.4101562 z"></path>
                </svg>
              </div>
            </NavLink>
            <div className="cursor-pointer hover:bg-gray-200 rounded-md transition-all p-2">
              <div className="h-7">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="rgb(21 128 61)" viewBox="0 0 256 256"><path d="M96,216a16,16,0,1,1-16-16A16,16,0,0,1,96,216Zm88-16a16,16,0,1,0,16,16A16,16,0,0,0,184,200ZM231.65,74.35l-28.53,92.71A23.89,23.89,0,0,1,180.18,184H84.07A24.11,24.11,0,0,1,61,166.59L24.82,40H8A8,8,0,0,1,8,24H24.82A16.08,16.08,0,0,1,40.21,35.6L48.32,64H224a8,8,0,0,1,7.65,10.35ZM213.17,80H52.89l23.49,82.2a8,8,0,0,0,7.69,5.8h96.11a8,8,0,0,0,7.65-5.65Z"></path></svg>
              </div>
            </div>
            <div className="cursor-pointer hover:bg-gray-200 rounded-md transition-all p-2">
              <div className="h-7 px-1">
              <i className="fa-regular fa-user text-xl text-green-700"></i>
              </div>
            </div>
          </div>

          {/* <div className="flex gap-4">
            <div>
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  isActive
                    ? "underline"
                    : isPending
                    ? "animate-pulse"
                    : "hover:underline"
                }
              >
                Home
              </NavLink>
            </div>
            <div>
              <NavLink
                to="/produtos"
                className={({ isActive, isPending }) =>
                  isActive
                    ? "underline"
                    : isPending
                    ? "animate-pulse"
                    : "hover:underline"
                }
              >
                Produtos
              </NavLink>
            </div>
            <div>
              <NavLink
                to="/categorias"
                className={({ isActive, isPending }) =>
                  isActive
                    ? "underline"
                    : isPending
                    ? "animate-pulse"
                    : "hover:underline"
                }
              >
                Categorias
              </NavLink>
            </div>
            <div>
              <NavLink
                to="/sobre"
                className={({ isActive, isPending }) =>
                  isActive
                    ? "underline"
                    : isPending
                    ? "animate-pulse"
                    : "hover:underline"
                }
              >
                Sobre Nós
              </NavLink>
            </div>
            <div>
              {token === "" ? (
                <NavLink
                  to="/login"
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "underline"
                      : isPending
                      ? "animate-pulse"
                      : "hover:underline"
                  }
                >
                  Entrar
                </NavLink>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "underline"
                      : isPending
                      ? "animate-pulse"
                      : "hover:underline"
                  }
                  onClick={handleLogout}
                >
                  Sair
                </NavLink>
              )}
            </div>

            <div className="hover:underline">Carrinho (5)</div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Navbar;
