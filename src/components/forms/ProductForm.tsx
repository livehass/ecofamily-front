import { Form, redirect } from "react-router-dom";
import Product from "../../model/Product";
import { create } from "../../service/Service";
import Category from "../../model/Category";

export async function action({ request }: { request: any }) {
  // const token = (
  //   JSON.parse(sessionStorage.getItem("userLogin") as string) as UserLogin
  // ).token;

  // if (!sessionStorage.getItem("userLogin")) return redirect("/login");

  const formData = await request.formData();
  const product = Object.fromEntries(formData) as Product;
  console.log(product);

  await create("/produtos", product, { headers: { Authorization: token } });
  return redirect("/produtos");
}

export default function ProductForm({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <Form
      method="post"
      className="w-full flex flex-col items-center justify-center"
    >
      <input
        className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 hover:drop-shadow-md transition-all focus-visible:outline-0 focus-visible:border-blue-500 peer"
        placeholder="Nome"
        type="text"
        name="nome"
        id="nome"
        required
        autoFocus
      />
      <input
        className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 hover:drop-shadow-md transition-all focus-visible:outline-0 focus-visible:border-blue-500 peer"
        placeholder="Descrição"
        type="text"
        name="descricao"
        id="descricao"
        required
      />
      <input
        className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 hover:drop-shadow-md transition-all focus-visible:outline-0 focus-visible:border-blue-500 peer"
        placeholder="Preço"
        min="1"
        type="number"
        name="preco"
        id="preco"
        required
      />
      <input
        className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 hover:drop-shadow-md transition-all focus-visible:outline-0 focus-visible:border-blue-500 peer"
        placeholder="Quantidade"
        min="0"
        type="number"
        name="quantidade"
        id="quantidade"
        required
      />
      <select
        id="tema"
        name="tema"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        {categories.map((category: Category) => {
          return (
            <option key={category.id} value={category.id}>
              {category.descricao}
            </option>
          );
        })}
      </select>
      <button
        type="submit"
        className="mt-6 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Criar
      </button>
    </Form>
  );
}
