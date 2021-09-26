import Nav from "./Nav";

export default function Layout(props) {
  return (
    <>
      <Nav updateAssetModal={props.updateAssetModal} />
      {props.children}
    </>
  )
}
