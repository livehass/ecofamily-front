import Product from "./Product";

export default interface Category {
  id: number;
  descricao: string;
  perecivel: boolean;
  produtos: Product[] | null;
}
