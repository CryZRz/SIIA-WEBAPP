import { useState, useEffect } from "react";
import { clientAuthFetch } from "../../helpers/fetching/clientFecth";
import { DataCourseKardexStudentIn } from "../../Interfaces/Kardex/dataKardex";
import LoadingSection from "../LoadingSection";
import TableCardKardexStudent from "../TableCardKardexStudent";
import AddCourseStudentMenu from "./AddCourseStudentMenu";
import LiKardexStudent from "./LiKardexStudent";

export default function UserInfoStudent({id}: {id: string}) {
  const [saveKardex, setSaveKardex] = useState<DataCourseKardexStudentIn[]>([]);
  const [loadKardexUser, setloadKardexUser] = useState(false);
  const [showModalAddCourse, setShowModalAddCourse] = useState(false);

  async function getInfoStudent() {
    setloadKardexUser(false);
      try {
        const reqInfoUser = await clientAuthFetch.get(`/api/admin/user/${id}/courses`);
        console.log(reqInfoUser)
        setSaveKardex(reqInfoUser.data);
        setloadKardexUser(true);
    } catch (e) {
      console.log(e)
      alert(e)
    }
  }

  useEffect(() => {
    getInfoStudent()
  }, []);

  return (
    <div className="w-11/12 mx-auto">
        {
          loadKardexUser ? 
          <>
            {
              showModalAddCourse && (
                <AddCourseStudentMenu
                  showMenu={showModalAddCourse}
                  setShowMenu={setShowModalAddCourse}
                  userId={id}
                />
              )
            }
            <div className="mt-8">
              <button 
                className="bg-orangeLight py-2 text-white w-full font-bold text-base"
                onClick={e => {setShowModalAddCourse(true)}}
              >
                Agregar curso
              </button>
            </div>
            <TableCardKardexStudent>
              <LiKardexStudent
                reloadDataUser={getInfoStudent}
                listSubjects={saveKardex}
              />
            </TableCardKardexStudent>
          </>
        :
        <LoadingSection/>
        }
    </div>
  )
}
