import axios from 'axios'
import {ChangeEvent, useContext, useState} from 'react'
import { DataContextLogin } from '../../context/Context';
import { clientAuthFetch } from '../../helpers/fetching/clientFecth';
import { formatTimeDate } from '../../helpers/formatTime';
import { getCookie } from '../../helpers/getCookie'
import { DataCourseKardexStudentIn } from '../../Interfaces/Kardex/dataKardex';
import { KardexSubjectIn } from '../../Interfaces/KardexSubjectIn';
import CardProfileLi from '../CardProfileLi';
import ListQualifications from '../ListQualifications';
import Modal from '../Modal'

export default function MenuEditQualificationsKardexStudent({
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

    const [saveDataSub, setSaveDataSub] = useState({
      subjectStudiedId: 0,
      qualification: ""
    })

    async function sendQualificationUp(){
      if (saveDataSub.subjectStudiedId == 0 && saveDataSub.qualification == "") {
        return alert("debes seleccionar una calificacion")
      }

      try {
        setIsLoading(false)
        await clientAuthFetch.put(`/api/admin/courses/${saveDataSub.subjectStudiedId}/qualification`, 
        {
          qualification: saveDataSub.qualification
        }
        )
        setIsLoading(true)
        alert("Calificacion subida correctamente")
        return reloadData()
      } catch (e) {
        setIsLoading(false)
        return alert(e) 
      }
    }

    return (
      <Modal
        title="Editar Calificación"
        showModal={showMenu}
        setShowModal={setShowMenu}
        actionModal={sendQualificationUp}
        width={null}
        zindex={zindex != undefined ? zindex : "10"}
      >
        <div className="w-full">
        {subjectEdit.ratings.map((r, i) => {

            function handleChangeQualification({target: {value}} : ChangeEvent<HTMLSelectElement>){
              setSaveDataSub({
                subjectStudiedId: r.id,
                qualification: value
              })
            }

              return (
                <ul className="mt-6 shadow">
                  <li>
                    <div className="w-full p-1 text-white bg-oceanBlue">
                      <span>Materia</span>
                    </div>
                    <div className="p-2">
                      <span>{subjectEdit.subject}</span>
                    </div>
                  </li>
                  <li>
                    <div className="w-full p-1 text-white bg-oceanBlue">
                      <span>Creditos</span>
                    </div>
                    <div className="p-1">
                      <span>{subjectEdit.credits}</span>
                    </div>
                  </li>
                  <li>
                    <div className="w-full p-1 text-white bg-oceanBlue">
                      <span>Periodo</span>
                    </div>
                    <div className="p-1">
                      <span>{r.course.period.name}</span>
                    </div>
                  </li>
                  <li>
                    <div className="w-full p-1 text-white bg-oceanBlue">
                      <span>Maestro</span>
                    </div>
                    <div className="p-1">
                      {r.course.teacher != null ? (
                        <CardProfileLi
                          id={r.course.teacher .id}
                          name={r.course.teacher .name}
                          lastName={r.course.teacher .lastName}
                          image={r.course.teacher .image}
                        />
                      ) : (
                        <span>El maestro esta por asignarse</span>
                      )}
                    </div>
                  </li>
                  <li>
                    <div className="w-full p-1 text-white bg-oceanBlue">
                      <span>Calificación</span>
                    </div>
                    <div className="p-1">
                      {
                        i+1 == subjectEdit.ratings.length ?
                        <select onChange={handleChangeQualification}>
                          <ListQualifications/>
                        </select>
                        :
                        <span>
                         {`
                          Fecha: ${formatTimeDate(r.updatedAt)} 
                          Calificacion: ${r.qualification.qualification} 
                        `} 
                        </span>
                      }
                    </div>
                  </li>
                </ul>
              );
            })}
        </div>
      </Modal>
    );
  }
