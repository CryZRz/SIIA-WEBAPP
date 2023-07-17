import SchedulesComp from "../../components/adminComponents/SchedulesComp";
import ValidateAdmin from "../../components/adminComponents/ValidateAdmin";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderImage from "../../components/HeaderImage";
import ValidateLogin from "../../components/ValidateLogin";

export default function Schedules() {
  return (
    <ValidateLogin>
        <ValidateAdmin>
            <Header/>
            <HeaderImage/>
            <SchedulesComp/>
            <Footer/>
        </ValidateAdmin>
    </ValidateLogin>
  )
}
