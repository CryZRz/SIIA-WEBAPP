import { useState } from "react";
import { ScheduleTableIn } from "../../Interfaces/ScheduleIn";
import TableSchelude from "../TableSchelude";
import RowSchelude from "./RowSchelude";
import Modal from "../Modal";
import { defaultRowSchedule } from "../../helpers/dataDeafult/schedule";
import { v4 } from "uuid";
import MenuAddHoursSchedule from "./MenuAddHoursSchedule";
import { DataScheduleIn } from "../../Interfaces/Schedule/dataSchedule";
import { dataDefaultSchedule } from "../../helpers/dataDeafult/Course/dataDefaultSchedule";

export default function MenuEditSchelude({
  showMenu,
  setShowMenu,
  listSchedules,
  setSchedule,
  editSchedule,
  deleteSchedule,
  updateSchedules,
  zindex
}: {
  showMenu: boolean;
  setShowMenu: (p: boolean) => void;
  listSchedules: DataScheduleIn[];
  setSchedule?: (schedule: DataScheduleIn) => void;
  editSchedule?: (schedule: DataScheduleIn) => void;
  deleteSchedule?: (schedule: DataScheduleIn) => void;
  updateSchedules?: () => void;
  zindex?: string
}) {

  const [saveScheduleAc, setSaveScheduleAc] = useState<DataScheduleIn>(dataDefaultSchedule)
  const copyListSchedules: DataScheduleIn[] = JSON.parse(JSON.stringify(listSchedules))

  const [showModalAddSchedule, setShowModalAddSchedule] = useState(false)
  const [showModalEditSchedule, setShowModalEditSchedule] = useState(false)

  function addIdNewSchedule(){
    const addIdNewSchedule = {...saveScheduleAc}
    addIdNewSchedule.hours = [{...addIdNewSchedule.hours[0], id: v4()}]
    setSaveScheduleAc(addIdNewSchedule)
  }

  function findDuplicateSchedule(schedule: DataScheduleIn){
    let err = false
    copyListSchedules.map(s => {
      s.hours.map(row => {
        if (row.startTime == schedule.hours[0].startTime && row.endTime == schedule.hours[0].endTime && s.day.toLocaleLowerCase() == schedule.day.toLocaleLowerCase()) {
          err = true
        }
      })
    })

    return err
  }

  function findSchedule(id: number | string){
    const finSchedule = copyListSchedules.find(schedule => schedule.hours.some(row => row.id === id))
    if (finSchedule) {
      const scheduleHourToEdit = finSchedule.hours.filter(s => s.id == id)

      return {
        day: finSchedule.day,
        hours: scheduleHourToEdit
      }
    }else{
      return undefined
    }
  }

  function findToEditSchedule(id: number | string){
    const getSchedule = findSchedule(id)
    if (getSchedule) {
      setSaveScheduleAc(getSchedule)
      setShowModalEditSchedule(true)
    }else{
      alert("la materia que quieres editar no existe")
    }
  }

  function addScheduleToMain(){
    if (setSchedule != undefined) {

      if (findDuplicateSchedule(saveScheduleAc)) {
        return alert("el horario que quieres agregar ya esta en ese dia y horario")
      }

      setSchedule(saveScheduleAc)
    }
    
    setShowModalAddSchedule(false)
  }

  function addScheduleEdit(){
    if (editSchedule != undefined) {

      if (findDuplicateSchedule(saveScheduleAc)) {
        return alert("el horario que quieres editar ya esta en ese dia y horario")
      }

      editSchedule(saveScheduleAc)
    }

    setShowModalEditSchedule(false)
  }

  function addToDeleteSchedule(id: number | string){
    const getSchedule = findSchedule(id)

    if (getSchedule && deleteSchedule != undefined) {
      deleteSchedule(getSchedule)
    }else{
      alert("la materia que quieres eliminar no existe")
    }
  }

  return (
    <Modal
        showModal={showMenu}
        setShowModal={setShowMenu}
        actionModal={updateSchedules != undefined ? updateSchedules : () => { setShowMenu(false)}}
        title="Horario"
        width="w-11/12"
        zindex={zindex != undefined ? zindex : "10"}
    >
      {showModalAddSchedule && (
          <MenuAddHoursSchedule
          showMenu={showModalAddSchedule}
          setShowMenu={setShowModalAddSchedule}
          scheduleAc={saveScheduleAc}
          setScheduleAc={setSaveScheduleAc}
          addSchedule={addScheduleToMain}
          />
        )}
      {showModalEditSchedule && (
        <MenuAddHoursSchedule
          showMenu={showModalEditSchedule}
          setShowMenu={setShowModalEditSchedule}
          scheduleAc={saveScheduleAc}
          setScheduleAc={setSaveScheduleAc}
          editSchedule={addScheduleEdit}
        />
      )}
      <div className="w-full">
        <TableSchelude>
          {listSchedules.map((s) => {
            return <RowSchelude 
                      key={v4()} 
                      listHours={s.hours} 
                      addToEditSchedule={setSchedule != undefined ? findToEditSchedule : undefined}
                      addToDeleteSchedule={setSchedule != undefined ? addToDeleteSchedule : undefined}
                  />;
          })}
        </TableSchelude>
        {setSchedule != undefined && (
          <div className="w-full mt-4">
          <button 
            onClick={e => {
              addIdNewSchedule()
              setShowModalAddSchedule(true)
              
            }}
            className="bg-orangeLight text-white p-1 mx-auto block">
              Agregar horario
          </button>
        </div>
        )}
      </div>
    </Modal>
  );
}
