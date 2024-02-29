import Product from "./Product";

export default interface Category {
  id: number;
  descricao: string;
  perecivel: boolean;
  postagens: Product[] | null;
}
