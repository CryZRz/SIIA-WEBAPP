import { useState, useEffect } from "react";
import { clientAuthFetch } from "../../helpers/fetching/clientFecth";
import { DataCourseIn } from "../../Interfaces/Course/dataCourse";
import { CourseIn } from "../../Interfaces/SubjectIn";
import CardProfileLi from "../CardProfileLi";
import Pagination from "../Pagination";
import TableCourse from "./TableCourse";

export default function MenuListCourses({
  action,
}: {
  action: (p: DataCourseIn) => void;
}) {
  const [listCourses, setListCourses] = useState<DataCourseIn[]>([]);
  const [loadListCourses, setLoadListCourses] = useState(false);

  async function getListCourses() {
    try {
      setLoadListCourses(false);
      const reqListPeriods = await clientAuthFetch.get("/api/admin/courses");
      console.log(reqListPeriods)
      setListCourses(reqListPeriods.data.data);
      setLoadListCourses(true);
    } catch (e) {
      alert(e);
    }
  }

  useEffect(() => {
    getListCourses()
  }, []);

  return (
    <div>
      {
        loadListCourses && 
        <TableCourse>
        {listCourses.map((c) => {

            function actionSubject(){
                action(c)
            }

          return (
            <tr
              onClick={actionSubject}
              className="hover:bg-orangeLight cursor-pointer hover:text-white"
              key={c.id}
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
              <td>{c.team.name}</td>
              <td>{c.typeOfGroup}</td>
              <td>{c.period.name}</td>
            </tr>
          );
        })}
      </TableCourse>
      }
    </div>
  );
}
