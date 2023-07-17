import Footer from "../components/Footer"
import Header from "../components/Header"
import HeaderImage from "../components/HeaderImage"
import UpsAndDownsComp from "../components/UpsAndDownsComp"
import ValidateLogin from "../components/ValidateLogin"

export default function UpsAndDowns() {

  return (
    <>
      <ValidateLogin>
        <Header/>
        <HeaderImage/>
        <UpsAndDownsComp/>
        <Footer/>
      </ValidateLogin>
    </>
  )
}
