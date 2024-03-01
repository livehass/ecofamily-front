/* eslint-disable @typescript-eslint/ban-types */
import axios from "axios";
import User from "../model/User";
import UserLogin from "../model/UserLogin";
// import Category from "../model/Category";
// import Product from "../model/Product";

axios.defaults.baseURL = "https://ecofamily.onrender.com";

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
export async function find(url: string) {
  const response = await axios.get(url);
  return response.data;
}

export async function findProducts() {
  const products = await find("/produtos");
  const categories = await find("/categorias");

  return { products, categories };
}

export async function findCategory(url: string, header: object) {
  const response = await axios.get(url, header);
  console.log(response);
  return response.data;
}

// Post
export async function create(url: string, data: object) {
  const response = await axios.post(url, data);
  return response;
}

// Put
export const update = async (url: string, dados: object) => {
  const response = await axios.put(url, dados);
  return response.data;
};

// Delete
export async function destroy(url: string, header: object) {
  await axios.delete(url, header);
}
