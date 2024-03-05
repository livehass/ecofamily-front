import { redirect, useLoaderData } from "react-router-dom";
import ProductForm from "../../components/forms/ProductForm";
import { find } from "../../service/Service";
import Category from "../../model/Category";

export async function novoProdutoLoader() {
  if (sessionStorage.getItem("userLogin") === null) return redirect("/login");
  if (JSON.parse(sessionStorage.getItem("userLogin") as string).tipo === 1)
    return redirect("/");
  const categories = await find("/categorias");
  return categories;
}

export default function NovoProduto() {
  const categories = useLoaderData() as Category[];
  return (
    <div className="py-40 min-h-screen">
      <h2 className="mb-10 text-center text-2xl font-bold">Novo produto</h2>
      <ProductForm categories={categories} />
    </div>
  );
}