import { useContext } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import HeaderImage from "../components/HeaderImage"
import NoticesComp from "../components/NoticesComp"
import ValidateLogin from "../components/ValidateLogin"
import { DataContextLogin } from "../context/Context"

export default function Notices() {

  const {dataUser} = useContext(DataContextLogin)

  return (
    <>
      <ValidateLogin>
        <Header/>
        <HeaderImage/>
        <NoticesComp/>
        <Footer/>
      </ValidateLogin>
    </>
  )
}
