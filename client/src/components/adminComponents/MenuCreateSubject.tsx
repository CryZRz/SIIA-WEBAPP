import { ChangeEvent, useState } from "react";
import { clientAuthFetch } from "../../helpers/fetching/clientFecth";
import { DataSubjectIn } from "../../Interfaces/Subject/dataSubject";
import Modal from "../Modal";

export default function MenuCreateSubject({
  showMenu,
  setShowMenu,
  subjectEdit,
  setSubjectEdit
}: {
  showMenu: boolean;
  setShowMenu: (p: boolean) => void;
  subjectEdit?: DataSubjectIn;
  setSubjectEdit?: (s: DataSubjectIn) => void
}) {
  const [saveNameSubject, setSaveNameSubject] = useState("");
  const [saveCreditsSubject, setSaveCreditsSubject] = useState(0);

  function saveName({ target: { value } }: ChangeEvent<HTMLInputElement>) {
    if (setSubjectEdit != undefined && subjectEdit != undefined) {
      setSubjectEdit({...subjectEdit, ["name"] : value})
    }else{
      setSaveNameSubject(value);
    }
  }

  function saveCredits({ target: { value } }: ChangeEvent<HTMLInputElement>) {
     if (setSubjectEdit != undefined && subjectEdit != undefined) {
      setSubjectEdit({...subjectEdit, ["credits"] : parseInt(value)})
     }else{
      setSaveCreditsSubject(parseInt(value));
     }
  }

  async function createSubject() {
    try {
      await clientAuthFetch.post(
        "/api/admin/subjects/",
        {
          name: saveNameSubject,
          credits: saveCreditsSubject,
        }
      );
      alert("Materia creada correctamente");
    } catch (e) {
      alert(e);
    }
  }

  async function editSubject() {
    if (subjectEdit != undefined) {
      try {
        await clientAuthFetch.put(
          `/api/admin/subjects/${subjectEdit.id}`,
          {
            name: subjectEdit.name,
            credits: subjectEdit.credits,
          });
        alert("Materia actualizada correctamente");
      } catch (e) {
        console.log(e)
        alert(e);
      }
    }
  }

  async function deleteSubject() {
    if (subjectEdit != undefined) {
      try {
        await clientAuthFetch.delete(`/api/admin/subjects/${subjectEdit.id}`)
        alert("materia eliminada correctamente")
      } catch (e) {
        alert(e);
      }
    }
  }

  function validateSubject() {
    if (subjectEdit != undefined) {
      if (subjectEdit.name == "") {
        return alert("No puedes crear materias sin nombre");
      } else {
        editSubject();
      }
    }else{
      if (saveNameSubject == "") {
        return alert("No puedes crear materias sin nombre");
      } else {
        createSubject();
      }
    }
  }

  return (
    <Modal
      showModal={showMenu}
      setShowModal={setShowMenu}
      actionModal={validateSubject}
      width={null}
      title={
        subjectEdit != undefined ? "Editar materia" : "Crear nueva materia"
      }
      zindex="10"
    >
      <div>
        <form>
          <div className="mb-2">
            <label htmlFor="name">Nombre: </label>
            <input
              type="text"
              name="name"
              onChange={saveName}
              className="w-full border-orangeLight border outline-none"
              defaultValue={subjectEdit != undefined ? subjectEdit.name : ""}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="credits">Creditos: </label>
            <input
              type="number"
              name="credits"
              onChange={saveCredits}
              className="w-full border-orangeLight border outline-none"
              defaultValue={subjectEdit != undefined ? subjectEdit.credits : ""}
            />
          </div>
        </form>
        {subjectEdit != undefined ? (
          <div className="w-full mt-6">
            <button
              className="w-full bg-orangeLight text-white p-1"
              onClick={(e) => {
                deleteSubject();
              }}
            >
              Eliminar materia
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </Modal>
  );
}
