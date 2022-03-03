import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/imgs/moon-transparent.png'
import HamburgerMenu from './HamburgerMenu'
import Nav from './Nav'
import { useContext } from "react"
import { UserContext } from "../App"

export default function Header(props) {

  const [logoutHovered, setLOHover] = useState(false)

  const user = useContext(UserContext);

  const [isOpen, setOpen] = useState(false)

  const authenticated = (
    <nav className="links-lin">
      <p onClick={() => {
        props.updateModal(prevModal => ({
          ...prevModal,
          ports: true
        }))
        setOpen(false)
      }}>Ports</p>
      <p onClick={() => {
        props.updateModal(prevModal => ({
          ...prevModal,
          asset: true
        }))
        setOpen(false)
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
          createanaccount: true
        }))
      }}><span className="material-icons">
      lock
      </span>Ports</p>
      <p onClick={() => {
        props.updateModal(prevModal => ({
          ...prevModal,
          createanaccount: true
        }))
      }}><span className="material-icons">
      lock
      </span>Add Asset</p>
      <p
        className="auth"
        onClick={() => {
          props.updateModal(prevModal => ({
            ...prevModal,
            signin: true
          }))
        }}
      >Sign in</p>
      <p
        className="auth"
        onClick={() => {
          props.updateModal(prevModal => ({
            ...prevModal,
            createanaccount: true
          }))
        }}
      >Get Started</p>
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
      <HamburgerMenu
        unauthenticated={unauthenticated}
        authenticated={authenticated}
        isOpen={isOpen}
        setOpen={setOpen}
      />
    </header>
  )
}
