import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/UserContext";
import UserLogin from "../../model/UserLogin";
import { RotatingLines } from "react-loader-spinner";

function Login() {
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState<UserLogin>({} as UserLogin);

  const { user, handleLogin } = useContext(AuthContext);

  const { isLoading } = useContext(AuthContext);

  function updateState(e: ChangeEvent<HTMLInputElement>) {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    if (user.token !== "") navigate("/");
  }, [user.token]);

  function login(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(userLogin);
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen py-52 font-bold bg-gray-100">
        <form
          className="bg-white py-12 px-8 rounded-lg drop-shadow flex justify-center items-center flex-col md:w-1/4 gap-4"
          onSubmit={login}
        >
          <h2 className="text-slate-900 text-5xl ">Entrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5"
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
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
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading ? (
              <div className="w-full flex items-center justify-center">
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="24"
                  visible={true}
                />
              </div>
            ) : (
              <span>Entrar</span>
            )}
          </button>

          <hr className="border-slate-800 w-full" />

          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Ainda não tem uma conta?{" "}
            <Link to="/cadastrar" className="text-indigo-800 hover:underline">
              Cadastre-se
            </Link>
          </p>
        </form>
        <div className="font-medium text-green-600 hover:underline dark:text-green-500"></div>
      </div>
    </>
  );
}

export default Login;
