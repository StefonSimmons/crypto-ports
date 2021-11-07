import { useState, createContext, useEffect } from "react";
import Main from "./components/Main";
import { logout, register, verify } from "./services/user"
import "./styles/main.css"

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null)


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

  const handleLogout = () => {
    logout()
    setUser(null)
  }

  return (
    <>
      <UserContext.Provider value={user}>
        <Main handleRegister={handleRegister} handleLogout={handleLogout} />
      </UserContext.Provider>
    </>
  );
}

export default App;
