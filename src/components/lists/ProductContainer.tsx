import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom";
import LoadingCategoryCardContainer from "../cards/category/LoadingCategoryCardContainer";
import Product from "../../model/Product";
import Category from "../../model/Category";
import { find, update } from "../../service/Service";
import ProductCard from "../cards/product/ProductCard";
import CreateProductButton from "../cards/product/CreateProductButton";

export async function loader({ params }) {
  const product = await find(`/produtos/${params.id}`);
  const categories = await find(`/categorias`);
  return { product, categories };
}

export async function singleProductAction({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const product = {
    ...data,
    categoria: { id: data.categoria },
    usuario: { id: 1 },
  } as Product;
  product.id = params.id;
  console.log(data.usuario);
  await update("/produtos", product);
  return redirect("/produtos");
}

export default function ProductContainer() {
  const { product, categories } = useLoaderData() as {
    product: Product;
    categories: Category[];
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
              placeholder="Nome"
              type="text"
              name="nome"
              id="nome"
              defaultValue={product.nome}
              required
              autoFocus
            />
            <input
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 hover:drop-shadow-md transition-all focus-visible:outline-0 focus-visible:border-blue-500 peer"
              placeholder="Descrição"
              type="text"
              name="descricao"
              id="descricao"
              defaultValue={
                product.descricao != null
                  ? product.descricao
                  : "Produto sem descrição"
              }
              required
            />
            <input
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 hover:drop-shadow-md transition-all focus-visible:outline-0 focus-visible:border-blue-500 peer"
              placeholder="Preço"
              min="1"
              type="number"
              name="preco"
              id="preco"
              defaultValue={product.preco}
              required
            />
            <input
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 hover:drop-shadow-md transition-all focus-visible:outline-0 focus-visible:border-blue-500 peer"
              placeholder="Quantidade"
              min="0"
              type="number"
              name="quantidade"
              id="quantidade"
              defaultValue={product.quantidade}
              required
            />
            <input
              type="number"
              value={product.usuario.id}
              disabled
              className="hidden"
              name="usuario"
            />

            <select
              id="categoria"
              name="categoria"
              defaultValue={product.categoria.id}
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
              Salvar
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
