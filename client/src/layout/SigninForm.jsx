import React, { useState } from 'react'

export default function SigninForm(props) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })


  const handleChange = (e) => {
    const { value, name } = e.target
    setLoginData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }


  return (
    <form className="signin-form" onSubmit={(e) => {
      props.handleLogin(e, loginData)
      props.setAuth(prev => ({...prev, signin:false}))
    }}>
      <button
        type="button"
        className="close"
        onClick={() => props.setAuth(false)}
      >
        <span>&times;</span>
      </button>
        <input
          type="email"
          placeholder="email"
          name="email"
          required
          value={loginData.email}
          onChange={(e) => handleChange(e)}
          />
        <input
          type="password"
          placeholder="password"
          name="password"
          required
          value={loginData.password}
          onChange={(e) => handleChange(e)}
        />
      <button type="submit">Sign in</button>
    </form>
  )
}
