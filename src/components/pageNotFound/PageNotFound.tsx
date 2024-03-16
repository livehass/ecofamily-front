
import { Link } from "react-router-dom";

export default function NotFound()  {
    return (
      <div className="md:pt-20 flex flex-col ... py-20" >
              <h1 className="md:text-7xl text-2xl font-bold text-center text-gray-900 mt-56 uppercase object-top" >Erro 404</h1>
              <video poster="https://i.gifer.com/fetch/w300-preview/7f/7fdc56931b02740dcfe3e434d8be583a.gif"  
                     className=" object-center h-80 media-url__media "loop autoPlay muted>
                     <source src="https://i.gifer.com/3lL0.mp4" type="video/mp4"/>
                     <img  data-src="https://i.gifer.com/3lL0.gif"></img>
              </video>
              <p  className="md:text-4xl pb-10 flex justify-center font-bold align-center  text-gray-900 ml-100 object-botton" >
                  Parece que a pagina que está procurando não existe!!!
              </p>
              
              <div className="flex flex-nowrap justify-center ">
                <Link
                  to="/"
                  className="mx-5 ...cursor-pointer align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white hover:text-green-500 shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                >
                  Pagina Principal
                </Link>
                <Link
                  to="https://github.com/Generation-ecoFamily/ecofamily-front/issues"
                  className="mx-5 ... cursor-pointer align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white hover:text-green-500 shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                >
                  Reportar Erro
                </Link>
              </div>

    </div>



    
    );

}