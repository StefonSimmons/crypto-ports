import { Sling as Hamburger } from 'hamburger-react'
import { useContext } from "react"
import { UserContext } from "../App"

export default function HamburgerMenu(props) {

  const user = useContext(UserContext);


  return (
    <>
      <div className="hamburger-icon">
        <Hamburger
          color="#222222"
          duration={0.8}
          easing="ease-in"
          label="Show menu"
          rounded
          toggled={props.isOpen}
          toggle={props.setOpen}
          />
      </div>
      <div className={`hamburger-menu ${props.isOpen ? 'opened' : 'closed'}`}>
        {
          user ?
            props.authenticated
            :
            props.unauthenticated
        }
      </div>
    </>
  )
}
