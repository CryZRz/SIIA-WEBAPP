import Footer from '../components/Footer'
import Header from '../components/Header'
import HeaderImage from '../components/HeaderImage'
import NavegationMenu from '../components/NavegationMenu'
import ValidateLogin from '../components/ValidateLogin'

export default function Menu() {
  return (
    <ValidateLogin>
        <Header/>
        <HeaderImage/>
        <NavegationMenu/>
        <Footer/>
    </ValidateLogin>
  )
}
