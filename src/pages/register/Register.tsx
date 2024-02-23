import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import User from '../../model/User'
import { createUser } from '../../service/Service'


function Register() {

  let navigate = useNavigate()

  const [confirmPassword, setConfirPassword] = useState<string>("")

  const [user, setUser] = useState<User>({
    
    id: 0,
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    foto: '',
    tipo: 0
  })

  const [userReponse, setUserReponse] = useState<User>({
    id: 0,
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    foto: '',
    tipo: 0 

  })

  useEffect(() => {
    if (userReponse.id !== 0) {
      back()
    }
  }, [userReponse])

  function back() {
    navigate('/login')
  }

  function handleConfirmPassword(e: ChangeEvent<HTMLInputElement>) {
    setConfirPassword(e.target.value)
  }

  function updateState(e: ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  async function registerNewUser(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    if (confirmPassword === user.senha && user.senha.length >= 8) {

      try {
        await createUser(`/usuarios/cadastrar`, user as User)
        alert('Usuário cadastrado com sucesso')

      } catch (error) {
        alert('Erro ao cadastrar o Usuário')
        console.log(error)
      }

    } else {
      alert('Dados inconsistentes. Verifique as informações de cadastro.')
      setUser({ ...user, senha: "" }) // Reinicia o campo de Senha
      setConfirPassword("")                  // Reinicia o campo de Confirmar Senha
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-1 h-screen place-items-center font-bold">
        <div className="fundoCadastro hidden lg:block"></div>
        <form className='flex justify-center items-center flex-col w-2/3 gap-3' onSubmit={registerNewUser}>
          <h2 className='text-slate-900 text-5xl'>Cadastrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="border-2 border-slate-700 rounded p-2"
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
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
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
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
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
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
              className="border-2 border-slate-700 rounded p-2"
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
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
              onChange={(e) => setConfirPassword(e.target.value)}
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
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
            />
          </div>
          <div className="flex justify-around w-full gap-8">
            <button className='rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2' onClick={back}>
              Cancelar
            </button>
            <button className='rounded text-white bg-indigo-400 hover:bg-indigo-900 w-1/2 py-2' type='submit'>
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register