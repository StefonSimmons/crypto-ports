import { useContext } from "react"
import { UserContext } from "../App"

export default function Nav(props) {

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
      <p className="username">{user?.username}</p>
      <p onClick={() => props.handleLogout()}>Logout</p>
    </nav>
  )

  const unauthenticated = (
    <nav className="btns-lout">
      <button
        onClick={() => {
          props.setAuth(prev => ({ ...prev, signup: true }))
        }}
      >Sign-up</button>
      <button
        onClick={() => {
          props.setAuth(prev => ({ ...prev, signin: true }))
        }}
      >Sign-in</button>
    </nav>
  )

  return (
    <>
      {
        user ?
          authenticated
          :
          unauthenticated
      }
    </>
  )
}
