import { DataContextLogin } from "../context/Context";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../components/Header";
import CardProfile from "../components/CardProfile";
import CardEditProfile from "../components/CardEditProfile";
import Loading from "../components/Loading";
import { DataUserIn } from "../Interfaces/User/dataUser";
import { dataDefaultUse } from "../helpers/dataDeafult/User/userDataDefault";
import { clientAuthFetch } from "../helpers/fetching/clientFecth";

export default function Profile() {
  const { dataUser, isLoading, err, updateInfo } = useContext(DataContextLogin);

  const navigate = useNavigate();
  const { id } = useParams();

  const [dataSearchUser, setDataSearchUser] = useState<DataUserIn>(dataDefaultUse);
  const [loadDataUser, setLoadDataUser] = useState(false);
  const [showMenuEditProfile, setShowMenuEditProfile] = useState(false);
  const [notExistUserErr, setNotExistUserErr] = useState("")

  useEffect(() => {
    if (err) {
      navigate("/");
    }
  }, [err]);

  useEffect(() => {
    async function searchUser() {
      try {
        const reqSearchUser = await clientAuthFetch.get(`/api/user/${id}`);
        console.log(reqSearchUser)
        setDataSearchUser(reqSearchUser.data.data);
        setLoadDataUser(true)
      } catch (e : any) {
        setLoadDataUser(true)
        if (e.response.status == 404) {
          setNotExistUserErr("El usuario que intentas buscar no existe")
        }else{
          setNotExistUserErr("Error de servidor")
        }
      }
    }

    searchUser();
  }, []);

  return (
    <>
      {isLoading && loadDataUser ? (
        <>
          <Header/>
          <div className="profile-user-container">
            {
              notExistUserErr != "" ?
              <h1>{notExistUserErr}</h1>
              :
              showMenuEditProfile ? (
                <CardEditProfile
                  userId={dataSearchUser.id}
                  image={dataSearchUser.image}
                  name={dataSearchUser.name}
                  lastName={dataSearchUser.lastName}
                  role={dataSearchUser.role.name}
                  team={dataSearchUser?.team?.name}
                  description={dataSearchUser.profile.description ?? ""}
                  email={dataSearchUser.email}
                  btnEditProfile={setShowMenuEditProfile}
                  linkFacebook={""}
                  linkInstagram={""}
                  linkTwitter={""}
                  updateInfo={updateInfo}
                />
              ) : (
                <CardProfile
                  userId={dataUser.id}
                  profileId={dataSearchUser?.id}
                  image={dataSearchUser.image}
                  name={dataSearchUser.name}
                  lastName={dataSearchUser.lastName}
                  role={dataSearchUser.role.name}
                  team={dataSearchUser?.team?.name}
                  description={dataSearchUser.profile.description ?? ""}
                  email={dataSearchUser.email}
                  btnEditProfile={setShowMenuEditProfile}
                  linkFacebook={""}
                  linkInstagram={""}
                  linkTwitter={""}
                />
              )
            }
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
