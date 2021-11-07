import { useState, createContext } from "react";
import Main from "./components/Main";
import { register } from "./services/user"
import "./styles/main.css"

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null)

  const handleRegister = async (e, registerData) => {
    e.preventDefault()
    const userData = await register(registerData)
    setUser(userData)
  }

  return (
    <>
      <UserContext.Provider value={user}>
        <Main handleRegister={handleRegister} />
      </UserContext.Provider>
    </>
  );
}

export default App;
