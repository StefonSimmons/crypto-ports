import { useState } from "react";
import Main from "./components/Main";
import { register } from "./services/user"
import "./styles/main.css"

function App() {
  const [user, setUser] = useState({})

  const handleRegister = async (e, registerData) => {
    e.preventDefault()
    const user = await register(registerData)
    console.log(user)
    setUser(user)
  }

  return (
    <>
      <Main handleRegister={handleRegister}/>
    </>
  );
}

export default App;
