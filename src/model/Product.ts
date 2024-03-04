import Category from "./Category";
import User from "./User";

export default interface Product {
  id?: number;
  nome: string;
  descricao: string | null;
  preco: string;
  quantidade: number;
  foto: string;
  categoria: Category;
  usuario: User;
}
