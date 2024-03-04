import { Form, redirect, useNavigation } from "react-router-dom";
import User from "../../model/User";
import { createUser } from "../../service/Service";
import { useState } from "react";

export async function createNewUser({ request }) {
  const formData = await request.formData();
  const user = Object.fromEntries(formData);
  user.tipo = parseInt(user.tipo);
  if (user.tipo === 0) user.sobrenome = "";
  if (user.passwordConfirm === user.senha && user.senha.length >= 8) {
    delete user.passwordConfirm;
    try {
      const response = await createUser("usuarios/cadastrar", user as User);
      alert(`Bem-vindo, ${response.nome}!`);
      return redirect("/login");
    } catch (error) {
      alert("Oops, ocorreu algum erro...");
      console.log(error);
    }
  } else {
    alert("As senhas devem corresponder e ter pelo menos 8 caracteres");
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
      <div className="grid grid-cols-1 lg:grid-cols-1 h-screen place-items-center font-bold">
        <div className="fundoCadastro hidden lg:block"></div>
        <Form
          className="flex justify-center items-center flex-col w-2/3 gap-3"
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
              className="border-2 border-slate-700 rounded p-2"
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
              className="border-2 border-slate-700 rounded p-2"
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
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              placeholder="Confirmar Senha"
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>
          <div className="flex justify-around w-full gap-8">
            <button
              className="rounded text-white bg-indigo-400 hover:bg-indigo-900 w-1/2 py-2"
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
