import { useState } from "react"

export default function SignupForm(props) {

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


  return (
    <form className="signup-form" onSubmit={(e) => {
      props.handleRegister(e, registerData)
      props.setAuth(prev => ({...prev, signup:false}))
    }}>
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
