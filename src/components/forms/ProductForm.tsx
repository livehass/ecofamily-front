import { Form, redirect } from "react-router-dom";
import Product from "../../model/Product";
import { create } from "../../service/Service";
import Category from "../../model/Category";
import { useContext } from "react";
import { AuthContext } from "../../context/UserContext";

export async function action({ request }: { request: any }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const product = {
    ...data,
    categoria: { id: data.categoria },
    usuario: { id: data.usuario },
  } as Product;
  console.log(product);

  await create("/produtos", product);
  return redirect("/");
}

export default function ProductForm({
  categories,
}: {
  categories: Category[];
}) {
  const { user } = useContext(AuthContext);
  return (
    <Form
      className="w-full flex flex-col items-center justify-center gap-4"
      method="put"
    >
      <div className="flex flex-col items-center gap-4">
        <img
          className="size-32 object-cover"
          src="https://cdlresende.com.br/wp-content/uploads/2018/03/no-image-icon-4.png"
          alt="Product Image"
        />
        <input
          className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 hover:drop-shadow-md transition-all focus-visible:outline-0 focus-visible:border-green-500 peer"
          placeholder="Url da foto"
          type="text"
          name="foto"
          id="foto"
        />
      </div>
      <div className="md:w-1/3 bg-white rounded-md px-4 py-8 flex flex-col gap-4 border drop-shadow-md">
        <input
          className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 hover:drop-shadow-md transition-all focus-visible:outline-0 focus-visible:border-green-500 peer"
          placeholder="Nome"
          type="text"
          name="nome"
          id="nome"
          required
          autoFocus
        />
        <input
          className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 hover:drop-shadow-md transition-all focus-visible:outline-0 focus-visible:border-green-500 peer"
          placeholder="Descrição"
          type="text"
          name="descricao"
          id="descricao"
          required
        />
        <input
          className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 hover:drop-shadow-md transition-all focus-visible:outline-0 focus-visible:border-green-500 peer"
          placeholder="Preço"
          min="1"
          type="number"
          name="preco"
          id="preco"
          required
        />
        <input
          className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 hover:drop-shadow-md transition-all focus-visible:outline-0 focus-visible:border-green-500 peer"
          placeholder="Quantidade"
          min="0"
          type="number"
          name="quantidade"
          id="quantidade"
          required
        />
        <input
          type="number"
          value={user.id}
          className="hidden"
          name="usuario"
          id="usuario"
        />
        <div className="min-w-64">
          <select
            id="categoria"
            name="categoria"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          >
            {categories.map((category: Category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.descricao}
                </option>
              );
            })}
          </select>
        </div>
        <button
          type="submit"
          className="mt-6 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Salvar
        </button>
      </div>
    </Form>
  );
}
