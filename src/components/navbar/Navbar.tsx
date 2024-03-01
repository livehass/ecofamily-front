import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="w-full bg-lime-950 text-white flex justify-center py-4">
        <div className="container flex justify-between text-lg">
          <div className="text-2xl font-bold uppercase">ecoFamily</div>

          <div className="flex gap-4">
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
            </div>

            <div className="hover:underline">Sair</div>
            <div className="hover:underline">Carrinho (5)</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
