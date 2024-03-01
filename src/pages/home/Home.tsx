function Home() {
  return (
    <>
      <div id="hero" className="pt-28 flex justify-center min-h-screen">
        <div className="container grid grid-cols-1 text-white">
          <div className="flex flex-col gap-4 items-center justify-center py-4">
            <h2 className="text-7xl font-bold text-gray-900 mt-56">Seja bem vindo!</h2>
            <p className="text-2xl text-gray-900">Compre produtos de Pequenos Produtores</p>

            <div className="flex justify-around gap-4">
              <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
                Explorar
              </button>
            </div>
          </div>

          <div className="flex justify-center ">
            <img src="" alt="" className="w-2/3" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
