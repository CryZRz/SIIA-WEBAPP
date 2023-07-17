import {useState, useEffect} from "react";
import { clientAuthFetch } from "../../helpers/fetching/clientFecth";
import { DataUserIn } from "../../Interfaces/User/dataUser";
import CardProfileLi from "../CardProfileLi";
import LoadingSection from "../LoadingSection";
import Pagination from "../Pagination";

export default function MenuListTeachers({action} : {action : (p : DataUserIn) => void}) {

  const [loadListTeachers, setLoadListTeachers] = useState(false);
  const [saveListTeachers, setSaveListTeachers] = useState<DataUserIn[]>([]);

  async function getListTeachers() {
    try {
      setLoadListTeachers(false);
      const listTeachers = await clientAuthFetch.get("/api/admin/teachers");
      setSaveListTeachers(listTeachers.data.data);
      setLoadListTeachers(true);
      console.log(listTeachers.data);
    } catch (e) {
      console.log(e)
      alert(e);
    }
  }

  useEffect(() => {
    getListTeachers();
  }, []);

  return (
    <div>
        <div className="border-2 border-oceanBlue">
            <div className="w-full bg-oceanBlue text-white font-bold text-center">
              <span>Maestros</span>
            </div>
            {loadListTeachers ? (
              saveListTeachers.map((t) => {

                function addTeacher() {
                    action(t);
                }

                return (
                  <div
                    key={t.id}
                    className="hover:bg-orangeLight cursor-pointer"
                    onClick={addTeacher}
                  >
                    <CardProfileLi
                      id={t.id}
                      name={t.name}
                      lastName={t.lastName}
                      image={t.image}
                    />
                  </div>
                );
              })
            ) : (
              <LoadingSection />
            )}
          </div>
          <Pagination
            start={0}
            end={10}
            fetchingData={getListTeachers}
            isLoading={!loadListTeachers}
          />
    </div>
  )
}
