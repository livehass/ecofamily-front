import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/UserContext";
import CheckoutProduct from "../../components/cards/product/CheckoutProduct";

export default function Comprar() {
  const { cartProducts } = useContext(AuthContext);
  const [total, setTotal] = useState(
    cartProducts.reduce((acc, product) => {
      acc += parseFloat(product.preco);
      return acc;
    }, 0)
  );

  useEffect(() => {
    setTotal(
      cartProducts.reduce((acc, product) => {
        acc += parseFloat(product.preco) * product.quantidade;
        return acc;
      }, 0)
    );
  }, [cartProducts]);

  return (
    <div className="min-h-screen bg-gray-100 pt-52">
      <h1 className="mb-10 text-center text-2xl font-bold">Meu carrinho</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cartProducts.map((product) => (
            <CheckoutProduct key={product.id} product={product} />
          ))}
        </div>
        {/* Sub total */}
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">{total}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Frete</p>
            <p className="text-gray-700">R$4,99</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">{total + 4.99}</p>
              <p className="text-sm text-gray-700">+ Impostos</p>
            </div>
          </div>
          <button className="mt-6 w-full rounded-md bg-green-600 py-1.5 font-medium text-blue-50 hover:bg-green-700">
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
}
