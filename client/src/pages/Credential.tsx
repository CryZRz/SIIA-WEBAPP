import { useContext } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeaderImage from "../components/HeaderImage";
import UserCredential from "../components/UserCredential";
import ValidateLogin from "../components/ValidateLogin";
import { DataContextLogin } from "../context/Context";

export default function Credential() {

    const {dataUser} = useContext(DataContextLogin)

  return (
    <>
      <ValidateLogin>
        <Header/>
        <HeaderImage/>
        <UserCredential
          id={dataUser.id}
          name={dataUser.name}
          lastName={dataUser.lastName}
          image={dataUser.image}
        />
        <Footer/>
      </ValidateLogin>
    </>
  )
}
