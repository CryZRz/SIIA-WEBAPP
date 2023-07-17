import ListUsers from '../../components/adminComponents/ListUsers'
import ValidateAdmin from '../../components/adminComponents/ValidateAdmin'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import HeaderImage from '../../components/HeaderImage'
import ValidateLogin from '../../components/ValidateLogin'

export default function Users() {
  return (
    <>
        <ValidateLogin>
            <ValidateAdmin>
                <Header/>
                <HeaderImage/>
                <ListUsers/>
                <Footer/>
            </ValidateAdmin>
        </ValidateLogin>
    </>
  )
}
