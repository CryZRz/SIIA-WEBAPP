import ListSubjectsAdmin from '../../components/adminComponents/ListSubjectsAdmin'
import ValidateAdmin from '../../components/adminComponents/ValidateAdmin'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import HeaderImage from '../../components/HeaderImage'
import ValidateLogin from '../../components/ValidateLogin'

export default function Subjects() {
  return (
    <ValidateLogin>
        <ValidateAdmin>
            <Header/>
            <HeaderImage/>
            <ListSubjectsAdmin/>
            <Footer/>
        </ValidateAdmin>
    </ValidateLogin>
  )
}
