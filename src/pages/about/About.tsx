const AboutUs = () => {
  return (
    <section
      className="hero py-12 bg-fixed bg-cover bg-no-repeat bg-center relative"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1516211697506-8360dbcfe9a4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      }}
    >
      <div className="absolute inset-0 bg-white/30 backdrop-blur-lg"></div>
      <div className="container mx-auto h-full">
        <div className="flex justify-end h-full relative z-10">
          <div className="p-6 md:p-12 ">
            <h2 className="text-4xl font-bold text-lime-950 mb-8">Sobre Nós</h2>
            <p className="text-lg text-gray-800 leading-relaxed">
              Bem-vindo a{" "}
              <span className="font-semibold text-lime-950">ecoFamily</span>,
              onde a paixão pelos produtos locais e a dedicação aos pequenos
              produtores se entrelaçam para criar uma experiência de compras
              única...
            </p>

            <p className="text-lg text-gray-800 leading-relaxed mt-4">
              <span className="font-semibold text-lime-950">Nossa Missão:</span>{" "}
              Fomentar Comunidades Locais. No coração de nossa filosofia está a
              missão de fortalecer as comunidades locais, valorizando a
              autenticidade e a singularidade de cada produto. Acreditamos que,
              ao apoiar pequenos produtores, contribuímos para o crescimento
              econômico sustentável e para a preservação das tradições locais.
            </p>

            <p className="text-lg text-gray-800 leading-relaxed mt-4">
              <span className="font-semibold text-lime-950">
                O Que Nos Diferencia:
              </span>{" "}
              Qualidade, Autenticidade e Responsabilidade Social.
              Comprometemo-nos a oferecer produtos de alta qualidade,
              cuidadosamente selecionados para garantir que cada compra seja uma
              experiência enriquecedora. Trabalhamos lado a lado com nossos
              parceiros locais, colaborando para garantir que cada item reflita
              não apenas a habilidade artesanal, mas também a autenticidade
              cultural de suas origens.
            </p>

            <div className="mt-4 flex justify-center">
              <p className="text-lg text-gray-800 leading-relaxed mt-4">
                <span className="font-semibold text-lime-950">Nossa ODS: </span>
                Trabalho decente e crescimento econômico Promover o crescimento
                econômico inclusivo e sustentável, o emprego pleno e produtivo e
                o trabalho digno para todos.
                <br />
                 <span className="font-semibold text-lime-950">8.a </span> Aumentar o apoio da Iniciativa
                de Ajuda para o Comércio [Aid for Trade] para os países em
                desenvolvimento, particularmente os países menos desenvolvidos,
                inclusive por meio do Quadro Integrado Reforçado para a
                Assistência Técnica Relacionada com o Comércio para os países
                menos desenvolvidos
              </p>
              <img
                src="/src/assets/SDG-8.png"
                alt="ODS"
                className="w-[25vh] h-auto shadow-lg rounded-lg mx-5 "
              />
            </div>

            <p className="text-lg text-gray-800 leading-relaxed mt-4">
              <span className="font-semibold text-lime-950">
                Junte-se a Nós nesta Jornada:
              </span>{" "}
              Apoie o Local, Valorize o Artesanal. Estamos entusiasmados em
              tê-lo conosco nesta jornada de descobertas e celebração dos
              talentos locais. Cada compra que você faz no{" "}
              <span className="font-semibold text-lime-950">ecoFamily</span>{" "}
              contribui para o fortalecimento de pequenas empresas e para a
              preservação das tradições locais.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

// const AboutUs = () => {
//     return (
//       <section className="bg-slate-50 py-12">
//         <div className="container mx-auto">
//           <h2 className="text-4xl font-bold text-center text-lime-950 mb-8">Sobre Nós</h2>
//           <p className="text-lg text-gray-800 leading-relaxed">
//             Bem-vindo a <span className="font-semibold text-lime-950">ecoFamily</span>, onde a paixão pelos produtos locais e a dedicação aos pequenos produtores se entrelaçam para criar uma experiência de compras única. Somos mais do que uma plataforma de e-commerce; somos um ponto de encontro para artesãos, agricultores e pequenos empresários que buscam compartilhar suas criações excepcionais com o mundo.
//           </p>

//           <p className="text-lg text-gray-800 leading-relaxed mt-4">
//             <span className="font-semibold text-lime-950">Nossa Missão:</span> Fomentar Comunidades Locais. No coração de nossa filosofia está a missão de fortalecer as comunidades locais, valorizando a autenticidade e a singularidade de cada produto. Acreditamos que, ao apoiar pequenos produtores, contribuímos para o crescimento econômico sustentável e para a preservação das tradições locais.
//           </p>

//           <p className="text-lg text-gray-800 leading-relaxed mt-4">
//             <span className="font-semibold text-lime-950">O Que Nos Diferencia:</span> Qualidade, Autenticidade e Responsabilidade Social. Comprometemo-nos a oferecer produtos de alta qualidade, cuidadosamente selecionados para garantir que cada compra seja uma experiência enriquecedora. Trabalhamos lado a lado com nossos parceiros locais, colaborando para garantir que cada item reflita não apenas a habilidade artesanal, mas também a autenticidade cultural de suas origens.
//           </p>

//           <p className="text-lg text-gray-800 leading-relaxed mt-4">
//             <span className="font-semibold text-lime-950">Junte-se a Nós nesta Jornada:</span> Apoie o Local, Valorize o Artesanal. Estamos entusiasmados em tê-lo conosco nesta jornada de descobertas e celebração dos talentos locais. Cada compra que você faz no <span className="font-semibold text-lime-950">ecoFamily</span> contribui para o fortalecimento de pequenas empresas e para a preservação das tradições locais.
//           </p>
//         </div>
//       </section>
//     );
//   };

//   export default AboutUs;
