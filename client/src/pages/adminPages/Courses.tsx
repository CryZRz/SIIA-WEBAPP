import ListCourses from '../../components/adminComponents/ListCourses'
import ValidateAdmin from '../../components/adminComponents/ValidateAdmin'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import HeaderImage from '../../components/HeaderImage'
import ValidateLogin from '../../components/ValidateLogin'

export default function Courses() {
  return (
    <ValidateLogin>
        <ValidateAdmin>
            <Header/>
            <HeaderImage/>
            <ListCourses/>
            <Footer/>
        </ValidateAdmin>
    </ValidateLogin>
  )
}
