import { useContext } from "react";
import EventsComp from "../components/EventsComp";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeaderImage from "../components/HeaderImage";
import ListEventsSchool from "../components/ListEventsSchool";
import ValidateLogin from "../components/ValidateLogin";
import { DataContextLogin } from "../context/Context";

export default function Events() {

  const {dataUser} = useContext(DataContextLogin)

  return (
    <ValidateLogin>
        <Header/>
        <HeaderImage/>
        <EventsComp/>
        <Footer/>
    </ValidateLogin>
  )
}
