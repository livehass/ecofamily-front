import { Link, redirect, useLoaderData, useNavigation } from "react-router-dom";
import { find } from "../../service/Service";
import { useContext, useState } from "react";
import LoadingCategoryCardContainer from "../../components/cards/category/LoadingCategoryCardContainer";
import User from "../../model/User";
import Category from "../../model/Category";
import PaginatedItems from "../../components/pagination/PaginatedItems";
import { AuthContext } from "../../context/UserContext";
import { sortBy } from "sort-by-typescript";

export async function lojaLoader({ params }) {
  if (
    (sessionStorage.getItem("userLogin") !== null &&
      JSON.parse(sessionStorage.getItem("userLogin") as string).tipo === 0 &&
      JSON.parse(sessionStorage.getItem("userLogin") as string).id !=
        params.id) ||
    (sessionStorage.getItem("userLogin") !== null &&
      JSON.parse(sessionStorage.getItem("userLogin") as string).tipo === 1 &&
      JSON.parse(sessionStorage.getItem("userLogin") as string).id == params.id)
  )
    return redirect("/");

  const storeUser = await find(`usuarios/${params.id}`);
  const categories = await find("/categorias");

  return { storeUser, categories };
}
export default function Products() {
  const { user } = useContext(AuthContext);

  const { storeUser, categories } = useLoaderData() as {
    storeUser: User;
    categories: Category[];
  };
  const products = storeUser.produtos.sort(sortBy("nome"));

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [categoryClicked, setCategoryClicked] = useState(0);

  const navigation = useNavigation();

  return (
    <>
      <div className="w-full min-h-screen py-20 bg-gray-50">
        <h2 className="text-2xl font-bold py-4 px-8 md:text-4xl md:mt-12 flex items-center gap-4 mb-4">
          <img
            className="object-cover size-20 p-1 rounded-full ring-2 ring-emerald-300"
            src={
              storeUser.foto == ""
                ? "https://cdlresende.com.br/wp-content/uploads/2018/03/no-image-icon-4.png"
                : storeUser.foto
            }
            alt="Bordered avatar"
          />
          {storeUser.nome}{" "}
          {user.id === storeUser.id && (
            <Link
              to="/novo-produto"
              className="text-sm font-bold rounded-md bg-green-600 py-2 px-2 text-blue-50 hover:bg-green-700"
            >
              Novo produto
            </Link>
          )}
        </h2>
        <div className="w-full px-4 flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              setFilteredProducts(products.sort(sortBy("nome")));
              setCategoryClicked(0);
            }}
            className={`${
              categoryClicked === 0 ? "bg-gray-400" : "hover:bg-gray-400"
            } bg-gray-300 py-1 px-3 rounded-md `}
          >
            Tudo
          </button>
          {categories.map((category) => {
            return (
              <button
                key={category.id}
                className={`${
                  categoryClicked == category.id
                    ? "bg-gray-400"
                    : "hover:bg-gray-400"
                } bg-gray-300 py-1 px-3 rounded-md `}
                onClick={() => {
                  setFilteredProducts(
                    products
                      .filter((product) => product.categoria.id === category.id)
                      .sort(sortBy("nome"))
                  );
                  setCategoryClicked(category.id);
                }}
              >
                {category.descricao}
              </button>
            );
          })}
        </div>
        <div className="w-full">
          {navigation.state === "loading" ? (
            <LoadingCategoryCardContainer />
          ) : filteredProducts.length === 0 ? (
            <>
              <h2 className="mt-36 text-center text-2xl font-bold col-span-2">
                Nenhum produto por enquanto...
              </h2>
            </>
          ) : (
            <PaginatedItems items={filteredProducts} itemsPerPage={18} />
          )}
        </div>
      </div>
    </>
  );
}
