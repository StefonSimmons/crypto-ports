import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <nav>
      <Link to="sign-up">Sign-up</Link>
      <Link to="sign-in">Sign-in</Link>
    </nav>
  )
}
