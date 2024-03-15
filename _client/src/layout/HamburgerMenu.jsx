import { Sling as Hamburger } from 'hamburger-react'
import { useContext, useState, useEffect } from "react"
import { UserContext } from "../App"

export default function HamburgerMenu(props) {

  const user = useContext(UserContext);

  // code reference from https://thewebdev.info/2021/05/26/how-to-get-the-viewport-or-window-height-in-react/
  // watch width resize
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    // clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // end of reference

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
      <div className={`hamburger-menu ${props.isOpen && windowWidth < 768 ? `opened` : 'closed'}`}>
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
