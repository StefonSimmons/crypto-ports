import Nav from "./Nav";

export default function Layout(props) {
  return (
    <>
      <Nav />
      {props.children}
    </>
  )
}
