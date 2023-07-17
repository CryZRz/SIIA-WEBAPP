import UserComp from '../../components/adminComponents/UserComp'
import ValidateAdmin from '../../components/adminComponents/ValidateAdmin'
import Header from '../../components/Header'
import HeaderImage from '../../components/HeaderImage'
import ValidateLogin from '../../components/ValidateLogin'

export default function User() {

  return (
    <ValidateLogin>
        <ValidateAdmin>
            <Header/>
            <HeaderImage/>
            <UserComp/>
        </ValidateAdmin>
    </ValidateLogin>
  )
}
