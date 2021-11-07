import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/imgs/moon-transparent.png'
import Nav from './Nav'
import SignupForm from './SignupForm'

export default function Header(props) {
  const [auth, setAuth] = useState({
    signup: false,
    signin: false
  })

  return (
    <header>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>

      {
          auth.signup ?
          <SignupForm
            setAuth={setAuth}
            handleRegister={props.handleRegister}
          />
          :
          <Nav
            updateModal={props.updateModal}
            auth={auth}
            setAuth={setAuth}
          />
      }
    </header>
  )
}
