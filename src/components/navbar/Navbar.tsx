import { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { AuthContext } from "../../context/UserContext";
import useOutsideClick from "../../hooks/useClickOutside";
import FavoriteProducts from "../lists/FavoriteProducts";

function Navbar() {
  const { user, handleLogout, favProducts } = useContext(AuthContext);
  const token = user.token;

  const [userDropdown, setUserDropdown] = useState(false);
  const [favDropdown, setFavDropdown] = useState(false);
  const [cartDropdown, setCartDropdown] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useOutsideClick(handleClickOutside);

  const location = useLocation();

  function handleClickOutside() {
    setUserDropdown(false);
    setFavDropdown(false);
    setCartDropdown(false);
  }

  return (
    <>
      <div
        onClick={(event) => event.stopPropagation()}
        className="fixed w-full bg-white text-gray-800 flex justify-center py-4 drop-shadow-md z-50"
      >
        <div className="container flex justify-between gap-64 text-lg items-center">
          {location.pathname != "/" ? (
            <Link to="/" className="text-2xl font-bold text-green-800">
              <i className="fa-solid fa-leaf"></i> ecoFamily
            </Link>
          ) : (
            <ScrollLink
              to="home"
              smooth={true}
              duration={500}
              className="cursor-pointer text-2xl font-bold text-green-800"
            >
              <i className="fa-solid fa-leaf"></i> ecoFamily
            </ScrollLink>
          )}

          <div className="flex items-center bg-gray-50 border rounded-md h-9 px-1 flex-grow has-[:focus-visible]:bg-gray-200/80">
            <input
              id="Search"
              type="search"
              placeholder="Busque um produto"
              className="bg-transparent h-full flex-grow text-green-700 text-sm px-1 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => {
                if (e.target.value.length == 1)
                  document.getElementById("btn-explorar")?.click();
              }}
            />
            <i className="fa-solid fa-magnifying-glass text-green-700"></i>
          </div>

          <ul className="flex gap-4 items-center">
            <li
              onClick={() => {
                setFavDropdown(true);
              }}
              id="favDropdown"
              className="cursor-pointer hover:bg-gray-200 rounded-md transition-all p-2"
            >
              <div className="hover:bg-gray-200 rounded-md transition-all p-2">
                <div className="h-7">
                  <svg
                    id="fav-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    fill="rgb(21 128 61)"
                    viewBox="0 0 256 256"
                  >
                    <path d="M223,57a58.07,58.07,0,0,0-81.92-.1L128,69.05,114.91,56.86A58,58,0,0,0,33,139l89.35,90.66a8,8,0,0,0,11.4,0L223,139a58,58,0,0,0,0-82Zm-11.35,70.76L128,212.6,44.3,127.68a42,42,0,0,1,59.4-59.4l.2.2,18.65,17.35a8,8,0,0,0,10.9,0L152.1,68.48l.2-.2a42,42,0,1,1,59.36,59.44Z"></path>
                  </svg>
                </div>
              </div>
              <div
                className={`z-10 ${
                  favDropdown ? "" : "hidden"
                } bg-white divide-y divide-gray-100 rounded-b-md shadow w-full md:w-72 md:absolute md:top-[4.6rem] md:right-[14.5rem]`}
              >
                <svg
                  className="hidden md:block absolute text-white h-4 right-32 -top-4 rotate-180 drop-shadow-2xl"
                  x="0px"
                  y="0px"
                  viewBox="0 0 255 255"
                  xmlSpace="preserve"
                >
                  <polygon
                    className="fill-gray-300"
                    points="0,0 127.5,127.5 255,0"
                  />
                </svg>
                <ul
                  ref={ref}
                  className="py-2 text-sm text-gray-700"
                  aria-labelledby="dropdownDividerButton"
                >
                  <li>
                    <div className="block text-center px-4 py-2">Favoritos</div>
                  </li>
                  <li>
                    <FavoriteProducts isExpanded={isExpanded} />
                  </li>
                </ul>
                {favProducts.length > 1 && (
                  <button
                    onClick={() =>
                      isExpanded ? setIsExpanded(false) : setIsExpanded(true)
                    }
                    className="bg-green-600 text-white font-bold drop-shadow-lg w-full rounded-b-md hover:bg-green-700"
                  >
                    {isExpanded ? "Recolher" : "Expandir"}
                  </button>
                )}
              </div>
            </li>
            <li
              onClick={() => {
                setCartDropdown(true);
              }}
              id="cartDropdown"
              className="cursor-pointer hover:bg-gray-200 rounded-md transition-all p-2"
            >
              <div className="hover:bg-gray-200 rounded-md transition-all p-2">
                <div className="h-7">
                  <svg
                    id="cart-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    fill="rgb(21 128 61)"
                    viewBox="0 0 256 256"
                  >
                    <path d="M96,216a16,16,0,1,1-16-16A16,16,0,0,1,96,216Zm88-16a16,16,0,1,0,16,16A16,16,0,0,0,184,200ZM231.65,74.35l-28.53,92.71A23.89,23.89,0,0,1,180.18,184H84.07A24.11,24.11,0,0,1,61,166.59L24.82,40H8A8,8,0,0,1,8,24H24.82A16.08,16.08,0,0,1,40.21,35.6L48.32,64H224a8,8,0,0,1,7.65,10.35ZM213.17,80H52.89l23.49,82.2a8,8,0,0,0,7.69,5.8h96.11a8,8,0,0,0,7.65-5.65Z"></path>
                  </svg>
                </div>
              </div>
              <div
                className={`z-10 ${
                  cartDropdown ? "" : "hidden"
                } bg-white divide-y divide-gray-100 rounded-b-md shadow w-full md:w-60 md:absolute md:top-[4.6rem] md:right-[10.2rem]`}
              >
                <svg
                  className="hidden md:block absolute text-white h-4 right-[7.3rem] -top-4 rotate-180 drop-shadow-2xl"
                  x="0px"
                  y="0px"
                  viewBox="0 0 255 255"
                  xmlSpace="preserve"
                >
                  <polygon
                    className="fill-gray-300"
                    points="0,0 127.5,127.5 255,0"
                  />
                </svg>
                <ul
                  ref={ref}
                  className="py-2 text-sm text-gray-700"
                  aria-labelledby="dropdownDividerButton"
                >
                  <li>
                    <div className="block text-center px-4 py-2">Carrinho</div>
                  </li>
                </ul>
              </div>
            </li>
            <li
              onClick={() => {
                setUserDropdown(true);
              }}
              id="userDropdown"
              className="cursor-pointer hover:bg-gray-200 rounded-md transition-all p-2"
            >
              <div className="hover:bg-gray-200 rounded-md transition-all p-2">
                <div className="h-7">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    fill="rgb(21 128 61)"
                    viewBox="0 0 256 256"
                  >
                    <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                  </svg>
                </div>
              </div>
              {token !== "" ? (
                <div
                  id="dropdownDivider"
                  className={`z-10 ${
                    userDropdown ? "" : "hidden"
                  } bg-white divide-y divide-gray-100 rounded-b-md shadow w-full md:w-60 md:absolute md:top-[4.6rem] md:right-[5.5rem]`}
                >
                  <svg
                    className="hidden md:block absolute text-white h-4 right-[7.3rem] -top-4 rotate-180 drop-shadow-2xl"
                    x="0px"
                    y="0px"
                    viewBox="0 0 255 255"
                    xmlSpace="preserve"
                  >
                    <polygon
                      className="fill-gray-300"
                      points="0,0 127.5,127.5 255,0"
                    />
                  </svg>
                  <ul
                    ref={ref}
                    className="py-2 text-sm text-gray-700"
                    aria-labelledby="dropdownDividerButton"
                  >
                    <li>
                      <NavLink
                        to={`users/${user.id}`}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {user.tipo === 1
                          ? "Histórico de compras"
                          : "Minha loja"}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/settings"}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Configurações
                      </NavLink>
                    </li>
                  </ul>
                  <div className="py-2">
                    <button
                      className="w-full text-left block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                      onClick={handleLogout}
                    >
                      Sair
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  id="dropdownDivider"
                  className={`z-10 ${
                    userDropdown ? "" : "hidden"
                  } bg-white divide-y divide-gray-100 rounded-b-md shadow w-full md:w-60 md:absolute md:top-[4.6rem] md:right-[5.5rem]`}
                >
                  <svg
                    className="hidden md:block absolute text-white h-4 right-[7.3rem] -top-4 rotate-180 drop-shadow-2xl"
                    x="0px"
                    y="0px"
                    viewBox="0 0 255 255"
                    xmlSpace="preserve"
                  >
                    <polygon
                      className="fill-gray-300"
                      points="0,0 127.5,127.5 255,0"
                    />
                  </svg>
                  <ul
                    ref={ref}
                    className="py-2 text-sm text-gray-700"
                    aria-labelledby="dropdownDividerButton"
                  >
                    <li>
                      <NavLink
                        to={`/login`}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Entrar
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/cadastrar"}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Criar conta
                      </NavLink>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>

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
