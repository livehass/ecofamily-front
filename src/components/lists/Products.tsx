import { useLoaderData, useNavigation } from "react-router-dom";
import LoadingCategoryCardContainer from "../cards/LoadingCategoryCardContainer";
import Product from "../../model/Product";
import Category from "../../model/Category";
import { findProducts } from "../../service/Service";
import ProductCard from "../cards/ProductCard";
import CreateProductButton from "../cards/CreateProductButton";

export async function loader() {
  const { products, categories } = await findProducts();
  return { products, categories };
}
export default function Products() {
  const { products, categories } = useLoaderData() as {
    products: Product[];
    categories: Category[];
  };
  const navigation = useNavigation();

  return (
    <>
      <div className="w-full py-20">
        <h2 className="text-2xl font-bold py-4 px-8 md:text-4xl md:mt-12">
          Visualizar produtos
        </h2>
        <div className="p-4 grid grid-cols-[repeat(auto-fill,_minmax(250px,1fr))] auto-rows-[minmax(250px,_1fr)] gap-6">
          {navigation.state === "loading" ? (
            <LoadingCategoryCardContainer />
          ) : products.length === 0 ? (
            <>
              <CreateProductButton categories={categories} />
            </>
          ) : (
            <>
              <CreateProductButton categories={categories} />
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  category={product.categoria}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
