import Nav from "./Nav";

export default function Layout(props) {
  return (
    <>
      <Nav updateModal={props.updateModal}/>
      {props.children}
    </>
  )
}
