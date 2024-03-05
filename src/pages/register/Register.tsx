import { Form, redirect, useNavigation } from "react-router-dom";
import User from "../../model/User";
import { createUser } from "../../service/Service";
import { useState } from "react";
import { toasts } from "../../util/toasts";

export async function createNewUser({ request }) {
  const formData = await request.formData();
  const user = Object.fromEntries(formData);
  user.tipo = parseInt(user.tipo);
  if (user.tipo === 0) user.sobrenome = "";
  if (user.passwordConfirm === user.senha && user.senha.length >= 8) {
    delete user.passwordConfirm;
    try {
      const response = await createUser("usuarios/cadastrar", user as User);
      toasts(`Bem-vindo, ${response.nome}!`, "success");
      return redirect("/login");
    } catch (error) {
      toasts("Oops, ocorreu algum erro...", "error");
      console.log(error);
    }
  } else {
    toasts("As senhas devem corresponder e ter pelo menos 8 caracteres", "info");
  }

  return null;
}

function Register() {
  const [userType, setUserType] = useState(1);
  const navigation = useNavigation();
  return (
    <>
      {navigation.state === "loading" ||
        (navigation.state === "submitting" && (
          <div className="text-4xl"> CARREGANM DPO</div>
        ))}
      <div className="flex flex-col justify-center items-center h-screen font-bold bg-gray-100 pt-16">
        <Form
          className="bg-white py-12 px-8 rounded-lg drop-shadow flex justify-center items-center flex-col w-1/2 gap-4"
          method="post"
        >
          <h2 className="text-slate-900 text-5xl">Cadastrar</h2>
          <div className="w-full">
            <label htmlFor="tipo">Tipo de usuário</label>
            <select
              id="tipo"
              name="tipo"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              defaultValue={1}
              onChange={(e) => {
                setUserType(parseInt(e.target.value));
              }}
            >
              <option value="0">Vendedor</option>
              <option value="1">Comprador</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="nome">
              {userType === 0 ? "Nome da loja" : "Nome"}
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5"
              required
            />
          </div>
          <div className={`flex flex-col w-full ${userType === 0 && "hidden"}`}>
            <label htmlFor="email">Sobrenome</label>
            <input
              type="text"
              id="sobrenome"
              name="sobrenome"
              placeholder="Sobrenome"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5"
              required={userType === 1}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              placeholder="Confirmar Senha"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5"
            />
          </div>
          <div className="flex justify-around w-full gap-8">
            <button
              className="w-1/2 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              type="submit"
            >
              Cadastrar
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default Register;
