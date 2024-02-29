import { useLoaderData, useNavigation } from "react-router-dom";
import LoadingCategoryCardContainer from "../cards/LoadingCategoryCardContainer";
import CreateCategoryButton from "../cards/CreateCategoryButton";
import CategoryCard from "../cards/CategoryCard";
import Category from "../../model/Category";
import { find } from "../../service/Service";

export async function loader() {
  const categories = await find("/categorias");
  console.log(categories);
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
        <div className="p-4 grid grid-cols-[repeat(auto-fill,_minmax(250px,1fr))] auto-rows-[minmax(250px,_1fr)] gap-6">
          {navigation.state === "loading" ? (
            <LoadingCategoryCardContainer />
          ) : categories.length === 0 ? (
            <>
              <CreateCategoryButton />
            </>
          ) : (
            <>
              <CreateCategoryButton />

              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
