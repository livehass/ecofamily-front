export default interface User {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  foto?: string;
  tipo: number;
}
