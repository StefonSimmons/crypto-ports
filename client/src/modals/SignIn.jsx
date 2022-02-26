import React, {useState} from 'react'
import ModalLayout from './ModalLayout'

export default function SignIn(props) {

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const [unauthorizedMsg, setUnauthorizedMsg ] = useState(null)

  const handleChange = (e) => {
    const { value, name } = e.target
    setLoginData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }
  return (
    <ModalLayout modal='sign in' updateModal={props.updateModal}>
      <form className="auth-form" onSubmit={async (e) => {
        const unauthorized = await  props.handleLogin(e, loginData)
        if (unauthorized) {
          setUnauthorizedMsg('incorrect username or password')
        } else {
          props.updateModal(prevModal => ({
            ...prevModal,
            signin: false
          }))
        }
      }}>
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
        <button type="submit">Enter</button>
        <p className="unauthorized-msg">{unauthorizedMsg}</p>
      </form>
      <p className="signup-cta"
        onClick={() => {
          props.updateModal(prevModal => ({
            ...prevModal,
            createanaccount: true,
            signin: false
          }))
        }}>Create new account
      </p>
    </ModalLayout>
  )
}
