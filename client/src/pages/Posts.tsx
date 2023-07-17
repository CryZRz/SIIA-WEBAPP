import { useContext } from "react";
import CreatePost from "../components/CreatePost";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeaderImage from "../components/HeaderImage";
import ListPosts from "../components/ListPosts";
import ValidateLogin from "../components/ValidateLogin";
import { DataContextLogin } from "../context/Context";

export default function Posts() {

  const {dataUser} = useContext(DataContextLogin)

  return (
    <>
    <ValidateLogin>
      <Header/>
      <HeaderImage/>
      <CreatePost/>
      <ListPosts/>
      <Footer/>
    </ValidateLogin>
    </>
  )
}
