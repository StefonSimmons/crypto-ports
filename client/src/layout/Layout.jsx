import Header from "./Header";

export default function Layout(props) {


  return (
    <>
      <Header
        updateModal={props.updateModal}
        handleRegister={props.handleRegister}
        handleLogout={props.handleLogout}
        handleLogin={props.handleLogin}
      />
      {props.children}
      <div className="layout-bg-circle"></div>
    </>
  )
}
