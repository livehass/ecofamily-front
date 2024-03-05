import Product from "./Product";

export default interface User {
  id: number;
  nome: string;
  sobrenome?: string;
  email: string;
  senha: string;
  foto?: string;
  produtos: Product[];
  tipo: number;
}
