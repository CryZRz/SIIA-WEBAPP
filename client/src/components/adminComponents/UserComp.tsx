import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RolesEnum from "../../enums/Role";
import { pathAPIImages } from "../../helpers/constants";
import { dataDefaultUse } from "../../helpers/dataDeafult/User/userDataDefault";
import { clientAuthFetch } from "../../helpers/fetching/clientFecth";
import { getCookie } from "../../helpers/getCookie";
import {KardexSubjectIn} from "../../Interfaces/KardexSubjectIn";
import { DataUserIn } from "../../Interfaces/User/dataUser";
import LoadingSection from "../LoadingSection";
import LiKardexStudent from "./LiKardexStudent";
import ListCourses from "./ListCourses";
import UserInfoStudent from "./UserInfoStudent";
import UserInfoTeacher from "./UserInfoTeacher";

export default function UserComp() {
  const [dataSearchUser, setDataSearchUser] = useState<DataUserIn>(dataDefaultUse);
  const [loadDataUser, setLoadDataUser] = useState(false);
  const { id } = useParams();
  const token = getCookie("token");

  useEffect(() => {
    async function getInfoUser() {
      try {
        const reqSearchUser = await clientAuthFetch.get(`api/user/${id}`);
        setDataSearchUser(reqSearchUser.data.data);
        setLoadDataUser(true);
      } catch (e) {
        alert(e);
      }
    }

    getInfoUser();
  }, []);
  
  return (
    <>
      {loadDataUser ? (
        <div className="w-full my-6">
          <div className="w-11/12 h-60 text-white flex mx-auto bg-oceanBlue p-4 reounded">
            <div className="w-1/4 h-36">
              <img
                className="w-full h-full rounded-full"
                src={`${pathAPIImages}/profiles/${dataSearchUser.image}`}
                alt={`image profile ${dataSearchUser.name}`}
              />
            </div>
            <div className="flex ml-2 flex-col h-60 justify-center">
              <div>
                <h1 className="text-2xl font-bold">
                  {dataSearchUser.name} {dataSearchUser.lastName}
                </h1>
              </div>
              <div>
                <h3>Id: {dataSearchUser.id}</h3>
              </div>
              <div>
                <h3>Email: {dataSearchUser.email}</h3>
              </div>
              <div>
                <h3>Grupo: {dataSearchUser.team.name}</h3>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingSection />
      )}
      {loadDataUser && id ? (
        dataSearchUser.role.name == RolesEnum[0] ? 
        <UserInfoStudent
          id={id}
        />
        :
        <ListCourses
          id={id}
        />
      ) : (
        <LoadingSection />
      )}
    </>
  );
}
