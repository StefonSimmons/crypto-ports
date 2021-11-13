import { Sling as Hamburger } from 'hamburger-react'
import { useState } from 'react'

export default function HamburgerMenu() {

  const [isOpen, setOpen] = useState(false)

  return (
    <div className="hamburger">
      <div className="hamburger-icon">
        <Hamburger
          color="#222222"
          duration={0.8}
          easing="ease-in"
          label="Show menu"
          rounded
          toggled={isOpen}
          toggle={setOpen}
          />
      </div>
      <div className={`hamburger-menu ${isOpen ? 'opened' : 'closed'}`}>

      </div>
    </div>
  )
}
