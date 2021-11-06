import { useState } from "react"
import { register } from "../services/user"

export default function SignupForm(props) {
  const { signup, signin } = props.auth

  const [registerData, setRegisterData] = useState({
    username: "",
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
      <button
        type="button"
        className="close"
        onClick={() => props.setAuth(false)}
      >
        <span>&times;</span>
      </button>
        <input
          type="text"
          placeholder="username"
        name="username"
        required
        value={registerData.username}
        onChange={(e) => handleChange(e)}
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          required
          value={registerData.email}
          onChange={(e) => handleChange(e)}
          />
        <input
          type="password"
          placeholder="password"
          name="password"
          required
          value={registerData.password}
          onChange={(e) => handleChange(e)}
        />
      <button type="submit">Sign up</button>
    </form>
  )
}
