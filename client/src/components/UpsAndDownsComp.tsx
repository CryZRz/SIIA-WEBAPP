import { useContext, useEffect, useState } from "react";
import TableUpsAndDows from "./TableUpsAndDows";
import CardSubject from "./CardSubject";
import LoadingSection from "./LoadingSection";
import { clientAuthFetch } from "../helpers/fetching/clientFecth";
import { DataCourseIn } from "../Interfaces/Course/dataCourse";
import { DataContextLogin } from "../context/Context";
import RolesEnum from "../enums/Role";

export default function UpsAndDownsComp() {

  const {dataUser} = useContext(DataContextLogin)

  const [listAviableSubjects, setListAviableSubjects] = useState<DataCourseIn[]>([]);
  const [listSubjectsOfUser, setListSubjectsOfUser] = useState<
  DataCourseIn[] | []
  >([]);
  const [listSubjectsUps, setListSubjectsUps] = useState<
  DataCourseIn[] | []
  >([]);
  const [listSubjectsDowns, setListSubjectsDowns] = useState<
  DataCourseIn[] | []
  >([]);
  const [loadListSubjects, setLoadListSubjects] = useState(false);
  const [reloadListSubjects, setReloadListSubjects] = useState(false)

  useEffect(() => {
    async function getSubjectsAviable() {
      try {
        const reqAviableSubjects = await clientAuthFetch.get("/api/upsanddowns");
        console.log(reqAviableSubjects)
        setListAviableSubjects(reqAviableSubjects.data.coursesAvailable);
        setListSubjectsOfUser(reqAviableSubjects.data.coursesStuding);
        setListSubjectsUps([])
        setListSubjectsDowns([])
        setLoadListSubjects(true);
      } catch (e) {
        console.log(e)
        alert(e);
      }
    }

    getSubjectsAviable();
  }, [reloadListSubjects]);

  function chanegUpSubject(id: number) {
    const validateDuplicateSubjects = listSubjectsOfUser.filter(s => s.id == id)
    if (validateDuplicateSubjects.length >= 1) {
      return alert("La materia ya la tienes en tus materias")
    }
    const subjectDown = listAviableSubjects.filter((s) => s.id != id);
    const subjectUp = listAviableSubjects.filter((s) => s.id == id);
    setListAviableSubjects(subjectDown);
    setListSubjectsUps([...listSubjectsUps, subjectUp[0]]);
  }

  function changeStateSubject(id: number) {
    if (listSubjectsUps.length >= 10) {
        return alert("Solo puedes dar de alta 10 materias")
    }
    const subjectDown = listSubjectsUps.filter((s) => s.id != id);
    const subjectUp = listSubjectsUps.filter((s) => s.id == id);
    setListAviableSubjects([...listAviableSubjects, subjectUp[0]]);
    setListSubjectsUps(subjectDown);
  }

  function downSubjectsOfTeacher(id: number) {
    const subjectDown = listSubjectsOfUser.filter((s) => s.id != id);
    const subjectUp = listSubjectsOfUser.filter((s) => s.id == id);
    setListSubjectsDowns([...listSubjectsDowns, subjectUp[0]]);
    setListSubjectsOfUser(subjectDown);
  }

  function upSubjectOfTeacher(id: number) {
    const subjectDown = listSubjectsDowns.filter((s) => s.id != id);
    const subjectUp = listSubjectsDowns.filter((s) => s.id == id);
    setListSubjectsDowns(subjectDown);
    setListSubjectsOfUser([...listSubjectsOfUser, subjectUp[0]]);
  }

  async function sendUpsAndDowns(){
    if (listSubjectsUps.length <= 0 && listSubjectsDowns.length !<= 0) {
        return alert("No puedes enviar altas vacias")
    }
    try {
        if (dataUser.role.name == RolesEnum[0]) {
          await clientAuthFetch.post("/api/upsanddowns/student",{
            coursesUps: listSubjectsUps,
            coursesDowns: listSubjectsDowns
          })
        }
        else if(dataUser.role.name == RolesEnum[1]){
          await clientAuthFetch.post("/api/upsanddowns/teacher",{
            coursesUps: listSubjectsUps,
            coursesDowns: listSubjectsDowns
          })
        }else{
          alert("rol inexistente")
        }
        alert("Materias actulizadas correctamente")
        setReloadListSubjects(!reloadListSubjects)
    } catch (e) {
        console.log(e)
        alert(e)
    }
  }

  return (
    <>
      <TableUpsAndDows title="Materias disponibles">
        {loadListSubjects ? (
          listAviableSubjects.map((s) => {
            return (
              <CardSubject
                key={s.id}
                courseId={s.id}
                subjectId={s.subject.id}
                nameSubject={s.subject.name}
                subjectCredits={s.subject.credits}
                teacherSubjectId={s.teacher ? s.teacher.id : null}
                teacherSubjectName={s.teacher ? s.teacher.name : null}
                teacherSubjectImage={s.teacher ? s.teacher.image : null}
                teacherSubjectlastName={s.teacher ? s.teacher.lastName : null}
                teamId={s.team.id}
                teamName={s.team.name}
                listSchedules={s.schedule}
                changeStateDown={chanegUpSubject}
              />
            );
          })
        ) : (
          <LoadingSection />
        )}
      </TableUpsAndDows>
      <TableUpsAndDows title="Altas">
        {listSubjectsUps.map((s) => {
          return (
            <CardSubject
              key={s.id}
              courseId={s.id}
              subjectId={s.subject.id}
              nameSubject={s.subject.name}
              subjectCredits={s.subject.credits}
              teacherSubjectId={s.teacher ? s.teacher.id : null}
              teacherSubjectName={s.teacher ? s.teacher.name : null}
              teacherSubjectImage={s.teacher ? s.teacher.image : null}
              teacherSubjectlastName={s.teacher ? s.teacher.lastName : null}
              teamId={s.team.id}
              teamName={s.team.name}
              listSchedules={s.schedule}
              changeStateUp={changeStateSubject}
            />
          );
        })}
      </TableUpsAndDows>
      {listSubjectsDowns.length > 0 ? (
        <>
          <TableUpsAndDows title="Bajas">
            {listSubjectsDowns.map((s) => {
              return (
                <CardSubject
                  key={s.id}
                  courseId={s.id}
                  subjectId={s.subject.id}
                  nameSubject={s.subject.name}
                  subjectCredits={s.subject.credits}
                  teacherSubjectId={s.teacher ? s.teacher.id : null}
                  teacherSubjectName={s.teacher ? s.teacher.name : null}
                  teacherSubjectImage={s.teacher ? s.teacher.image : null}
                  teacherSubjectlastName={s.teacher ? s.teacher.lastName : null}
                  teamId={s.team.id}
                  teamName={s.team.name}
                  listSchedules={s.schedule}
                  changeStateUp={upSubjectOfTeacher}
                />
              );
            })}
          </TableUpsAndDows>
        </>
      ) : (
        <></>
      )}
      <TableUpsAndDows title="Tus materias">
        {listSubjectsOfUser.length > 0 ? (
          listSubjectsOfUser.map((s) => {
            return (
              <CardSubject
                key={s.id}
                courseId={s.id}
                subjectId={s.subject.id}
                nameSubject={s.subject.name}
                subjectCredits={s.subject.credits}
                teacherSubjectId={s.teacher ? s.teacher.id : null}
                teacherSubjectName={s.teacher ? s.teacher.name : null}
                teacherSubjectImage={s.teacher ? s.teacher.image : null}
                teacherSubjectlastName={s.teacher ? s.teacher.lastName : null}
                teamId={s.team.id}
                teamName={s.team.name}
                listSchedules={s.schedule}
                changeStateUp={downSubjectsOfTeacher}
              />
            );
          })
        ) : (
          <tr>
            <h3>No tienes materias</h3>
          </tr>
        )}
      </TableUpsAndDows>
      <div className="w-full h-10">
        <button
          className="mt-4 mx-auto block bg-orangeLight p-1 w-48 rounded-2xl text-white font-bold"
          onClick={sendUpsAndDowns}
        >
          Guardar
        </button>
      </div>
    </>
  );
}
