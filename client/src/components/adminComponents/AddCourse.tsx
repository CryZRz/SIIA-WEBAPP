import { useEffect, useState } from "react";
import { clientAuthFetch } from "../../helpers/fetching/clientFecth";
import { DataCourseIn } from "../../Interfaces/Course/dataCourse";
import CardProfileLi from "../CardProfileLi";
import LoadingSection from "../LoadingSection";
import TableCourse from "./TableCourse";

export default function AddCourse({
  actionAddCourse,
}: {
  actionAddCourse: (c: DataCourseIn) => void;
}) {
  const [saveListCourses, setSaveListCourses] = useState<DataCourseIn[]>([]);
  const [loadListCourses, setLoadListCourses] = useState(false);

  async function getListCourses() {
    try {
      setLoadListCourses(false);
      const reqListCourses = await clientAuthFetch.get("/api/admin/courses");
      setSaveListCourses(reqListCourses.data.data);
      setLoadListCourses(true);
      console.log(reqListCourses);
    } catch (e) {
      alert(e);
    }
  }

  useEffect(() => {
    getListCourses();
  }, []);

  return (
    <>
      {loadListCourses ? (
        <TableCourse>
          {saveListCourses.map((c) => {
            return (
              <tr
                key={c.id}
                className="text-center hover:bg-orangeLight cursor-pointer"
                onClick={(e) => {
                  actionAddCourse(c);
                }}
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
    </>
  );
}
