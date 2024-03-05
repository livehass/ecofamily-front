import { Form, redirect } from "react-router-dom";
import Category from "../../model/Category";
import { create } from "../../service/Service";
import UserLogin from "../../model/UserLogin";

export async function action({ request }: { request: any }) {
  // const token =
  //   sessionStorage.getItem("userLogin") !== null
  //     ? (JSON.parse(sessionStorage.getItem("userLogin") as string) as UserLogin)
  //         .token
  //     : null;

  // if (token === null) return redirect("/login");

  const formData = await request.formData();
  const category = Object.fromEntries(formData);
  category.perecivel === "on"
    ? (category.perecivel = true)
    : (category.perecivel = false);
  console.log(category);

  await create("/categorias", category);
  return redirect("/categorias");
}

export default function CategoryForm() {
  return (
    <Form
      method="post"
      className="w-full flex flex-col items-center justify-center"
    >
      <input
        className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 hover:drop-shadow-md transition-all focus-visible:outline-0 focus-visible:border-green-500 peer"
        placeholder="Nova categoria"
        type="text"
        name="descricao"
        id="descricao"
        required
        autoFocus
      />
      <div className="flex items-center justify-start gap-4">
        <label htmlFor="perecivel">Perecível</label>
        <input type="checkbox" id="perecivel" name="perecivel" />
      </div>
      <button
        type="submit"
        className="my-4 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Criar
      </button>
    </Form>
  );
}
