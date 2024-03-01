import { useEffect, useState } from 'react';
import UserLogin from '../../model/UserLogin';
import { AuthContext } from '../../context/UserContext';
import AuthProviderProps from '../../model/AuthProviderProps';
import { login } from '../../service/Service';

export default function AuthProvider({children}: AuthProviderProps){
    const initialUser: UserLogin ={
        id: 0,
        nome: "",
        email: "",
        foto: "",
        senha: "",
        token: "",
    };

    const sessionUser: () => UserLogin = () => {
return JSON.parse(
    sessionStorage.getItem("userLogin") || JSON.stringify(initialUser)
) as UserLogin;     
    };

    const [user, setUser] = useState<UserLogin>(sessionUser());

    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(userLogin: UserLogin) {
        setIsLoading(true);
        try {
            await login("usuarios/login", userLogin, setUser);
            alert("User logged sucessfully");
            setIsLoading(false);
    } catch (error) {
        console.log(error);
        alert("Inconsistent user data");
        setIsLoading(false);
    }
}
function handleLogout() {
    setUser(initialUser);
    sessionStorage.clear();
}

useEffect(() => {
    const persistedUserLogin: UserLogin =JSON.parse(
        sessionStorage.getItem( "userLogin" )|| JSON.stringify(initialUser)
    );
    if (persistedUserLogin.token !== "") setUser(persistedUserLogin);
     
}, []);
    
    return (
        <AuthContext.Provider value={{ user, isLoading, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

