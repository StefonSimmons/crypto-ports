import React, {useState} from 'react'
import ModalLayout from './ModalLayout'

export default function SignUp(props) {

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
    <ModalLayout modal='create an account' updateModal={props.updateModal}>
      <form className="auth-form" onSubmit={(e) => {
        props.handleRegister(e, registerData)
        props.updateModal(prevModal => ({
          ...prevModal,
          createanaccount: false
        }))
      }}>
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
        <button type="submit">Enter</button>
      </form>
    </ModalLayout>
  )
}
