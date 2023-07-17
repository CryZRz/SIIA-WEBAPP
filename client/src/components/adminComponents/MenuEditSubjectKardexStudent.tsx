import axios from "axios";
import { useContext, useState } from "react";
import { DataContextLogin } from "../../context/Context";
import { clientAuthFetch } from "../../helpers/fetching/clientFecth";
import { getCookie } from "../../helpers/getCookie";
import { DataCourseIn } from "../../Interfaces/Course/dataCourse";
import { DataCourseKardexStudentIn, EditCourseStudinbgKardexIn } from "../../Interfaces/Kardex/dataKardex";
import { KardexSubjectIn } from "../../Interfaces/KardexSubjectIn";
import { CourseIn, SubjectStudentIn } from "../../Interfaces/SubjectIn";
import CardProfileLi from "../CardProfileLi";
import Modal from "../Modal";
import MenuListCourses from "./MenuListCourses";
import TableCourse from "./TableCourse";

export default function MenuEditSubjectKardexStudent({
    showMenu,
    setShowMenu,
    zindex,
    subjectEdit,
    reloadData
} : {
    showMenu: boolean;
    setShowMenu: (p: boolean) => void;
    zindex?: string;
    subjectEdit: DataCourseKardexStudentIn;
    reloadData: () => void
}) {

    const {setIsLoading} = useContext(DataContextLogin)

    const [saveOldSubject, setSaveOldSubject] = useState<EditCourseStudinbgKardexIn | null>(null);
    const [saveNewSubject, setSaveNewSubject] = useState<DataCourseIn | null>(null);
    const token = getCookie("token")

      function addNewSubject(coruse: DataCourseIn) {
        if (
          saveOldSubject != null &&
          saveOldSubject.opportunity > 1 &&
          saveOldSubject.subject.id != coruse.subject.id
        ) {
          return alert(
            "No puedes agregar materias distintas a la principal en segunda oportunidad"
          );
        }

        if (
          saveOldSubject != null &&
          saveOldSubject.opportunity == 1 &&
          subjectEdit.ratings.length > 1 
        ) {
          return alert(
            "No puedes cambiar la materia principal cuadno tiene mas de 1 oportunidad. Si deseas cambiarla borra las materias en oportunidad mayores a 1 de la materia"
          );
        }

        if (
          saveOldSubject != null &&
          saveOldSubject.opportunity > 1 &&
          subjectEdit.ratings.length > 1 && 
          coruse.typeOfGroup != "REGULARIZACION"
        ) {
          return alert(
            "Debes agregar un curso de regularizacion"
          );
        }

        return setSaveNewSubject(coruse);
      }

    async function sendChangesSubjects() {
      if (saveOldSubject == null || saveNewSubject == null) {
        return alert("No puedes hacer cambios vacios agrega materias");
      }
      try {
        //setIsLoading(false)
        const r = await clientAuthFetch.put(
          `/api/admin/user/${subjectEdit.ratings[0].student.id}/courses`,
          {
            oldCourse: saveOldSubject.id,
            newCourse: saveNewSubject.id,
          },
        );
        return console.log(r)
        setIsLoading(true)
        alert("Cambio hecho correctamente");
        return reloadData()
      } catch (e) {
        //etIsLoading(false)
        console.log(e)
        return alert(e);
      }
    }

    return (
      <Modal
        title="Editar curso"
        setShowModal={setShowMenu}
        showModal={showMenu}
        actionModal={sendChangesSubjects}
        zindex={zindex != undefined ? zindex : "10"}
        width="w-4/5"
      >
        <div>
          <div className="w-full bg-oceanBlue text-white text-xl p-1 rounded-t-md">
            Materia seleccionada
          </div>
          <TableCourse>
            {subjectEdit.ratings.map((r) => {
              /*Table courses of student per subject*/

              function addOldSubject() {
                if (
                  saveNewSubject != null &&
                  r.opportunity > 1 &&
                  saveNewSubject.subject.id != subjectEdit.clave
                ) {
                  return alert(
                    "No puedes agregar materias distintas a la principal en segunda oportunidad"
                  );
                }

                if (r.opportunity == 1 && subjectEdit.ratings.length > 1) {
                  return alert(
                    "No puedes cambiar la materia principal cuadno tiene mas de 1 oportunidad." +
                    " Si deseas cambiarla borra las materias en oportunidad mayores a 1 de la materia"
                  );
                }

                return setSaveOldSubject({
                  courseId: r.course.id,
                  credits: subjectEdit.credits,
                  opportunity: r.opportunity,
                  period: r.course.period,
                  student: r.student,
                  team: r.course.team,
                  teacher: r.course.teacher,
                  id: r.id,
                  subject: r.course.subject,
                  typeOfGroup: r.course.typeOfGroup
                });
              }

              return (
                <tr
                  onClick={addOldSubject}
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
          <div className="w-full bg-oceanBlue text-white text-xl p-1 rounded-t-md">
            Materia anterior
          </div>
          <TableCourse>
            {saveOldSubject != null ? (
              <tr>
                <td>{saveOldSubject.courseId}</td>
                <td>{saveOldSubject.subject.name}</td>
                <td>{saveOldSubject.credits}</td>
                <td>
                  {saveOldSubject.teacher != null ? (
                    <CardProfileLi
                      id={saveOldSubject.teacher.id}
                      name={saveOldSubject.teacher.name}
                      lastName={saveOldSubject.teacher.lastName}
                      image={saveOldSubject.teacher.image}
                    />
                  ) : (
                    <span>El maestro esta por asignarse</span>
                  )}
                </td>
                <td>{saveOldSubject.team.name}</td>
                <td>{saveOldSubject.typeOfGroup}</td>
                <td>{saveOldSubject.period.name}</td>
              </tr>
            ) : (
              <tr>No se ha seleccionado materia</tr>
            )}
          </TableCourse>
          <div className="w-full bg-oceanBlue text-white text-xl p-1 rounded-t-md">
            Materia nueva
          </div>
          <TableCourse>
            {saveNewSubject != null ? (
              <tr>
                <td>{saveNewSubject.id}</td>
                <td>{saveNewSubject.subject.name}</td>
                <td>{saveNewSubject.subject.credits}</td>
                <td>
                  {saveNewSubject.teacher != null ? (
                    <CardProfileLi
                      id={saveNewSubject.teacher.id}
                      name={saveNewSubject.teacher.name}
                      lastName={saveNewSubject.teacher.lastName}
                      image={saveNewSubject.teacher.image}
                    />
                  ) : (
                    <span>El maestro esta por asignarse</span>
                  )}
                </td>
                <td>{saveNewSubject.team.name}</td>
                <td>{saveNewSubject.typeOfGroup}</td>
                <td>{saveNewSubject.period.name}</td>
              </tr>
            ) : (
              <tr>No se ha seleccionado materia</tr>
            )}
          </TableCourse>
          <div className="w-full bg-oceanBlue text-white text-xl p-1 rounded-t-md">
            Lista de cursos
          </div>
            <MenuListCourses
                action={addNewSubject}
            />
        </div>
      </Modal>
    );
  }

