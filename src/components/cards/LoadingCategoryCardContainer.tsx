import { useState } from "react";
import LoadingCategoryCard from "./LoadingCategoryCard";

export default function LoadingCategoryCardContainer() {
  const [screen] = useState(window.innerWidth);

  return (
    <div className="w-full p-4 grid grid-cols-[repeat(auto-fill,_minmax(250px,1fr))] auto-rows-[minmax(250px,_1fr)] gap-6">
      {screen > 768 ? (
        <>
          <LoadingCategoryCard />
          <LoadingCategoryCard />
          <LoadingCategoryCard />
          <LoadingCategoryCard />
          <LoadingCategoryCard />
          <LoadingCategoryCard />
          <LoadingCategoryCard />
          <LoadingCategoryCard />
          <LoadingCategoryCard />
          <LoadingCategoryCard />
          <LoadingCategoryCard />
          <LoadingCategoryCard />
        </>
      ) : (
        <LoadingCategoryCard />
      )}
    </div>
  );
}
