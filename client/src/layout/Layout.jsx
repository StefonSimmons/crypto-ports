import Header from "./Header";

export default function Layout(props) {


  return (
    <>
      <Header updateModal={props.updateModal} handleRegister={props.handleRegister} handleLogout={props.handleLogout}/>
      {props.children}
      <div className="layout-bg-circle"></div>
    </>
  )
}
