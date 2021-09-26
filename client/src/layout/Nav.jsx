// import { Link } from 'react-router-dom'

import { useState } from "react"

export default function Nav(props) {


  const authenticated = (
    <div className="links-lin">
      <p>Ports</p>
      <p onClick={() => props.updateAssetModal(true)}>Add Asset</p>
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
      {/* {unauthenticated} */}
      {authenticated}
    </nav>
  )
}
