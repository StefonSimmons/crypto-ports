import { useState, createContext, useEffect } from "react";
import { useHistory } from "react-router";
import Main from "./components/Main";
import { login, logout, register, verify } from "./services/user"
import "./styles/main.css"

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null)

  const history = useHistory()

  useEffect(() => {
    const getCurrUser = async () => {
      const userData = await verify()
      setUser(userData)
    }
    
    getCurrUser()
  }, [])

  const handleRegister = async (e, registerData) => {
    e.preventDefault()
    const userData = await register(registerData)
    setUser(userData)
  }

  const handleLogin = async (e, loginData) => {
    e.preventDefault()
    const userData = await login(loginData)
    setUser(userData)
  }

  const handleLogout = () => {
    logout()
    setUser(null)
    history.push("/")
  }

  return (
    <>
      <UserContext.Provider value={user}>
        <Main
          handleRegister={handleRegister}
          handleLogout={handleLogout}
          handleLogin={handleLogin}
        />
      </UserContext.Provider>
    </>
  );
}

export default App;
