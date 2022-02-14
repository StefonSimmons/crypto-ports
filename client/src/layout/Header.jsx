import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/imgs/moon-transparent.png'
// import HamburgerMenu from './HamburgerMenu'
import Nav from './Nav'
import SigninForm from './SigninForm'
import SignupForm from './SignupForm'

import { useContext } from "react"
import { UserContext } from "../App"

export default function Header(props) {
  const [auth, setAuth] = useState({
    signup: false,
    signin: false
  })

  const [isOpen, setOpen] = useState(false)

  const user = useContext(UserContext);


  const authenticated = (
    <nav className="links-lin">
      <p onClick={() => {
        props.updateModal(prevModal => ({
          ...prevModal,
          port: true
        }))
        setOpen(prev => prev && !prev)
      }}>Ports</p>
      <p onClick={() => {
        props.updateModal(prevModal => ({
          ...prevModal,
          asset: true
        }))
        setOpen(prev => prev && !prev)
      }}>Add Asset</p>
      <p className="username">{user?.username}</p>
      <p onClick={() => props.handleLogout()}>Logout</p>
    </nav>
  )

  const unauthenticated = (
    <nav className="btns-lout">
      <button
        onClick={() => {
          setAuth(prev => ({ ...prev, signup: true }))
        }}
      >Sign-up</button>
      <button
        onClick={() => {
          setAuth(prev => ({ ...prev, signin: true }))
        }}
      >Sign-in</button>
    </nav>
  )


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
          auth.signin ?
            <SigninForm
              setAuth={setAuth}
              handleLogin={props.handleLogin}
            />
            :
            <>
              <Nav
              unauthenticated={unauthenticated}
              authenticated={authenticated}
              // handleLogout={props.handleLogout}
              // updateModal={props.updateModal}
              // setAuth={setAuth}
              />
              {/* <HamburgerMenu
                unauthenticated={unauthenticated}
                authenticated={authenticated}
                isOpen={isOpen}
                setOpen={setOpen}
              /> */}
            </>
      }
    </header>
  )
}
