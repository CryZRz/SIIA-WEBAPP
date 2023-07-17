import { useState } from "react";
import TypesOfGroupEnum from "../../enums/TypesOfGroup";
import { dataDefaultCourse } from "../../helpers/dataDeafult/Course/dataDefaultCourse";
import { clientAuthFetch } from "../../helpers/fetching/clientFecth";
import { DataCourseIn } from "../../Interfaces/Course/dataCourse";
import CardProfileLi from "../CardProfileLi";
import Modal from "../Modal";
import AddCourse from "./AddCourse";
import TableCourse from "./TableCourse";

export default function AddCourseStudentMenu({
  showMenu,
  setShowMenu,
  userId
}: {
  showMenu: boolean;
  setShowMenu: (p: boolean) => void;
  userId: string
}) {

  const [saveAddCourse, setSaveAddCourse] = useState<DataCourseIn>(dataDefaultCourse);

  function addCourse(course: DataCourseIn) {
    setSaveAddCourse(course);
  }

  async function sendAddCourse(){
    if (saveAddCourse.id != 0 && saveAddCourse.typeOfGroup == TypesOfGroupEnum[0]) {
      try {
        await clientAuthFetch.post(`/api/admin/courses/${saveAddCourse.id}/${userId}`)
        return alert("Curso agregado correcatmete")
      } catch (e) {
        console.log(e)
        return alert(`Ocurrio un error ${e}`)
      }
    }

    alert("No has seleccionado un curso o has elegido un curso de REGULARIZACION")
  }

  return (
    <Modal
      title="Agregar curso"
      width="w-3/4"
      showModal={showMenu}
      setShowModal={setShowMenu}
      zindex="10"
      actionModal={sendAddCourse}
    >
      <TableCourse>
        <tr className="text-center w-full ">
          <td className="p-2">{saveAddCourse.id}</td>
          <td className="p-2">{saveAddCourse.subject.name}</td>
          <td className="p-2">{saveAddCourse.subject.credits}</td>
          <td className="p-2">
            {saveAddCourse.teacher != null ? (
              <CardProfileLi
                id={saveAddCourse.teacher.id}
                name={saveAddCourse.teacher.name}
                lastName={saveAddCourse.teacher.lastName}
                image={saveAddCourse.teacher.image}
              />
            ) : (
              <span>El maestro esta por asignarse</span>
            )}
          </td>
          <td className="p-2">{saveAddCourse.team.name}</td>
          <td className="p-2">{saveAddCourse.typeOfGroup}</td>
          <td className="p-2">{saveAddCourse.period.name}</td>
        </tr>
      </TableCourse>
      <AddCourse actionAddCourse={addCourse} />
    </Modal>
  );
}
