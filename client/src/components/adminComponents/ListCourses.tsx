import { useContext, useEffect, useState } from "react";
import LoadingSection from "../LoadingSection";
import TableCourse from "./TableCourse";
import CardProfileLi from "../CardProfileLi";
import Modal from "../Modal";
import "../../assets/styles/menuStudentKar..styles.css";
import MenuEditTeamCourse from "./MenuEditTeamCourse";
import MenuEditTeacherCourse from "./MenuEditTeacherCourse";
import MenuEditSubjectCourse from "./MenuEditSubjectCourse";
import MenuEditPeriodCourse from "./MenuEditPeriodCourse";
import Pagination from "../Pagination";
import MenuCreateCourse from "./MenuCreateCourse";
import MenuEditSchelude from "./MenuEditSchelude";
import { DataContextLogin } from "../../context/Context";
import { clientAuthFetch } from "../../helpers/fetching/clientFecth";
import { DataCourseIn } from "../../Interfaces/Course/dataCourse";
import { DataScheduleIn } from "../../Interfaces/Schedule/dataSchedule";
import { dataDefaultCourse } from "../../helpers/dataDeafult/Course/dataDefaultCourse";
import { dataDefaultSchedule } from "../../helpers/dataDeafult/Course/dataDefaultSchedule";
import { DataUserIn } from "../../Interfaces/User/dataUser";

