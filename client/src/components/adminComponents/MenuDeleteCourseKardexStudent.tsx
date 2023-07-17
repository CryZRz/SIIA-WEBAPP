import {useContext, useState} from "react";
import { DataContextLogin } from "../../context/Context";
import { clientAuthFetch } from "../../helpers/fetching/clientFecth";
import { DataCourseKardexStudentIn, DataRaitingCourseKardexStudentIn } from "../../Interfaces/Kardex/dataKardex";
import CardProfileLi from "../CardProfileLi";
import Modal from "../Modal";
import TableCourse from "./TableCourse";

export default function MenuDeleteCourseKardexStudent({
    showMenu,
    setShowMenu,
    zindex,
    subjectEdit,
    reloadData
}: {
    showMenu: boolean;
    setShowMenu: (p: boolean) => void;
    zindex?: string;
    subjectEdit: DataCourseKardexStudentIn;
    reloadData: () => void
}) {
    
    const {setIsLoading} = useContext(DataContextLogin)

  const [saveDeleteSubject, setSaveDeleteSubject] = useState<DataRaitingCourseKardexStudentIn | null>(null);

  async function deteleCourseStudent() {
    if (saveDeleteSubject == null) {
      return alert("Debes elegir una materia para borrar");
    }
    try {
    setIsLoading(false)
      await clientAuthFetch.delete(`/api/admin/courses/${saveDeleteSubject.id}`);
      setIsLoading(true)
      alert("Materia elimada correctamente");
      return reloadData();
    } catch (e) {
        setIsLoading(false)
      return alert(e);
    }
  }

  return (
    <Modal
      showModal={showMenu}
      setShowModal={setShowMenu}
      actionModal={deteleCourseStudent}
      title="Eliminar materias"
      zindex={zindex != undefined ? zindex : "10"}
      width="w-4/5"
    >
      <div>
        <TableCourse>
          {subjectEdit.ratings.map((r) => {
            /*Table courses of student per subject*/

            function addDeleteSubject() {
              if (r.opportunity < subjectEdit.ratings.length) {
                return alert(
                  "No puedes borrar la primera oportunidad cuando hay mas de 1 oportunidad"
                );
              }

              return setSaveDeleteSubject(r);
            }

            return (
              <tr
                onClick={addDeleteSubject}
                className="hover:bg-orangeLight cursor-pointer"
                key={r.id}
              >
                <td className="p-2">{r.course.id}</td>
                <td className="p-2">{subjectEdit.subject}</td>
                <td className="p-2">{subjectEdit.credits}</td>
                <td className="p-2">
                  {r.course.teacher != null ? (
                    <CardProfileLi
                      id={r.course.teacher.id}
                      name={r.course.teacher.name}
                      lastName={r.course.teacher.lastName}
                      image={r.course.teacher.image}
                    />
                  ) : (
                    <span>El maestro esta por asignarse</span>
                  )}
                </td>
                <td className="p-2">{r.course.team.name}</td>
                <td className="p-2">{r.course.typeOfGroup}</td>
                <td className="p-2">{r.course.period.name}</td>
              </tr>
            );
          })}
        </TableCourse>
        <TableCourse>
          {saveDeleteSubject != null ? (
            <tr>
              <td className="p-2">{saveDeleteSubject.course.id}</td>
              <td className="p-2">{subjectEdit.subject}</td>
              <td className="p-2">{subjectEdit.credits}</td>
              <td>
                {saveDeleteSubject.course.teacher != null ? (
                  <CardProfileLi
                      id={saveDeleteSubject.course.teacher.id}
                      name={saveDeleteSubject.course.teacher.name}
                      lastName={saveDeleteSubject.course.teacher.lastName}
                      image={saveDeleteSubject.course.teacher.image}
                    />
                ) : (
                  <span>El maestro esta por asignarse</span>
                )}
              </td>
              <td>{saveDeleteSubject.course.team.name}</td>
              <td>{saveDeleteSubject.course.typeOfGroup}</td>
              <td>{saveDeleteSubject.course.period.name}</td>
            </tr>
          ) : (
            <tr>No se ha seleccionado materia</tr>
          )}
        </TableCourse>
      </div>
    </Modal>
  );
}
