import { useContext } from "react";
import Header from "../components/Header";
import HeaderImage from "../components/HeaderImage";
import KardexStudent from "../components/KardexStudent";
import KardexTeacher from "../components/KardexTeacher";
import ValidateLogin from "../components/ValidateLogin";
import { DataContextLogin} from "../context/Context"
import RolesEnum from "../enums/Role";

export default function Proceedings() {

  const {dataUser} = useContext(DataContextLogin)

  return (
    <>
      <ValidateLogin>
        <Header/>
        <HeaderImage/>
        {
          dataUser.role.name == RolesEnum[1] ?
          <KardexTeacher/>
          :
          <KardexStudent/>
        }
      </ValidateLogin>
    </>
  )
}
