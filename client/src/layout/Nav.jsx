import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <nav>
      {/* <div className="links-lout">
        <Link to="/sign-up">Sign-up</Link>
        <Link to="/sign-in">Sign-in</Link>
      </div> */}
      <div className="links-lin">
        <Link to="/ports">Ports</Link>
        <Link to="/add-assets">Sign-in</Link>
        <p>Stefon</p>
        <p>Logout</p>
      </div>
    </nav>
  )
}
