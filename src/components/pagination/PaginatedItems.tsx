import { useState } from "react";
import ReactPaginate from "react-paginate";
import Category from "../../model/Category";
import ProductCard from "../cards/product/ProductCard";
import Product from "../../model/Product";

function Items({ currentItems }: { currentItems: Product[] }) {
  return (
    <>
      {currentItems &&
        currentItems.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </>
  );
}

export default function PaginatedItems({
  itemsPerPage,
  items,
}: {
  itemsPerPage: number;
  items: Product[];
  category?: Category;
}) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        className="w-full md:place-self-center md:col-start-3 md:col-span-2 md:self-center *:bg-white *:drop-shadow md:row-start-2 flex items-baseline justify-center gap-2 *:px-2 *:border *:rounded hover:*:bg-gray-100"
        breakLabel="..."
        nextLabel="Próximo"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="Anterior"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
