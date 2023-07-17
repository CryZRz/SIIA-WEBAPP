import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { pathAPIImages } from "../helpers/constants";
import { clientAuthFetch } from "../helpers/fetching/clientFecth";
import { getCookie } from "../helpers/getCookie";
import { DataCourseKardexTeacherIn, DataSendQualificationsKardexIn } from "../Interfaces/Kardex/dataKardex";
import { SubjectKardexTeacherIn } from "../Interfaces/SubjectIn";
import ListQualifications from "./ListQualifications";
import LoadingSection from "./LoadingSection";

export default function CardKardexTeacher({typeQualifications}: {typeQualifications : string}) {

  const [listSubjects, setListSubjects] = useState<DataCourseKardexTeacherIn[]>([]);
  const [saveListQualifcations, setSaveListQualifcations] = useState
  <DataSendQualificationsKardexIn[]>
  ([])
  const [loadListSubjects, setLoadListSubjects] = useState(false);
  const token = getCookie("token");
  let urlListQualifications : string
  typeQualifications == "regularization" ? urlListQualifications = "http://localhost:3000/regularizations" : urlListQualifications = "http://localhost:3000/subjects/teacher"
  
  useEffect(() => {
    async function getKardexTeacher() {

      try {
        const reqKardexTeacher = await clientAuthFetch.get("/api/kardex");
        setListSubjects(reqKardexTeacher.data.data);
        setLoadListSubjects(true);
      } catch (e) {
        alert(e);
      }
    }

    getKardexTeacher();
  }, []);

  async function sendQualificationsSubjects(){
    let errorQualification = false

    console.log(saveListQualifcations)

    saveListQualifcations.map(s => {
      if (typeof(s.qualification) == "string") {
        let convertQualificationNumber = parseFloat(s.qualification)
        if (isNaN(convertQualificationNumber) && s.qualification != "D2") {
          errorQualification = true
        }
        else if (convertQualificationNumber < 1 || convertQualificationNumber > 10) {
          errorQualification = true
        }
      }
      else if (s.qualification == null) {
        errorQualification = true
      }
    })
    
    if (errorQualification) {
      return alert("Hay calificaciones no validas solo puedes poner calificaciones de 1 a 10 o D2")
    }

    try {
      const r = await clientAuthFetch.post("/api/kardex", {
        qualifications : saveListQualifcations
      })
      console.log(r)
      alert("calificaciones subidas correctamente")
    } catch (e) {
      console.log(e)
      alert(e)
    }

  }

  function handleChangeValueSubjectOne(qualification: string, id: number){
    setSaveListQualifcations([...saveListQualifcations, {
      id,
      qualification  
     }])
  }

  return (
    <div className="w-full">
      {loadListSubjects ? (
        <div className="relative overflow-x-auto mt-6 pb-12">
          <table className="mx-auto w-9/12 shadow-2xl text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-center uppercase bg-oceanBlue text-white">
              <tr>
                <th scope="col" className="px-6 py-3 ">
                  Clave
                </th>
                <th scope="col" className="px-6 py-3">
                  Materia
                </th>
                <th scope="col" className="px-6 py-3">
                  Creditos
                </th>
                <th scope="col" className="px-6 py-3">
                  Oportunidad
                </th>
                <th scope="col" className="px-6 py-3">
                  Estudiante
                </th>
                <th scope="col" className="px-6 py-3">
                  Grupo
                </th>
                <th scope="col" className="px-6 py-3">
                    Calificacion
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {listSubjects.map((s, i) => {
                return (
                  <tr key={s.id + i} className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-4">{s.subject.id}</td>
                    <td className="px-6 py-4">{s.subject.name}</td>
                    <td className="px-6 py-4">{s.subject.credits}</td>
                    <td className="px-6 py-4">{"opportunity"}</td>
                    {
                      s.students.map(student => (
                        <>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center w-52">
                            <div className="w-12 h-12">
                              <img
                                className="rounded-full w-full h-full"
                                src={`${pathAPIImages}/profiles/${student.student.image}`}
                                alt={`image user ${student.student.name}`}
                              />
                            </div>
                            <Link to={`/profile/${student.student.id}`}>
                              <h3 className="inline ml-2">
                                {student.student.name} {student.student.name}
                              </h3>
                            </Link>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {s.team.name}
                        </td>
                          <td className="px-6 py-4">
                            {student.qualification.qualification != null ? (
                              <span>
                                  {student.qualification.qualification}
                              </span>
                            ) : (
                              <select 
                                onChange={e => {handleChangeValueSubjectOne(e.target.value, student.qualification.id)}} 
                                className="w-16 h-6 bg-zinc-300 outline-none text-center text-bold">
                                <ListQualifications/>
                              </select>
                            )}
                          </td>
                      </>))
                    }
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="w-full h-10">
            <button
              className="mt-4 mx-auto block bg-orangeLight p-1 w-48 rounded-2xl text-white font-bold"
              onClick={sendQualificationsSubjects}
            >
              Guardar
            </button>
        </div>
        </div>
      ) : (
        <LoadingSection />
      )}
    </div>
  );
}
