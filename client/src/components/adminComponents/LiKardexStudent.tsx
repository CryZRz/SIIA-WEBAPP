import { PageEdit, BinMinus } from "iconoir-react";
import { useState, Fragment } from "react";
import { formatTimeDate } from "../../helpers/formatTime";
import { KardexSubjectIn } from "../../Interfaces/KardexSubjectIn";
import "../../assets/styles/menuStudentKar..styles.css";
import Modal from "../Modal";
import { deafultKardexSubjectStudent } from "../../helpers/dataDeafult";
import MenuEditSubjectKardexStudent from "./MenuEditSubjectKardexStudent";
import MenuAddOpKardexStudent from "./MenuAddOpKardexStudent";
import MenuEditQualificationsKardexStudent from "./MenuEditQualificationsKardexStudent";
import MenuDeleteCourseKardexStudent from "./MenuDeleteCourseKardexStudent";
import { DataCourseKardexStudentIn } from "../../Interfaces/Kardex/dataKardex";
import { DataDefaultCourseKardexStudentIn } from "../../helpers/dataDeafult/Kardex/dataDefaultKardex";

export default function LiKardexStudent({
  listSubjects,
  reloadDataUser
}: {
  listSubjects: DataCourseKardexStudentIn[];
  reloadDataUser: () => Promise<any>
}) {
  const [showModalOptions, setShowModalOptions] = useState(false);
  const [showModalEditSub, setShowModalEditSub] = useState(false);
  const [showModalDeleteSub, setShowModalDeleteSub] = useState(false);
  const [showModalAddOp, setShowModalAddOp] = useState(false);
  const [showModalQua, setShowModalQua] = useState(false);

  const [dataSubjectEdit, setDataSubjectEdit] = useState<DataCourseKardexStudentIn>(
    DataDefaultCourseKardexStudentIn
  );

  function showModalEditHandler(courseStudentId: number) {
    const getSubjectFil = listSubjects.filter(
      (sf) => sf.id == courseStudentId
    );

    if (getSubjectFil.length > 0) {
      setDataSubjectEdit(getSubjectFil[0]);
      console.log(getSubjectFil[0])
      return setShowModalOptions(true);
    }

    return alert("Materia inexistente");
  }

  function showModalDeleteHandler(courseStudentId: number) {
    const getSubjectFil = listSubjects.filter(
      (sf) => sf.id == courseStudentId
    );

    if (getSubjectFil.length > 0) {
      setDataSubjectEdit(getSubjectFil[0]);
      return setShowModalDeleteSub(true);
    }

    return alert("Materia inexistente");
  }

  function MenuOptions() {

    function assingOpportunityHandler() {
      const indexLastRaiting = dataSubjectEdit.ratings.length - 1;
      const qualificationLastCourse = dataSubjectEdit.ratings[indexLastRaiting].qualification.qualification

      if (qualificationLastCourse == null) {
        return alert("No hay calificacion")
      }

      if (typeof(qualificationLastCourse) == "string") {
        let convertQualificationNumber = parseFloat(qualificationLastCourse)
        if (isNaN(convertQualificationNumber) && qualificationLastCourse!= "D2") {
          alert("err")
        }
        else if (convertQualificationNumber > 7) {
          return alert("La materia no esta reprobada");
        }
      }
      
      setShowModalAddOp(true)
    }


    return (
      <Modal
        title="Menu materia"
        setShowModal={setShowModalOptions}
        showModal={showModalOptions}
        actionModal={() => {}}
        zindex="10"
        width={null}
      >
        {showModalEditSub && 
          <MenuEditSubjectKardexStudent
          showMenu={showModalEditSub}
          setShowMenu={setShowModalEditSub}
          subjectEdit={dataSubjectEdit}
          zindex="20"
          reloadData={() => {
            setShowModalEditSub(false)
            setShowModalOptions(false)
            reloadDataUser()
          }}
        />}
        {showModalAddOp && 
        <MenuAddOpKardexStudent
          showMenu={showModalAddOp}
          setShowMenu={setShowModalAddOp}
          subjectEdit={dataSubjectEdit}
          zindex="20"
          reloadData={() => {
            setShowModalAddOp(false)
            setShowModalOptions(false)
            reloadDataUser()
          }}
        />}
        {showModalQua && 
        <MenuEditQualificationsKardexStudent
          showMenu={showModalQua}
          setShowMenu={setShowModalQua}
          subjectEdit={dataSubjectEdit}
          zindex="20"
          reloadData={() => {
            setShowModalAddOp(false)
            setShowModalOptions(false)
            reloadDataUser()
          }}
        />}
        <div>
          <table className="w-full text-center shadow">
            <thead className="bg-oceanBlue text-white font-bold">
              <tr>
                <td className="p-1">Id</td>
                <td className="p-1">Nombre</td>
                <td className="p-1">Creditos</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">{dataSubjectEdit.clave}</td>
                <td className="p-2">{dataSubjectEdit.subject}</td>
                <td className="p-2">{dataSubjectEdit.credits}</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-2">
            <button
              onClick={(e) => {
                setShowModalEditSub(true);
              }}
              className="bg-orangeLight text-white p-2 rounded"
            >
              Editar materia
            </button>
          </div>
          <table className="w-full text-center shadow mt-6">
            <thead className="bg-oceanBlue text-white font-bold">
              <tr>
                <th className="p-1">Fecha 1</th>
                <th className="p-1">Cal 1</th>
                <th className="p-1">Fecha 2</th>
                <th className="p-1">Cal 2</th>
                <th className="p-1">Fecha 3</th>
                <th className="p-1">Cal 3</th>
                <th className="p-1">Fecha 4</th>
                <th className="p-1">Cal 4</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {dataSubjectEdit.ratings.map((r) => {
                  return (
                    <Fragment key={r.id}>
                      <td className="p-2">{formatTimeDate(r.qualification.updatedAt)}</td>
                      <td className="p-2">{r.qualification.qualification}</td>
                    </Fragment>
                  );
                })}
              </tr>
            </tbody>
          </table>
          <div className="mt-2">
            <button
              onClick={(e) => {
                setShowModalQua(true);
              }}
              className="bg-orangeLight m-2 text-white p-2 rounded"
            >
              Ediar calificaciones
            </button>
            <button
              onClick={assingOpportunityHandler}
              className="bg-orangeLight m-2 text-white p-2 rounded"
            >
              Agregar oportunidad
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <>
      <MenuOptions />
      {showModalDeleteSub && 
      <MenuDeleteCourseKardexStudent
        showMenu={showModalDeleteSub}
        setShowMenu={setShowModalDeleteSub}
        subjectEdit={dataSubjectEdit}
        reloadData={() => {
          setShowModalDeleteSub(false)
          reloadDataUser()
        }}
      />}
      {listSubjects.map((s) => {
        return (
          <tr key={s.id}>
            <td className="px-6 py-4">{s.clave}</td>
            <td className="px-6 py-4 menu-student-kar">
              <span>{s.subject}</span>
              <div className="hidden">
                <button
                  onClick={e => {showModalEditHandler(s.id)}}
                  className="bg-orangeLight m-2 cursor-pointer p-1 rounded"
                >
                  <PageEdit color="#ffff" height={30} width={30} />
                </button>
                <button
                  onClick={e => {showModalDeleteHandler(s.id)}}
                  className="bg-orangeLight m-2 cursor-pointer p-1 rounded"
                >
                  <BinMinus color="#ffff" height={30} width={30} />
                </button>
              </div>
            </td>
            <td className="px-6 py-4">{s.credits}</td>
            {s.ratings.map((r) => {
              return (
                <Fragment key={r.id}>
                  <td>
                    {
                      r.qualification.updatedAt != null ? 
                      formatTimeDate(r.qualification.updatedAt) : "Pendiente"
                    }
                  </td>
                  <td>
                    {
                      r.qualification.qualification != null ? 
                      r.qualification.qualification : "Pendiente"
                    }
                  </td>
                </Fragment>
              );
            })}
          </tr>
        );
      })}
    </>
  );
}
