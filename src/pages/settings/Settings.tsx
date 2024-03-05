import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/UserContext";
import User from "../../model/User";
import UserLogin from "../../model/UserLogin";
import { MutatingDots } from "react-loader-spinner";
import ModalDelete from "../../components/modal/ModalDelete";
import { destroy, updateUser } from "../../service/Service";

export default function Settings() {
  const { user, handleLogout, handleLogin } = useContext(AuthContext);
  const token = user.token;

  const [isPublicOpen, setIsPublicOpen] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [changePicture, setChangePicture] = useState(false);
  const [newUser, setNewUser] = useState<User>(user as unknown as User);
  const navigate = useNavigate();

  useEffect(() => {
    if (token === "") navigate("/login");
  }, [token, navigate]);

  async function handleUpdate(e: ChangeEvent<HTMLFormElement>) {
    console.log(user);
    e.preventDefault();
    try {
      setIsLoading(true);
      await updateUser("/usuarios/atualizar", newUser, setNewUser, {
        headers: {
          Authorization: token,
        },
      });
      setIsLoading(false);
      setChangePicture(false);
      handleLogin(newUser as UserLogin);
    } catch (error) {
      if (error.toString().includes("403")) handleLogout();
      else {
        alert("Oops... Something went wrong, try again later");
        console.log(error);
      }
      setIsLoading(false);
    }
  }

  async function deleteUser() {
    try {
      await destroy(`/usuarios/${user.id}`, {
        headers: {
          Authorization: token,
        },
      });
      handleLogout();
    } catch (error) {
      if (error.toString().includes("403")) handleLogout();
      else alert("Oops... Something went wrong, try again later", "error");
    }
  }

  function updateState(e: React.ChangeEvent<HTMLInputElement>) {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="pt-24 bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row">
      {isLoading ? (
        <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        secondaryColor="#4fa94d"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />
      ) : (
        <>
          <aside className="py-4 md:w-1/3 lg:w-1/4 md:block">
            <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-emerald-100 top-12">
              <h2 className="pl-3 mb-4 text-2xl font-semibold">Opções</h2>
              <button
                onClick={() => setIsPublicOpen(true)}
                className={`flex items-center px-3 py-2.5 font-bold bg-white ${
                  isPublicOpen && "text-emerald-900 border rounded-full"
                }`}
              >
                Minha conta
              </button>
              <button
                onClick={() => setIsPublicOpen(false)}
                className={`flex items-center px-3 py-2.5 font-bold bg-white ${
                  !isPublicOpen && "text-emerald-900 border rounded-full"
                }`}
              >
                Avançado
              </button>
            </div>
          </aside>
          <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
            {isPublicOpen ? (
              <form onSubmit={handleUpdate} className="p-2 md:p-4">
                <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                  <h2 className="pl-6 text-2xl font-bold sm:text-xl">
                    Minha conta
                  </h2>
                  <div className="grid max-w-2xl mx-auto mt-8">
                    <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                      <div className="flex flex-col gap-8 items-center">
                        <img
                          className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-emerald-300"
                          src={
                            user.foto == ""
                              ? "https://cdlresende.com.br/wp-content/uploads/2018/03/no-image-icon-4.png"
                              : user.foto
                          }
                          alt="Bordered avatar"
                        />
                        <input
                          type="text"
                          id="foto"
                          name="foto"
                          className={`border border-emerald-300 text-emerald-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 ${
                            !changePicture && "invisible"
                          }`}
                          placeholder="Url da foto"
                          value={newUser.foto}
                          onChange={updateState}
                        />
                      </div>
                      <div className="flex flex-col space-y-5 sm:ml-8">
                        <button
                          onClick={() => setChangePicture(true)}
                          type="button"
                          className="py-3.5 px-7 text-base font-medium text-emerald-100 focus:outline-none bg-emerald-700 rounded-lg border border-emerald-200 hover:bg-emerald-900 focus:z-10 focus:ring-4 focus:ring-emerald-200 "
                        >
                          Mudar foto
                        </button>
                        <button
                          type="button"
                          className="py-3.5 px-7 text-base font-medium text-emerald-900 focus:outline-none bg-white rounded-lg border border-emerald-200 hover:bg-emerald-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-emerald-200 "
                          onClick={() => setNewUser({ ...newUser, foto: '' })}
                        >
                          Apagar foto
                        </button>
                      </div>
                    </div>
                    <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                      <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                        <div className="w-full flex items-center justify-between">
                          <div>
                              <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-emerald-900"
                              >
                                Nome
                              </label>
                              <input
                                type="text"
                                id="nome"
                                name="nome"
                                className="bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 "
                                placeholder="Digite seu nome"
                                value={newUser.nome}
                                onChange={updateState}
                                required
                              />
                          </div>
                          <div>
                              <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-emerald-900"
                              >
                                Sobrenome
                              </label>
                              <input
                                type="text"
                                id="sobrenome"
                                name="sobrenome"
                                className="bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 "
                                placeholder="Digite seu sobrenome"
                                value={newUser.sobrenome}
                                onChange={updateState}
                                required
                              />
                          </div>
                        </div>
                      </div>
                      <div className="mb-2 sm:mb-6">
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-emerald-900"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 "
                          placeholder="your.email@mail.com"
                          defaultValue={newUser.email}
                          onChange={updateState}
                          required
                        />
                      </div>
                      <div className="mb-2 sm:mb-6">
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-emerald-900"
                        >
                          Você deve digitar sua senha para fazer alterações
                        </label>
                        <input
                          type="password"
                          id="senha"
                          name="senha"
                          className="bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 "
                          placeholder="*************"
                          defaultValue={newUser.senha}
                          onChange={updateState}
                          autoComplete="current-password"
                          required
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="text-white bg-emerald-700  hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                          Salvar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <form className="p-2 md:p-4">
                <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                  <h2 className="pl-6 text-2xl font-bold sm:text-xl">
                    Avançado
                  </h2>
                  <div className="grid max-w-2xl mx-auto mt-8">
                    <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                      <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                        <div className="w-full">
                          <label
                            htmlFor="newPassword"
                            className="block mb-2 text-sm font-medium text-emerald-900"
                          >
                            Alterar senha
                          </label>
                          <input
                            type="password"
                            id="newPassword"
                            className="bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 "
                            placeholder="Digite sua nova senha"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                        <div className="w-full">
                          <label
                            htmlFor="newPasswordConfirmation"
                            className="block mb-2 text-sm font-medium text-emerald-900"
                          >
                            Confirme sua nova senha
                          </label>
                          <input
                            type="password"
                            id="newPasswordConfirmation"
                            className="bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 "
                            placeholder="Confirmar nova senha"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-center gap-8 my-16 pl-8">
                        <h2 className="font-bold text-xl">Zona de Perigo</h2>
                        <button
                          type="button"
                          className="text-white bg-red-700  hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                          onClick={() => {
                            setIsDeleting(true);
                          }}
                        >
                          Apagar conta
                        </button>
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="text-white bg-emerald-700  hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                          Salvar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </main>
          {isDeleting && (
            <ModalDelete
              message="Você tem certeza que quer fazer isso? Esta ação não pode ser desfeita."
              openModal={isDeleting}
              setOpenModal={() => setIsDeleting(false)}
              handleDelete={deleteUser}
            />
          )}
        </>
      )}
    </div>
  );
}
