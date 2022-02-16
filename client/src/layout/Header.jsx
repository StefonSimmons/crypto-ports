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
          port: true
        }))
        setOpen(prev => !prev)
      }}>Ports</p>
      <p onClick={() => {
        props.updateModal(prevModal => ({
          ...prevModal,
          asset: true
        }))
        setOpen(prev => !prev)
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
      <p
        className="auth"
        onClick={() => {
          props.updateModal(prevModal => ({
            ...prevModal,
            signup: true
          }))
        }}
      >Sign-up</p>
      <p
        className="auth"
        onClick={() => {
          props.updateModal(prevModal => ({
            ...prevModal,
            signin: true
          }))
        }}
      >Sign-in</p>
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
