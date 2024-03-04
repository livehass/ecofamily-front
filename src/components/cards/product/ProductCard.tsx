import { Link } from "react-router-dom";
import Category from "../../../model/Category";
import Product from "../../../model/Product";
import { useContext } from "react";
import { AuthContext } from "../../../context/UserContext";
import { sortBy } from "sort-by-typescript";

export default function ProductCard({
  product,
}: {
  category: Category;
  product: Product;
}) {
  const { favProducts, setFavProducts, cartProducts, setCartProducts } =
    useContext(AuthContext);
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
      <Link to={`/produtos/${product.id}`}>
        <img
          id="product-image"
          className="w-full object-cover drop-shadow-md rounded-md mb-4"
          src={
            product.foto == ""
              ? "https://cdlresende.com.br/wp-content/uploads/2018/03/no-image-icon-4.png"
              : product.foto
          }
          alt="product image"
        />
      </Link>
      <div className="px-5 pb-5">
        <Link to={`/produtos/${product.id}`}>
          <h5 className="text-2xl font-semibold tracking-tight text-gray-900">
            {product.nome}
          </h5>
        </Link>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            R${product.preco}
          </span>
          <div className="flex items-center border rounded-md divide-x-2">
            <button
              onClick={() => {
                if (
                  favProducts.filter(
                    (favProduct) => favProduct.id === product.id
                  ).length === 0
                ) {
                  document
                    .getElementById("fav-icon")
                    ?.classList.add("animate-custom-ping");
                  setTimeout(
                    () =>
                      document
                        .getElementById("fav-icon")
                        ?.classList.remove("animate-custom-ping"),
                    600
                  );
                  setFavProducts([...favProducts, product]);
                  localStorage.setItem(
                    "favProducts",
                    JSON.stringify([...favProducts, product])
                  );
                }
              }}
              className="hover:bg-gray-200 rounded-s-md transition-all p-2"
            >
              <div className="h-7">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="rgb(21 128 61)"
                  viewBox="0 0 256 256"
                >
                  <path d="M223,57a58.07,58.07,0,0,0-81.92-.1L128,69.05,114.91,56.86A58,58,0,0,0,33,139l89.35,90.66a8,8,0,0,0,11.4,0L223,139a58,58,0,0,0,0-82Zm-11.35,70.76L128,212.6,44.3,127.68a42,42,0,0,1,59.4-59.4l.2.2,18.65,17.35a8,8,0,0,0,10.9,0L152.1,68.48l.2-.2a42,42,0,1,1,59.36,59.44Z"></path>
                </svg>
              </div>
            </button>
            <button
              onClick={() => {
                if (
                  cartProducts.filter(
                    (cartProduct) => cartProduct.id === product.id
                  ).length === 0
                ) {
                  document
                    .getElementById("cart-icon")
                    ?.classList.add("animate-custom-ping");
                  setTimeout(
                    () =>
                      document
                        .getElementById("cart-icon")
                        ?.classList.remove("animate-custom-ping"),
                    600
                  );
                  const cartProduct = product;
                  cartProduct.quantidade = 1;
                  const newCartProducts = [...cartProducts, cartProduct].sort(
                    sortBy("nome")
                  );
                  setCartProducts(newCartProducts);
                  localStorage.setItem(
                    "cartProducts",
                    JSON.stringify(newCartProducts)
                  );
                }
              }}
              className="cursor-pointer hover:bg-gray-200 rounded-e-md transition-all p-2"
            >
              <div className="h-7">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="rgb(21 128 61)"
                  viewBox="0 0 256 256"
                >
                  <path d="M96,216a16,16,0,1,1-16-16A16,16,0,0,1,96,216Zm88-16a16,16,0,1,0,16,16A16,16,0,0,0,184,200ZM231.65,74.35l-28.53,92.71A23.89,23.89,0,0,1,180.18,184H84.07A24.11,24.11,0,0,1,61,166.59L24.82,40H8A8,8,0,0,1,8,24H24.82A16.08,16.08,0,0,1,40.21,35.6L48.32,64H224a8,8,0,0,1,7.65,10.35ZM213.17,80H52.89l23.49,82.2a8,8,0,0,0,7.69,5.8h96.11a8,8,0,0,0,7.65-5.65Z"></path>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
