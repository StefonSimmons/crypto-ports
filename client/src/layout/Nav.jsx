import React from "react"

export default function Nav(props) {
  const { signup, signin } = props.auth

    // const authenticated = (
  //   <nav className="links-lin">
  //     <p onClick={() => {
  //       props.updateModal(prevModal => ({
  //         ...prevModal,
  //         port: true
  //       }))
  //     }}>Ports</p>
  //     <p onClick={() => {
  //       props.updateModal(prevModal => ({
  //         ...prevModal,
  //         asset: true
  //       }))
  //     }}>Add Asset</p>
  //     <p>Stefon</p>
  //     <p>Logout</p>
  //   </nav>
  // )

  const unauthenticated = (
    <nav className="btns-lout">
      <button
        onClick={() => props.setAuth(prev => ({ ...prev, signup:true }) )}
      >Sign-up</button>
      <button>Sign-in</button>
    </nav>
  )
  
  return (
    <>
      {unauthenticated}
      {/* {authenticated} */}
    </>
  )
}
