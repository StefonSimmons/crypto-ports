import Header from "./Header";

export default function Layout(props) {


  return (
    <>
      <Header updateModal={props.updateModal} />
      {props.children}
      <div className="layout-bg-circle"></div>
    </>
  )
}
