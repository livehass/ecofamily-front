import { redirect, useLoaderData } from "react-router-dom";
import User from "../../model/User";
import UserLogin from "../../model/UserLogin";
import { find } from "../../service/Service";
import Product from "../../model/Product";
import { sortBy } from "sort-by-typescript";

export async function transactionLoader() {
  if (sessionStorage.getItem("userLogin") === null) return redirect("/login");
  if (JSON.parse(sessionStorage.getItem("userLogin") as string).tipo === 0)
    return redirect("/");

  const id = (
    JSON.parse(sessionStorage.getItem("userLogin") as string) as UserLogin
  ).id;

  const products = ((await find(`usuarios/${id}`)) as unknown as User).produtos;

  return products;
}

export default function TransactionHistory() {
  let products = useLoaderData() as Product[];
  products = products.sort(sortBy("data"));
  return (
    <div className="min-h-screen bg-gray-100 pt-52 px-40">
      <div className="relative overflow-x-auto rounded-md">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border rounded-md">
          <thead className="text-xs text-gray-900 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Data da transação
              </th>
              <th scope="col" className="px-6 py-3">
                Nome do produto
              </th>
              <th scope="col" className="px-6 py-3">
                Comprado de
              </th>
              <th scope="col" className="px-6 py-3">
                Categoria
              </th>
              <th scope="col" className="px-6 py-3">
                Quantidade
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr className="odd:bg-gray-50 even:bg-white">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {new Date(product.data).toDateString()}
                </th>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {product.nome}
                </td>
                <td className="px-6 py-4">
                  {product.descricao?.split("Comprado de ")[1]}
                </td>
                <td className="px-6 py-4">{product.categoria.descricao}</td>
                <td className="px-6 py-4">{product.quantidade}</td>
                <td className="px-6 py-4">
                  R$
                  {(parseFloat(product.preco) * product.quantidade)
                    .toFixed(2)
                    .replace(".", ",")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
