import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import Product from "../../model/Product";
import Category from "../../model/Category";
import { find, update } from "../../service/Service";
import { useContext } from "react";
import { AuthContext } from "../../context/UserContext";
import { sortBy } from "sort-by-typescript";

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
    usuario: { id: data.usuario },
  } as Product;
  product.id = params.id;
  console.log(product);
  await update("/produtos", product);
  return redirect("/");
}

export default function ProductContainer() {
  const { user, favProducts, setFavProducts, cartProducts, setCartProducts } =
    useContext(AuthContext);
  const { product, categories } = useLoaderData() as {
    product: Product;
    categories: Category[];
  };
  if (product.foto === null) product.foto = "";

  if (user.id != product.usuario.id || user.tipo === 1)
    return (
      <div className="bg-gray-100 pb-8 pt-40 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300 mb-4">
                <img
                  className="w-full h-full object-cover"
                  src={
                    product.foto == ""
                      ? "https://cdlresende.com.br/wp-content/uploads/2018/03/no-image-icon-4.png"
                      : product.foto
                  }
                  alt="Product Image"
                />
              </div>
              <div className="flex -mx-2 mb-4">
                <div className="w-1/2 px-2">
                  <button
                    onClick={() => {
                      if (
                        cartProducts.filter(
                          (cartProduct) => cartProduct.id === product.id
                        ).length === 0
                      ) {
                        document
                          .getElementById("cart-icon")
                          ?.classList.add("animate-custom-ping");
                        setTimeout(
                          () =>
                            document
                              .getElementById("cart-icon")
                              ?.classList.remove("animate-custom-ping"),
                          600
                        );
                        const cartProduct = product;
                        cartProduct.quantidade = 1;
                        const newCartProducts = [
                          ...cartProducts,
                          cartProduct,
                        ].sort(sortBy("nome"));
                        setCartProducts(newCartProducts);
                        localStorage.setItem(
                          "cartProducts",
                          JSON.stringify(newCartProducts)
                        );
                      }
                    }}
                    className="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800"
                  >
                    Adicionar ao carrinho
                  </button>
                </div>
                <div className="w-1/2 px-2">
                  <button
                    onClick={() => {
                      if (
                        favProducts.filter(
                          (favProduct) => favProduct.id === product.id
                        ).length === 0
                      ) {
                        document
                          .getElementById("fav-icon")
                          ?.classList.add("animate-custom-ping");
                        setTimeout(
                          () =>
                            document
                              .getElementById("fav-icon")
                              ?.classList.remove("animate-custom-ping"),
                          600
                        );
                        setFavProducts([...favProducts, product]);
                        localStorage.setItem(
                          "favProducts",
                          JSON.stringify([...favProducts, product])
                        );
                      }
                    }}
                    className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300"
                  >
                    Adicionar aos favoritos
                  </button>
                </div>
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {product.nome}
              </h2>
              <div className="flex flex-col gap-4 md:flex-row md:justify-between mb-4">
                <div className="flex flex-col md:block">
                  <span className="font-bold text-gray-700">Preço:</span>
                  <span className="text-gray-600"> R${product.preco}</span>
                </div>
                <div className="flex flex-col md:block">
                  <span className="font-bold text-gray-700">
                    Disponibilidade:
                  </span>
                  <span className="text-gray-600">
                    {" "}
                    {product.quantidade > 0 ? "Em estoque" : "Sem estoque"}
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700">Loja:</span>
                <div className="flex items-center mt-2">
                  <Link
                    className="font-bold hover:underline"
                    to={`/lojas/${product.usuario.id}`}
                  >
                    {product.usuario.nome}
                  </Link>
                </div>
              </div>
              <div>
                <span className="font-bold text-gray-700">Descrição:</span>
                <p className="text-gray-600 text-sm mt-2">
                  {product.descricao}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <>
      <div className="pt-52 min-h-screen">
        <h2 className="mb-10 text-center text-2xl font-bold">Editar produto</h2>
        <div className="flex flex-col items-center justify-center">
          <Form
            className="w-full flex flex-col items-center justify-center gap-4"
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
              className="hidden"
              name="usuario"
              id="usuario"
            />

            <div className="min-w-64">
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
