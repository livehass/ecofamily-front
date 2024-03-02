export default function LoadingCategoryCard() {
  return (
    <article className="bg-gray-100 border border-gray-300 rounded-lg shadow animate-pulse">
      <div className="group w-full h-full pb-6 flex flex-col items-start justify-around text-gray-500 animate-pulse">
        <div className="w-full h-4/5 bg-gray-200 transition-all animate-pulse" />
        <h3 className="bg-gray-200 mt-4 w-1/2 h-8 font-bold transition-all animate-pulse"></h3>
        <h3 className="bg-gray-200 mt-4 w-1/3 h-4 font-bold transition-all animate-pulse"></h3>
      </div>
    </article>
  );
}
