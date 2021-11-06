import { useState } from "react"
import { register } from "../services/user"

export default function SignupForm(props) {
  const { signup, signin } = props.auth

  const [registerData, setRegisterData] = useState({
    email: "",
    password: ""
  })


  const handleChange = (e) => {
    const { value, name } = e.target
    setRegisterData(prevData => ({
      ...prevData,
      [name]: value
    })) 
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = await register(registerData)
    console.log(user)
  }
  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <input
        type="text" 
        placeholder="email"
        name=""
        value={""}
        onChange={(e) => handleChange(e)}
        />
      <input
        type="password" 
        placeholder="password"
        name=""
        value={""}
        onChange={(e) => handleChange(e)}
        />
      <button type="submit">Sign up</button>
    </form>
  )
}
