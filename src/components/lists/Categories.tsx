import { Link, redirect, useLoaderData, useNavigation } from "react-router-dom";
import LoadingCategoryCardContainer from "../cards/category/LoadingCategoryCardContainer";
import CreateCategoryButton from "../cards/category/CreateCategoryButton";
import CategoryCard from "../cards/category/CategoryCard";
import Category from "../../model/Category";
import { find } from "../../service/Service";
import UserLogin from "../../model/UserLogin";

export async function loader() {
  const token =
    sessionStorage.getItem("userLogin") !== null
      ? (JSON.parse(sessionStorage.getItem("userLogin") as string) as UserLogin)
          .token
      : null;

  if (token === null) return redirect("/login");

  const categories = await find("/categorias");
  return { categories };
}
export default function Categories() {
  const { categories } = useLoaderData() as { categories: Category[] };
  const navigation = useNavigation();

  return (
    <>
      <div className="w-full py-20">
        <h2 className="text-2xl font-bold py-4 px-8 md:text-4xl md:mt-12">
          Visualizar categorias
        </h2>
        <div className="w-full px-4 flex flex-wrap items-center gap-2">
          {categories.map((category) => {
            return (
              <Link
                to={`/categorias/${category.id}`}
                key={category.id}
                className="bg-gray-300 py-1 px-3 rounded-md hover:bg-gray-400"
              >
                {category.descricao}
              </Link>
            );
          })}
        </div>
        <div className="p-4 grid grid-cols-[repeat(auto-fill,_minmax(250px,1fr))] auto-rows-[minmax(250px,_1fr)] gap-6">
          {navigation.state === "loading" ? (
            <LoadingCategoryCardContainer />
          ) : (
            <CreateCategoryButton />
          )}
        </div>
      </div>
    </>
  );
}
