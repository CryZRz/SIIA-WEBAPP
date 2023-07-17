import { useState } from "react";
import Modal from "../Modal";
import CardProfileLi from "../CardProfileLi";
import MenuListTeachers from "./MenuListTeachers";
import { DataCourseIn } from "../../Interfaces/Course/dataCourse";
import { DataUserIn } from "../../Interfaces/User/dataUser";
import { dataDefaultUse } from "../../helpers/dataDeafult/User/userDataDefault";
import { clientAuthFetch } from "../../helpers/fetching/clientFecth";

export default function MenuEditTeacherCourse({
    courseEdit,
    showMenu,
    setShowMenu,
  }: {
    courseEdit: DataCourseIn;
    showMenu: boolean;
    setShowMenu: (p: boolean) => void;
  }) {

    const [saveTeacherUpdate, setSaveTeacherUpdate] = useState<DataUserIn>(dataDefaultUse);

    async function updateTeacher() {
      try {
        await clientAuthFetch.put(
          `/api/admin/courses/${courseEdit.id}/teacher/${saveTeacherUpdate.id}`
        );
        alert("Maestro actulizada correctamente");
      } catch (e) {
        alert(e);
      }
    }

    function addTeacher(t : DataUserIn) {
      setSaveTeacherUpdate(t);
    }   
    
    return (
      <Modal
        showModal={showMenu}
        setShowModal={setShowMenu}
        actionModal={updateTeacher}
        title="Editar maestro"
        width={null}
        zindex="20"
      >
        <div>
          <div className="w-full mb-6 border-2 border-oceanBlue">
            <div className="w-full bg-oceanBlue text-white font-bold text-center">
              <span>Maestro seleccionado</span>
            </div>
            {saveTeacherUpdate ? (
              <CardProfileLi
                id={saveTeacherUpdate.id}
                name={saveTeacherUpdate.name}
                lastName={saveTeacherUpdate.lastName}
                image={saveTeacherUpdate.image}
              />
            ) : (
              <span>El maestro esta por asignarse</span>
            )}
          </div>
          <MenuListTeachers
            action={addTeacher}
          />
        </div>
      </Modal>
    );
  }