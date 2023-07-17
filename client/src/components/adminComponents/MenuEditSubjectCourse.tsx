import { useState } from "react";
import { dataDefaultSubject } from "../../helpers/dataDeafult/Course/dataDefaultSubject";
import { clientAuthFetch } from "../../helpers/fetching/clientFecth";
import { DataCourseIn } from "../../Interfaces/Course/dataCourse";
import { DataSubjectIn } from "../../Interfaces/Subject/dataSubject";
import Modal from "../Modal";
import TableSubject from "../TableSubject";
import MenuListSubjects from "./MenuListSubjects";

export default function MenuEditSubjectCourse({
    courseEdit,
    showMenu,
    setShowMenu,
  }: {
    courseEdit: DataCourseIn;
    showMenu: boolean;
    setShowMenu: (p: boolean) => void;
  }) {

    const [saveSubjectEdit, setSaveSubjectEdit] = useState<DataSubjectIn>(dataDefaultSubject);

    async function updateSubject() {
      try {
        await clientAuthFetch.put(`/api/admin/courses/${courseEdit.id}/subject/${saveSubjectEdit.id}`);
        alert("Materia actulizada correctamente");
      } catch (e) {
        alert(e);
      }
    }

    function addSubject(subject: DataSubjectIn) {
      setSaveSubjectEdit(subject);
    }

    return (
      <Modal
        showModal={showMenu}
        setShowModal={setShowMenu}
        actionModal={updateSubject}
        title="Editar Maestro"
        width={null}
        zindex="20"
      >
        <div>
          <div className="w-full mb-4">
            <div className="w-full bg-oceanBlue text-white font-bold text-center">
              <span>Materia seleccionada</span>
            </div>
            <TableSubject>
              <tr>
                <td>{saveSubjectEdit.id}</td>
                <td>{saveSubjectEdit.name}</td>
                <td>{saveSubjectEdit.credits}</td>
              </tr>
            </TableSubject>
          </div>
          <MenuListSubjects
            action={addSubject}
          />
        </div>
      </Modal>
    );
  }