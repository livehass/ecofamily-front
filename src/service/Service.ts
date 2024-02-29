/* eslint-disable @typescript-eslint/ban-types */
import axios from "axios";
import User from "../model/User";
import UserLogin from "../model/UserLogin";
import Category from "../model/Category";
import Product from "../model/Product";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

// Post user
export async function createUser(url: string, data: User) {
  const response = await axios.post(url, data);
  return response.data;
}

// // Post user
// export const register = async (
//   url: string,
//   data: Object,
//   setData: Function,
//   header: Object
// ) => {
//   const respose = await axios.post(url, data, header);
//   setData(respose.data);
// };

// Put user
export async function updateUser(
  url: string,
  data: object,
  setUser: React.Dispatch<React.SetStateAction<User>>,
  header: object
) {
  const response = await axios.put(url, data, header);
  response.data.senha = "";
  setUser(response.data);
  sessionStorage.setItem("userLogin", JSON.stringify(response.data));
}

// Login
export async function login(
  url: string,
  data: object,
  setUser: React.Dispatch<React.SetStateAction<UserLogin>>
) {
  const response = await axios.post(url, data);
  console.log(response);
  setUser(response.data);
  sessionStorage.setItem("userLogin", JSON.stringify(response.data));
  return response.data;
}

// Get
export async function find(
  url: string,
  setData:
    | React.Dispatch<React.SetStateAction<Category[]>>
    | React.Dispatch<React.SetStateAction<Category>>
    | React.Dispatch<React.SetStateAction<Product>>
    | React.Dispatch<React.SetStateAction<Product[]>>
    | React.Dispatch<React.SetStateAction<User>>,
  header: object
) {
  const response = await axios.get(url, header);
  if (url.includes("/usuarios")) {
    if (response.data.foto === null) response.data.foto = "";
  }
  setData(response.data);
}

// Post
export async function create(
  url: string,
  data: object,
  setData:
    | React.Dispatch<React.SetStateAction<Category>>
    | React.Dispatch<React.SetStateAction<Product>>,
  header: object
) {
  const response = await axios.post(url, data, header);
  console.log(response);
  setData(response.data);
}

// Put
export const update = async (
  url: string,
  dados: object,
  setDados: Function,
  header: Object
) => {
  const resposta = await axios.put(url, dados, header);
  setDados(resposta.data);
};

// Delete
export async function destroy(url: string, header: object) {
  await axios.delete(url, header);
}
