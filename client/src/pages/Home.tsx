import Footer from "../components/Footer";
import Header from "../components/Header";
import HeaderImage from "../components/HeaderImage";
import HomeMenu from "../components/HomeMenu";
import ListEventsSchool from "../components/ListEventsSchool";
import NoticesPreview from "../components/NoticesPreview";
import PostsPreview from "../components/PostsPreview";
import ValidateLogin from "../components/ValidateLogin";

export default function Home() {

  return (
    <>
      <ValidateLogin>
        <Header/>
        <HeaderImage/>
        <NoticesPreview/>
        <HomeMenu/>
        <ListEventsSchool/>
        <PostsPreview/>
        <Footer/>
      </ValidateLogin>
    </>
  )
}
