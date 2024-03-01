import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";

function Footer() {
  const data = new Date().getFullYear();

  return (
    <>
      <div className="flex justify-center bg-lime-950 text-white bg">
        <div className="container flex flex-col items-center py-4">
          <p className="text-xl font-bold">ecoFamily | Copyright: {data}</p>
          <div className="hover:underline">
            <NavLink
              to="/contato"
              className={({ isActive, isPending }) =>
                isActive
                  ? "underline"
                  : isPending
                  ? "animate-pulse"
                  : "hover:underline"
              }
            >
              Entre em contato conosco
            </NavLink>
          </div>
          <p className="text-lg">Acesse nossas redes sociais</p>
          <div className="flex gap-2">
            <LinkedinLogo size={48} weight="bold" />
            <InstagramLogo size={48} weight="bold" />
            <FacebookLogo size={48} weight="bold" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
