import { redirect, useLoaderData, useNavigation } from "react-router-dom";
import { find } from "../../service/Service";
import { useState } from "react";
import ProductCard from "../../components/cards/product/ProductCard";
import LoadingCategoryCardContainer from "../../components/cards/category/LoadingCategoryCardContainer";
import User from "../../model/User";
import Category from "../../model/Category";

export async function lojaLoader({ params }) {
  if (
    JSON.parse(sessionStorage.getItem("userLogin") as string).tipo === 0 &&
    JSON.parse(sessionStorage.getItem("userLogin") as string).id != params.id
  )
    return redirect("/");

  const user = await find(`usuarios/${params.id}`);
  const categories = await find("/categorias");

  return { user, categories };
}
export default function Products() {
  const { user, categories } = useLoaderData() as {
    user: User;
    categories: Category[];
  };
  const products = user.produtos;

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [categoryClicked, setCategoryClicked] = useState(0);

  const navigation = useNavigation();

  return (
    <>
      <div className="w-full min-h-screen py-20">
        <h2 className="text-2xl font-bold py-4 px-8 md:text-4xl md:mt-12 flex items-center gap-4 mb-4">
          <img
            className="object-cover size-20 p-1 rounded-full ring-2 ring-emerald-300"
            src={
              user.foto == ""
                ? "https://cdlresende.com.br/wp-content/uploads/2018/03/no-image-icon-4.png"
                : user.foto
            }
            alt="Bordered avatar"
          />
          {user.nome}
        </h2>
        <div className="w-full px-4 flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              setFilteredProducts(products);
              setCategoryClicked(0);
            }}
            className={`${
              filteredProducts == products ? "bg-gray-400" : "hover:bg-gray-400"
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
                    products.filter(
                      (product) => product.categoria.id === category.id
                    )
                  );
                  setCategoryClicked(category.id);
                }}
              >
                {category.descricao}
              </button>
            );
          })}
        </div>
        <div className="p-4 grid grid-cols-[repeat(auto-fill,_minmax(250px,1fr))] auto-rows-[minmax(250px,_1fr)] gap-6">
          {navigation.state === "loading" ? (
            <LoadingCategoryCardContainer />
          ) : filteredProducts.length === 0 ? (
            <>
              <h2 className="mt-4 text-2xl font-bold col-span-2">
                Nenhum produto por enquanto...
              </h2>
            </>
          ) : (
            <>
              {filteredProducts.map((product) => {
                if (product.foto === null) product.foto = "";
                return <ProductCard key={product.id} product={product} />;
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}
