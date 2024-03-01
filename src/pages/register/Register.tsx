import { ChangeEvent } from "react";
import { Form, redirect } from "react-router-dom";
import User from "../../model/User";
import { createUser } from "../../service/Service";

export async function createNewUser({ request }) {
  const formData = await request.formData();
  const user = Object.fromEntries(formData);
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
  }
  alert("As senhas devem corresponder e ter pelo menos 8 caracteres");
  return null;
}

function Register() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-1 h-screen place-items-center font-bold">
        <div className="fundoCadastro hidden lg:block"></div>
        <Form
          className="flex justify-center items-center flex-col w-2/3 gap-3"
          method="post"
        >
          <h2 className="text-slate-900 text-5xl">Cadastrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="email">Sobrenome</label>
            <input
              type="text"
              id="sobrenome"
              name="sobrenome"
              placeholder="Sobrenome"
              className="border-2 border-slate-700 rounded p-2"
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
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="tipo">Tipo de Usuario</label>
            <input
              type="tipo"
              id="tipo"
              name="tipo"
              placeholder="Tipo"
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
