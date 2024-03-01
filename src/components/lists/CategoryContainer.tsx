import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom";
import LoadingCategoryCardContainer from "../cards/category/LoadingCategoryCardContainer";
import Product from "../../model/Product";
import Category from "../../model/Category";
import { find, update } from "../../service/Service";
import ProductCard from "../cards/product/ProductCard";
import CreateProductButton from "../cards/product/CreateProductButton";

export async function loader({ params }) {
  const category = await find(`/categorias/${params.id}`);
  return { category };
}

export async function singleCategoryAction({ request, params }) {
  //const category = (await find(`/categorias/${params.id}`)) as Category;
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const newCategory = {
    ...data,
  } as Category;
  newCategory.id = params.id;
  console.log(data.usuario);
  await update("/categorias", newCategory);
  return redirect("/categorias");
}

export default function CategoryContainer() {
  const { category } = useLoaderData() as {
    category: Category;
  };
  const navigation = useNavigation();

  return (
    <>
      <div className="w-full py-20">
        <h2 className="text-2xl font-bold py-4 px-8 md:text-4xl md:mt-12">
          Visualizar produtos
        </h2>
        <div className="flex items-center justify-center">
          <Form
            className="w-full flex flex-col items-center justify-center"
            method="put"
          >
            <input
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 hover:drop-shadow-md transition-all focus-visible:outline-0 focus-visible:border-blue-500 peer"
              placeholder="Descrição"
              type="text"
              name="descricao"
              id="descricao"
              defaultValue={category.descricao}
              required
            />
            <button
              type="submit"
              className="mt-6 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Salvar
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
