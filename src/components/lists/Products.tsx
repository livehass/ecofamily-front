import { useLoaderData, useNavigation } from "react-router-dom";
import LoadingCategoryCardContainer from "../cards/category/LoadingCategoryCardContainer";
import Product from "../../model/Product";
import Category from "../../model/Category";
import { findProducts } from "../../service/Service";
import { useState } from "react";
import PaginatedItems from "../pagination/PaginatedItems";
import { sortBy } from "sort-by-typescript";

export async function loader() {
  const { products, categories } = await findProducts();
  return { products, categories };
}
export default function Products() {
  const { products, categories } = useLoaderData() as {
    products: Product[];
    categories: Category[];
  };

  const [filteredProducts, setFilteredProducts] = useState(
    products
      .filter((product) => product.usuario.tipo !== 1)
      .sort(sortBy("nome"))
  );
  const [categoryClicked, setCategoryClicked] = useState(0);

  const navigation = useNavigation();

  return (
    <>
      <div className="w-full min-h-screen py-20 bg-gray-50">
        <h2 className="text-2xl font-bold py-4 px-8 md:text-4xl md:mt-12">
          Explorar produtos
        </h2>
        <div className="w-full px-4 flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              setFilteredProducts(
                products
                  .filter((product) => product.usuario.tipo !== 1)
                  .sort(sortBy("nome"))
              );
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
                      .filter(
                        (product) =>
                          product.categoria.id === category.id &&
                          product.usuario.tipo != 1
                      )
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
