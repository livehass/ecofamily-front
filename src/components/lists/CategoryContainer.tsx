import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom";
import Category from "../../model/Category";
import { findCategory, update } from "../../service/Service";
import UserLogin from "../../model/UserLogin";

export async function loader({ params }) {
  const token =
    sessionStorage.getItem("userLogin") !== null
      ? (JSON.parse(sessionStorage.getItem("userLogin") as string) as UserLogin)
          .token
      : null;

  if (token === null) return redirect("/login");

  const category = await findCategory(`/categorias/${params.id}`, {
    headers: {
      Authorization: token,
    },
  });

  return { category };
}

export async function singleCategoryAction({ request, params }) {
  const token =
    sessionStorage.getItem("userLogin") !== null
      ? (JSON.parse(sessionStorage.getItem("userLogin") as string) as UserLogin)
          .token
      : null;

  if (token === null) return redirect("/login");
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const newCategory = {
    ...data,
  };
  newCategory.id = params.id;
  newCategory.perecivel === "on"
    ? (newCategory.perecivel = true)
    : (newCategory.perecivel = false);
  console.log(data.usuario);
  await update("/categorias", newCategory as Category);
  return redirect("/categorias");
}

export default function CategoryContainer() {
  const { category } = useLoaderData() as {
    category: Category;
  };
  const navigation = useNavigation();

  return (
    <>
      <div className="w-full flex flex-col items-center min-h-screen bg-gray-100 py-20">
        <h2 className="text-2xl font-bold py-4 px-8 md:text-4xl md:mt-12">
          Atualizar categoria
        </h2>
        <div className="flex flex-col items-center justify-center bg-white rounded-md px-8 py-4 drop-shadow-md md:min-w-1/2">
          <Form
            className="w-full flex flex-col items-center justify-center"
            method="put"
          >
            <div className="flex items-start flex-col gap-4">
              <div className="flex gap-4 items-center">
                <label htmlFor="descricao">Descrição</label>
                <input
                  className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 hover:drop-shadow-md transition-all focus-visible:outline-0 focus-visible:border-blue-500 peer"
                  placeholder="Descrição"
                  type="text"
                  name="descricao"
                  id="descricao"
                  defaultValue={category.descricao}
                  required
                />
              </div>
              <div className="flex gap-4">
                <label htmlFor="perecivel">Perecível</label>
                <input type="checkbox" id="perecivel" name="perecivel" />
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Salvar
            </button>
          </Form>
          <Form action="delete" method="delete">
            <button
              type="submit"
              className="mt-6 text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Deletar
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
