import { useState } from "react";
import { dataDefaultTeam } from "../../helpers/dataDeafult/Team/dataDefaultTeam";
import { clientAuthFetch } from "../../helpers/fetching/clientFecth";
import { DataCourseIn } from "../../Interfaces/Course/dataCourse";
import { DataTeamIn } from "../../Interfaces/Team/dataTeam";
import Modal from "../Modal";;
import TableTeam from "../TableTeam";
import MenuListTeams from "./MenuListTeams";

export default function MenuEditTeamCourse({
  courseEdit,
  showMenu,
  setShowMenu,
}: {
  courseEdit: DataCourseIn;
  showMenu: boolean;
  setShowMenu: (p: boolean) => void;
}) {

  const [saveTeamUpdate, setSaveTeamUpdate] = useState<DataTeamIn>(dataDefaultTeam);

  async function editTeamCourse(){
    try {
        await clientAuthFetch.put(
          `/api/admin/courses/${courseEdit.id}/team/${saveTeamUpdate.id}`
        )
        alert("Grupo actualizado correctamente")
    } catch (e) {
        alert(e)
    }
  }

  function addTeam(team: DataTeamIn) {
    setSaveTeamUpdate(team);
  }

  return (
    <Modal
      showModal={showMenu}
      setShowModal={setShowMenu}
      actionModal={editTeamCourse}
      title="Editar grupo"
      width={null}
      zindex="20"
    >
      <div>
        <div className="mb-6">
          <div className="w-full bg-oceanBlue text-white font-bold text-center">
            <span>Grupo seleccionado</span>
          </div>
          <TableTeam>
            <tr>
              <td>{saveTeamUpdate.id}</td>
              <td>{saveTeamUpdate.name}</td>
              <td>{saveTeamUpdate.semester.id}</td>
            </tr>
          </TableTeam>
        </div>
        <div>
          <MenuListTeams
            action={addTeam}
          />
        </div>
      </div>
    </Modal>
  );
}