export default function ListCourses({id} : {id?: string}) {
  const [saveListCourses, setSaveListCourses] = useState<DataCourseIn[]>([])
  const [loadListCourses, setLoadListCourses] = useState(false)
  const [saveEditCourse, setSaveEditCourse] = useState<DataCourseIn>(dataDefaultCourse)

  const [saveListStudents, setSaveListStudents] = useState<DataUserIn[]>([])
  const [saveSchedulesEdit, setSaveSchedulesEdit] = useState<DataScheduleIn[]>([])
  
  const [saveSchedulesToAdd, setSaveSchedulesToAdd] = useState<DataScheduleIn[]>([])
  const [saveSchedulesToEdit, setSaveSchedulesToEdit] = useState<DataScheduleIn[]>([])
  const [saveSchedulesToRemove, setSaveSchedulesToRemove] = useState<number[]>([])

  const [showModalMenu, setShowModalMenu] = useState(false)
  const [showModalEditSub, setShowModalEditSub] = useState(false)
  const [showModalEditTeacher, setShowModalEditTeacher] = useState(false)
  const [showModalEditTeam, setShowModalEditTeam] = useState(false)
  const [showModalEditPeriod, setShowModalEditPeriod] = useState(false)
  const [showModalCreateCourse, setShowModalCreateCourse] = useState(false)
  const [showModalEditSchedule, setShowModalEditSchedule] = useState(false)

  const {setIsLoading} = useContext(DataContextLogin)

  async function getListCourses() {
    let urlFeching: string
    if (id != undefined) {
      urlFeching = ``
    }else{
      urlFeching = `/api/admin/courses`
    }

    try {
      setLoadListCourses(false);
      const reqListCourses = await clientAuthFetch.get(urlFeching);
      setSaveListCourses(reqListCourses.data.data);
      setLoadListCourses(true);
      console.log(reqListCourses)
    } catch (e) {
      alert(e);
    }
  }

  useEffect(() => {
    getListCourses();
  }, []);

  async function getListStudentsCourse(id: number) {
    try {
      const listStudents = await clientAuthFetch.get(
        `/api/admin/courses/${id}/students`
      );
      setSaveListStudents(listStudents.data.data);
      console.log(listStudents.data);
    } catch (e) {
      alert(e);
    }
  }

  function MenuEditCourse() {
    function showMenuEditSub() {
      if (
        saveEditCourse.typeOfGroup == "Regularizacion" &&
        saveListStudents.length > 0
      ) {
        return alert(
          "No puedes cambiar la materia de un curso en regularizacion cuando ya hay alumnos inscritos"
        );
      }
      setShowModalEditSub(true);
    }

    function showMenuEditTeacher() {
      setShowModalEditTeacher(true);
    }

    function showMenuEditTeam() {
      if (
        saveEditCourse.typeOfGroup == "Regularizacion" &&
        saveListStudents.length > 0
      ) {
        return alert(
          "No puedes cambiar el grupo de un curso en regularizacion cuando ya hay alumnos inscritos"
        );
      }
      setShowModalEditTeam(true);
    }

    function showMenuEditPeriod() {
      setShowModalEditPeriod(true);
    }

    async function deleteCourse(){
      try {
        await clientAuthFetch.delete(`/api/admin/courses/${saveEditCourse.id}`)
        alert("curso eliminado correctamente")
        getListCourses()
      } catch (e) {
        alert(e)
      }
    }

    function validateDeleteCourse(){
      if (saveEditCourse.id == 0) {
        return alert("No hay curso para borrar")
      }
      if (saveListStudents.length > 0) {
        const confirmDelete = confirm("Hay alumnos inscritos a este curso si lo borras todos los alumnos perderan este curso estas seguro de hacerlo")
        if (confirmDelete) {
          deleteCourse()
        }
      }else{
        deleteCourse()
      }
    }

    function addScheduleToAddSchedule(schedule: DataScheduleIn){
      setSaveSchedulesToAdd(prevScheduleAdd => [...prevScheduleAdd, schedule])
    }

    function addScheduleToEditSchedule(schedule: DataScheduleIn){
      if (schedule.hours[0].course.id !== 0) {
        setSaveSchedulesToEdit(prevScheduleEdit => [...prevScheduleEdit, schedule])
      }else{
        const newSchedulesToEdit = saveSchedulesToAdd.filter(s => s.hours[0].id != schedule.hours[0].id)
        newSchedulesToEdit.push(schedule)

        setSaveSchedulesToAdd(newSchedulesToEdit)
      }
    }

    function addScheduleToAddRemove(schedule: DataScheduleIn){
      if (schedule.hours[0].course.id !== 0) {
        const idSchedule = parseInt(schedule.hours[0].id.toString())
        setSaveSchedulesToRemove(prevScheduleDelete => [...prevScheduleDelete, idSchedule])
      }else{
        const newSchedulesToRemove = saveSchedulesToAdd.filter(s => s.hours[0].id != schedule.hours[0].id)
        console.log(newSchedulesToRemove)
        setSaveSchedulesToAdd(newSchedulesToRemove)
      }
    }

    function addSchedule(schedule: DataScheduleIn){
      const copyListSchedules: DataScheduleIn[] = JSON.parse(JSON.stringify(saveSchedulesEdit))

      const newSchedules = copyListSchedules.map(s => {
        if (s.day.toLowerCase() == schedule.day.toLocaleLowerCase()) {
          s.hours.push(schedule.hours[0])
        }

        return s
      })
      
      setSaveSchedulesEdit(newSchedules)
      addScheduleToAddSchedule(schedule)
    }

    function editSchedule(schedule: DataScheduleIn){
      const copyListSchedules: DataScheduleIn[] = JSON.parse(JSON.stringify(saveSchedulesEdit))
      const findSchedule = copyListSchedules.find(s => s.hours.some(hour => hour.id === schedule.hours[0].id))

      if (findSchedule && findSchedule.day.toLocaleLowerCase() == schedule.day.toLocaleLowerCase()) {
        const addNewScheduleEdit = copyListSchedules.map(s => {
          if (s.day.toLocaleLowerCase() == schedule.day.toLocaleLowerCase()) {
            const rowsFilter = s.hours.filter(r => r.id != schedule.hours[0].id)
            rowsFilter.push(schedule.hours[0])
            s.hours = rowsFilter
          }

          return s
        })

        setSaveSchedulesEdit(addNewScheduleEdit)
        addScheduleToEditSchedule(schedule)
      }
      else if (findSchedule && findSchedule.day.toLowerCase() != schedule.day.toLocaleLowerCase()) {

        const addNewScheduleEdit = copyListSchedules.map(s => {
          if (s.day.toLocaleLowerCase() == findSchedule.day.toLocaleLowerCase()) {
            const rowsFilter = s.hours.filter(row => row.id != schedule.hours[0].id)
            s.hours = rowsFilter
          }
          else if (s.day == schedule.day) {
            s.hours.push(schedule.hours[0])
          }

          return s
        })

        setSaveSchedulesEdit(addNewScheduleEdit)
        addScheduleToEditSchedule(schedule)
      }else{
        alert("la materia que quieres editar no existe")
      }
    }

    function deleteSchedule(schedule: DataScheduleIn){
      const copyListSchedules: DataScheduleIn[] = JSON.parse(JSON.stringify(saveSchedulesEdit))

      const scheduleDelete = copyListSchedules.map(s => {
        if (s.day.toLocaleLowerCase() == schedule.day.toLocaleLowerCase()) {
          const rowsFilter = s.hours.filter(r => r.id != schedule.hours[0].id)
          s.hours = rowsFilter
        }

        return s
      })

      setSaveSchedulesEdit(scheduleDelete)
      addScheduleToAddRemove(schedule)
    }

    async function updateSchedule(){
      try {
        setIsLoading(false)
        console.log({
          listSchedulesAdd: saveSchedulesToAdd, 
          listSchedulesRemove: saveSchedulesToRemove, 
          listSchedulesEdit: saveSchedulesToEdit,
          courseId: saveEditCourse.id
        })
        await clientAuthFetch.put(`/api/admin/courses/${saveEditCourse.id}/schedule`,{
          listSchedulesAdd: saveSchedulesToAdd, 
          listSchedulesRemove: saveSchedulesToRemove, 
          listSchedulesEdit: saveSchedulesToEdit, 
        })
        setIsLoading(true)
        alert("horario actulizado correctamente")
      } catch (e) {
        setIsLoading(true)
        console.log(e)
        alert(e)
      }
    }

    return (
      <Modal
        showModal={showModalMenu}
        setShowModal={setShowModalMenu}
        actionModal={() => {setShowModalMenu(false)}}
        title="Editar curso"
        width="w-1/2"
        zindex="10"
      >
        {showModalEditSub && (
          <MenuEditSubjectCourse
            courseEdit={saveEditCourse}
            setShowMenu={setShowModalEditSub}
            showMenu={showModalEditSub}
          />
        )}
        {showModalEditTeacher && (
          <MenuEditTeacherCourse
            courseEdit={saveEditCourse}
            showMenu={showModalEditTeacher}
            setShowMenu={setShowModalEditTeacher}
          />
        )}
        {showModalEditTeam && (
          <MenuEditTeamCourse
            courseEdit={saveEditCourse}
            showMenu={showModalEditTeam}
            setShowMenu={setShowModalEditTeam}
          />
        )}
        {showModalEditPeriod && (
          <MenuEditPeriodCourse
            courseEdit={saveEditCourse}
            showMenu={showModalEditPeriod}
            setShowMenu={setShowModalEditPeriod}
            lisStudentsCourse={saveListStudents}
          />
        )}
        {showModalEditSchedule && (
          <MenuEditSchelude
              showMenu={showModalEditSchedule}
              setShowMenu={setShowModalEditSchedule}
              listSchedules={saveSchedulesEdit}
              setSchedule={addSchedule}
              editSchedule={editSchedule}
              deleteSchedule={deleteSchedule}
              updateSchedules={updateSchedule}
              zindex="20"
          />
        )}
        <div>
          <div className="w-full text-center">
            <div className="w-full flex">
              <div className="bg-oceanBlue text-white w-1/2 font-bold p-1">
                <span>Curso id</span>
              </div>
              <div className="w-1/2 p-1 border border-orangeLight">
                <span>{saveEditCourse.id}</span>
              </div>
            </div>
            <div className="w-full flex">
              <div className="bg-oceanBlue text-white w-1/2 font-bold p-1">
                <span>Materia</span>
              </div>
              <div
                className="w-1/2 p-1 border border-orangeLight menu-edit-course"
                onClick={showMenuEditSub}
              >
                <span>{saveEditCourse.subject.name}</span>
                <span className="hidden text-white font-bold">Editar</span>
              </div>
            </div>
            <div className="w-full flex">
              <div className="bg-oceanBlue text-white w-1/2 font-bold p-1 .menu-edit-course">
                <span>Creditos</span>
                <span className="hidden text-white font-bold">Editar</span>
              </div>
              <div className="w-1/2 p-1 border border-orangeLight menu-edit-course">
                <span>{saveEditCourse.subject.credits}</span>
                <span className="hidden text-white font-bold">Editar</span>
              </div>
            </div>
            <div className="w-full flex">
              <div className="bg-oceanBlue text-white w-1/2 font-bold p-1">
                <span>Maestro</span>
              </div>
              <div
                className="w-1/2 p-1 border border-orangeLight menu-edit-course"
                onClick={showMenuEditTeacher}
              >
                {saveEditCourse.teacher != null ? (
                  <CardProfileLi
                    id={saveEditCourse.teacher.id}
                    name={saveEditCourse.teacher.name}
                    lastName={saveEditCourse.teacher.lastName}
                    image={saveEditCourse.teacher.image}
                  />
                ) : (
                  <span>El maestro esta por asignarse</span>
                )}
                <span className="hidden text-white font-bold">Editar</span>
              </div>
            </div>
            <div className="w-full flex">
              <div className="bg-oceanBlue text-white w-1/2 font-bold p-1">
                <span>Grupo</span>
              </div>
              <div
                className="w-1/2 p-1 border border-orangeLight menu-edit-course"
                onClick={showMenuEditTeam}
              >
                <span>{saveEditCourse.team.name}</span>
                <span className="hidden text-white font-bold">Editar</span>
              </div>
            </div>
            <div className="w-full flex">
              <div className="bg-oceanBlue text-white w-1/2 font-bold p-1">
                <span>Tip.Grup</span>
              </div>
              <div className="w-1/2 p-1 border border-orangeLight menu-edit-course">
                <span>{saveEditCourse.period.typeOfPeriod}</span>
                <span className="hidden text-white font-bold">Editar</span>
              </div>
            </div>
            <div className="w-full flex">
              <div className="bg-oceanBlue text-white w-1/2 font-bold p-1">
                <span>Periodo</span>
              </div>
              <div
                className="w-1/2 p-1 border border-orangeLight menu-edit-course"
                onClick={showMenuEditPeriod}
              >
                <span>{saveEditCourse.period.name}</span>
                <span className="hidden text-white font-bold">Editar</span>
              </div>
            </div>
            <div 
              className="w-full flex"
              onClick={e => {setShowModalEditSchedule(true)}}
            >
              <div className="bg-oceanBlue text-white w-1/2 font-bold p-1">
                <span>Horario</span>
              </div>
              <div className="w-1/2 p-1 border border-orangeLight menu-edit-course">
                <span>Ver horario</span>
                <span className="hidden text-white font-bold">Ver horario</span>
              </div>
            </div>
          </div>
          <div className="w-full mt-4">
            <button 
              className="bg-orangeLight p-1 text-white rounded w-full"
              onClick={validateDeleteCourse}
            >
              Eliminar curso
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <div className="mt-4 mx-auto w-11/12 mb-4">
      <div className="w-full mx-auto mb-2 mt-4">
        <h1 className="text-orangeLight text-3xl font-bold">Cursos</h1>
      </div>
      <button
        className="bg-orangeLight text-white font-bold p-1 w-full mb-2"
        onClick={(e) => {
          setShowModalCreateCourse(true);
        }}
      >
        Crear curso
      </button>
      <MenuEditCourse />
      <MenuCreateCourse
        showMenu={showModalCreateCourse}
        setShowMenu={setShowModalCreateCourse}
      />
      {loadListCourses ? (
        <TableCourse>
          {saveListCourses.map((c) => {

            function addCourseToEdit() {
              setSaveEditCourse(c);
              getListStudentsCourse(c.id);

              if (c.schedule && c.schedule.length > 0) {
                setSaveSchedulesEdit(c.schedule);
              }else{
                setSaveSchedulesEdit([dataDefaultSchedule])
              }

              setShowModalMenu(true);
            }

            return (
              <tr
                key={c.id}
                className="text-center hover:bg-orangeLight cursor-pointer"
                onClick={addCourseToEdit}
              >
                <td className="p-2">{c.id}</td>
                <td className="p-2">{c.subject.name}</td>
                <td className="p-2">{c.subject.credits}</td>
                <td className="p-2">
                  {c.teacher != null ? (
                    <CardProfileLi
                      id={c.teacher.id}
                      name={c.teacher.name}
                      lastName={c.teacher.lastName}
                      image={c.teacher.image}
                    />
                  ) : (
                    <span>El maestro esta por asignarse</span>
                  )}
                </td>
                <td className="p-2">{c.team.name}</td>
                <td className="p-2">{c.typeOfGroup}</td>
                <td className="p-2">{c.period.name}</td>
              </tr>
            );
          })}
        </TableCourse>
      ) : (
        <LoadingSection />
      )}
      <div>
        <Pagination
          start={0}
          end={10}
          fetchingData={getListCourses}
          isLoading={!loadListCourses}
        />
      </div>
    </div>
  );
}
