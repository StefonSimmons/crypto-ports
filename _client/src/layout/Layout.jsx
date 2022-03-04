import Header from "./Header";

export default function Layout(props) {


  return (
    <>
      <Header
        updateModal={props.updateModal}
        handleLogout={props.handleLogout}
        handleLogin={props.handleLogin}
        handleRegister={props.handleRegister}
      />
      {props.children}
      <footer style={{textAlign: "center"}}>&#169; StefonSimmons</footer>
      <div className="layout-bg-circle"></div>
    </>
  )
}
