import { useContext } from "react"
import { UserContext } from "../App"

export default function Nav(props) {

  const user = useContext(UserContext);


  return (
    <>
      {
        user ?
          props.authenticated
          :
          props.unauthenticated
      }
    </>
  )
}
