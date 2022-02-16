import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/imgs/moon-transparent.png'
// import HamburgerMenu from './HamburgerMenu'
import Nav from './Nav'
import { useContext } from "react"
import { UserContext } from "../App"

export default function Header(props) {

  const [logoutHovered, setLOHover] = useState(false)

  const user = useContext(UserContext);


  const authenticated = (
    <nav className="links-lin">
      <p onClick={() => {
        props.updateModal(prevModal => ({
          ...prevModal,
          port: true
        }))
      }}>Ports</p>
      <p onClick={() => {
        props.updateModal(prevModal => ({
          ...prevModal,
          asset: true
        }))
      }}>Add Asset</p>

      {
        logoutHovered ?
        <p className="user" onMouseLeave={() => setLOHover(false)} onClick={() => props.handleLogout()}>Logout</p>
        :
        <p className="user" onMouseEnter={() => setLOHover(true)}>{user?.username}</p>
      }
    </nav>
  )

  const unauthenticated = (
    <nav className="links-lin">
      <p onClick={() => {
        props.updateModal(prevModal => ({
          ...prevModal,
          port: true
        }))
      }}>Ports</p>
      <p onClick={() => {
        props.updateModal(prevModal => ({
          ...prevModal,
          asset: true
        }))
      }}>Add Asset</p>
      <button
        onClick={() => {
          props.updateModal(prevModal => ({
            ...prevModal,
            signup: true
          }))
        }}
      >Sign-up</button>
      <button
        className="user"
        onClick={() => {
          props.updateModal(prevModal => ({
            ...prevModal,
            signin: true
          }))
        }}
      >Sign-in</button>
    </nav>
  )


  return (
    <header>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <Nav
        unauthenticated={unauthenticated}
        authenticated={authenticated}
      />    

      {/* {
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
              <HamburgerMenu
                unauthenticated={unauthenticated}
                authenticated={authenticated}
                isOpen={isOpen}
                setOpen={setOpen}
              />
            </>
      } */}
    </header>
  )
}
