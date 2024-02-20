function Navbar() {
  return (
    <>
      <div className="w-full bg-lime-950 text-white flex justify-center py-4">
        <div className="container flex justify-between text-lg">
          <div className="text-2xl font-bold uppercase">ecoFamily</div>

          <div className="flex gap-4">
            <div className="hover:underline">Produtos</div>
            <div className="hover:underline">Categorias</div>
            <div className="hover:underline">Carrinho (4)</div>

            <div className="hover:underline">Perfil</div>
            <div className="hover:underline">Sair</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
