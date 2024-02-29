import Category from "./Category";
import User from "./User";

export default interface Product {
  id?: number;
  nome: string;
  descricao: string | null;
  preco: number;
  quantidade: number;
  foto: string;
  categoria: Category;
  usuario: User;
}
