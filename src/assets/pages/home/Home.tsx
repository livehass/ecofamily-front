import "./Home.css";


function Home() {
    return (
        <>
        <div className="bg-lime-950 flex justify-center">
          <div className="container grid grid-cols-1 text-white">
            <div className="flex flex-col gap-4 items-center justify-center py-4">
              <h2 className="text-5xl font-bold">Seja bem vindo!</h2>
              <p className="text-xl">Compre produtos de Pequenos Produtores</p>
  
              <div className="flex justify-around gap-4">
              
                <button className="rounded bg-white text-lime-950 py-2 px-4">Conheça nossos Produtos</button>
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