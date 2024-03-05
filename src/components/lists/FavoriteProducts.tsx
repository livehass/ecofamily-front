import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/UserContext";

export default function FavoriteProducts({
  isExpanded,
}: {
  isExpanded: boolean;
}) {
  const { favProducts, setFavProducts } = useContext(AuthContext);

  return (
    <div
      className={`pt-4 border-t ${
        !isExpanded && "max-h-28"
      } relative transition-all ${
        favProducts.length > 1 && "overflow-y-scroll"
      }`}
    >
      <ul role="list" className="-my-6 divide-y divide-gray-200">
        {favProducts.length > 0 ? (
          favProducts.map((product) => (
            <li key={product.id} className="flex py-6 px-4">
              <Link
                to={`/produtos/${product.id}`}
                className="size-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
              >
                <img
                  src={
                    product.foto == ""
                      ? "https://cdlresende.com.br/wp-content/uploads/2018/03/no-image-icon-4.png"
                      : product.foto
                  }
                  alt="Product image"
                  className="h-full w-full object-cover object-center"
                />
              </Link>

              <div className="ml-4 pt-2 flex flex-1 flex-col">
                <div>
                  <div className="text-s font-bold text-gray-900">
                    <h3>
                      <Link to={`/produtos/${product.id}`}>{product.nome}</Link>
                    </h3>
                  </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <div className="w-full flex justify-between">
                    <p>R${product.preco}</p>
                    <button
                      type="button"
                      onClick={() => {
                        const newProducts = favProducts.filter(
                          (currentProduct) => currentProduct !== product
                        );
                        setFavProducts(newProducts);
                        localStorage.setItem(
                          "favProducts",
                          JSON.stringify(newProducts)
                        );
                      }}
                      className="font-medium text-xs text-green-600 hover:text-green-500"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <div className="py-6 px-4 text-center">Nenhum produto adicionado</div>
        )}
      </ul>
    </div>
  );
}
