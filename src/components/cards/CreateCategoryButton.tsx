import { useState } from "react";
import CategoryForm from "../forms/CategoryForm";

export default function CreateCategoryButton() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <article className="bg-white border border-gray-300 border-l-8 border-l-fuchsia-600 rounded-lg shadow transition-all flex flex-col items-center justify-center">
      <button
        onClick={() => {
          if (isClicked) setIsClicked(false);
          else setIsClicked(true);
        }}
        className="group w-full pt-8 pb-6 px-4 flex flex-col items-center justify-center text-gray-500 hover:text-gray-800"
      >
        <i
          className={`fa-solid fa-circle-plus text-7xl group-hover:scale-105 ${
            isClicked && "rotate-45"
          } transition-all`}
        />
      </button>
      {isClicked ? (
        <CategoryForm />
      ) : (
        <h3 className="font-bold transition-all">Nova categoria</h3>
      )}
    </article>
  );
}
