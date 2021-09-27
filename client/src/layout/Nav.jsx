import { Link } from 'react-router-dom'
import logo from '../assets/imgs/moon-transparent.png'

export default function Nav(props) {


  const authenticated = (
    <div className="links-lin">
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
      <p>Stefon</p>
      <p>Logout</p>
    </div>
  )

  // const unauthenticated = (
  //   <div className="links-lout">
  //     <Link to="/sign-up">Sign-up</Link>
  //     <Link to="/sign-in">Sign-in</Link>
  //   </div>
  // )

  return (
    <nav>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      {/* {unauthenticated} */}
      {authenticated}
    </nav>
  )
}
