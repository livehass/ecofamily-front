import Product from "./Product";
import User from "./User";

export default interface Transaction {
  comprador: User;
  produto: Product;
  quantidade: number;
}
