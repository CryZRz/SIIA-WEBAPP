import { ChangeEvent, useState } from "react";
import Modal from "../Modal";
import "../../assets/styles/menuStudentKar..styles.css";
import MenuListSubjects from "./MenuListSubjects";
import MenuListTeachers from "./MenuListTeachers";
import MenuListTeams from "./MenuListTeams";
import MenuListPeriods from "./MenuListPeriods";
import CardProfileLi from "../CardProfileLi";
import { DataCourseIn } from "../../Interfaces/Course/dataCourse";
import { dataDefaultCourse } from "../../helpers/dataDeafult/Course/dataDefaultCourse";
import { DataUserIn } from "../../Interfaces/User/dataUser";
import { DataTeamIn } from "../../Interfaces/Team/dataTeam";
import { DataPeriodIn } from "../../Interfaces/Period/dataPeriod";
import { DataSubjectIn } from "../../Interfaces/Subject/dataSubject";
import { clientAuthFetch } from "../../helpers/fetching/clientFecth";
import { listTypesOfGroup } from "../../helpers/constants";

export default function MenuCreateCourse({
  showMenu,
  setShowMenu,
}: {
  showMenu: boolean;
  setShowMenu: (p: boolean) => void;
}) {

  const [saveNewCourse, setSaveNewCourse] = useState<DataCourseIn>(dataDefaultCourse);

  const [showMenuSelectSub, setShowMenuSelectSub] = useState(false)
  const [showMenuSelectTeacher, setShowMenuSelectTeacher] = useState(false)
  const [showMenuSelectTeam, setShowMenuSelectTeam] = useState(false)
  const [showMenuSelectPeriod, setShowMenuSelectPeriod] = useState(false)
  const [showMenuSelectTOG, setShowMenuSelectTOG] = useState(false)

  function addSubject(subject: DataSubjectIn){
    setSaveNewCourse({...saveNewCourse, ["subject"]: subject})
    setShowMenuSelectSub(false)
  }

  function addTeacher(teacher: DataUserIn){
    setSaveNewCourse({...saveNewCourse, ["teacher"]: teacher})
    setShowMenuSelectTeacher(false)
  }

  function addTeam(team: DataTeamIn){
    setSaveNewCourse({...saveNewCourse, ["team"]: team})
    setShowMenuSelectTeam(false)
  }

  function addPeriod(period: DataPeriodIn){
    setSaveNewCourse({...saveNewCourse, ["period"]: period})
    setShowMenuSelectPeriod(false)
  }

  function addTOG({target: {value}}: ChangeEvent<HTMLSelectElement>){
    console.log(value)
    setSaveNewCourse({...saveNewCourse, ["typeOfGroup"]: value})
    setShowMenuSelectTOG(false)
  }

  async function sendCreateCourse(){
    try {
      await clientAuthFetch.post("/api/admin/courses",{
        subjectId: saveNewCourse.subject.id, 
        teacherId: saveNewCourse.teacher == null ? null : saveNewCourse.teacher.id, 
        teamId: saveNewCourse.team.id, 
        periodId: saveNewCourse.period.id, 
        typeOfGroup: saveNewCourse.typeOfGroup,
        educationalPlanId: 1,
        semesterId: saveNewCourse.team.semester.id,
      })
      alert("curso creado correctamente")
    } catch (e) {
      console.log(e)
      alert(e)
    }
  }

  function validateData(){
    if (saveNewCourse.subject.id == 0) {
      return alert("No puedes crear un curso sin materia")
    }
    else if (saveNewCourse.team.id == 0) {
      return alert("No puedes crear un curso sin grupo")
    }
    else if (saveNewCourse.period.id == 0) {
      return alert("No puedes crear un curso sin periodo")
    }else{
      sendCreateCourse()
    }
  }

  return (
    <Modal
      showModal={showMenu}
      setShowModal={setShowMenu}
      actionModal={validateData}
      title="Crea un nuevo curso"
      width={null}
      zindex="10"
    >
      <div>
        <Modal
          showModal={showMenuSelectSub}
          setShowModal={setShowMenuSelectSub}
          actionModal={() => {}}
          title="Seleciona un materia"
          width={null}
          zindex="20"
        >
          <MenuListSubjects
            action={addSubject}
          />
        </Modal>
        <Modal
          showModal={showMenuSelectTeacher}
          setShowModal={setShowMenuSelectTeacher}
          actionModal={() => {}}
          title="Seleciona un maestro"
          width={null}
          zindex="20"
        >
          <MenuListTeachers
            action={addTeacher}
          />
        </Modal>
        <Modal
          showModal={showMenuSelectPeriod}
          setShowModal={setShowMenuSelectPeriod}
          actionModal={() => {}}
          title="Seleciona un periodo"
          width={null}
          zindex="20"
        >
          <MenuListPeriods
            action={addPeriod}
          />
        </Modal>
        <Modal
          showModal={showMenuSelectTeam}
          setShowModal={setShowMenuSelectTeam}
          actionModal={() => {}}
          title="Seleciona un grupo"
          width={null}
          zindex="20"
        >
          <MenuListTeams
            action={addTeam}
          />
        </Modal>
        <Modal
          showModal={showMenuSelectTOG}
          setShowModal={setShowMenuSelectTOG}
          actionModal={() => {}}
          title="Seleciona el tipo de grupo"
          width={null}
          zindex="20"
        >
          <select
            className="w-full text-center p-2 outline-none font-bold"
            onChange={addTOG}
          >
            <option value="default">Seleccione un tipo de grupo</option>
            {
              listTypesOfGroup.map(group => (
                <option 
                  key={group} 
                  value={group}
                >
                  {group}
                </option>
              ))
            }
          </select>
        </Modal>
        <div className="w-full text-center">
          <div className="w-full flex">
            <div className="bg-oceanBlue text-white w-1/2 font-bold p-1">
              <span>Materia</span>
            </div>
            <div
              className="w-1/2 p-1 border border-orangeLight menu-edit-course"
              onClick={e => {setShowMenuSelectSub(true)}}
            >
              <span>{saveNewCourse.subject.name}</span>
              <span className="hidden text-white font-bold">Editar</span>
            </div>
          </div>
          <div className="w-full flex">
            <div className="bg-oceanBlue text-white w-1/2 font-bold p-1 menu-edit-course">
              <span>Creditos</span>
              <span className="hidden text-white font-bold">Editar</span>
            </div>
            <div className="w-1/2 p-1 border border-orangeLight">
              <span>{saveNewCourse.subject.credits}</span>
            </div>
          </div>
          <div className="w-full flex">
            <div className="bg-oceanBlue text-white w-1/2 font-bold p-1">
              <span>Maestro</span>
            </div>
            <div
              className="w-1/2 p-1 border border-orangeLight menu-edit-course"
              onClick={e => {setShowMenuSelectTeacher(true)}}
            >
              {saveNewCourse.teacher != null ? (
                  <CardProfileLi
                    id={saveNewCourse.teacher.id}
                    name={saveNewCourse.teacher.name}
                    lastName={saveNewCourse.teacher.lastName}
                    image={saveNewCourse.teacher.image}
                  />
                ) : (
                  <span>Maestro no seleccionado</span>
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
              onClick={e => {setShowMenuSelectTeam(true)}}
            >
              <span>{saveNewCourse.team.name}</span>
              <span className="hidden text-white font-bold">Editar</span>
            </div>
          </div>
          <div className="w-full flex">
            <div className="bg-oceanBlue text-white w-1/2 font-bold p-1">
              <span>Tip. Grup</span>
            </div>
            <div
              className="w-1/2 p-1 border border-orangeLight menu-edit-course"
              onClick={e => {setShowMenuSelectTOG(true)}}
            >
              <span>{saveNewCourse.typeOfGroup}</span>
              <span className="hidden text-white font-bold">Editar</span>
            </div>
          </div>
          <div className="w-full flex">
            <div className="bg-oceanBlue text-white w-1/2 font-bold p-1">
              <span>Periodo</span>
            </div>
            <div
              className="w-1/2 p-1 border border-orangeLight menu-edit-course"
              onClick={e => {setShowMenuSelectPeriod(true)}}
            >
              <span>{saveNewCourse.period.name}</span>
              <span className="hidden text-white font-bold">Editar</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
