import { useEffect, useState } from "react";
import LoadingSection from "./LoadingSection";
import { formatTimeDate } from "../helpers/formatTime";
import TableCardKardexStudent from "./TableCardKardexStudent";
import { clientAuthFetch } from "../helpers/fetching/clientFecth";
import { DataCourseKardexStudentIn } from "../Interfaces/Kardex/dataKardex";

export default function CardKardexStudent() {
  const [saveKardex, setSaveKardex] = useState<DataCourseKardexStudentIn[]>([]);
  const [loadKardex, setLoadKardex] = useState(false);

  useEffect(() => {
    async function getKardex() {
      try {
        const reqKardex = await clientAuthFetch.get("/api/kardex");
        console.log(reqKardex)
        setSaveKardex(reqKardex.data);
        setLoadKardex(true);
      } catch (e) {
        console.log(e)
        alert(e);
      }
    }

    getKardex();
  }, []);

  return (
    <div className="w-full">
      {loadKardex ? (
        <div className="relative overflow-x-auto mt-4 pb-12">
          <div className="w-11/12 mx-auto">
          <TableCardKardexStudent>
            {saveKardex.map((s) => {
              return (
                <tr
                  key={s.id}
                  className="bg-white dark:bg-gray-800"
                >
                  <td className="px-6 py-4">{s.clave}</td>
                  <td className="px-6 py-4">{s.subject}</td>
                  <td className="px-6 py-4">{s.credits}</td>
                  {s.ratings.map((q) => {
                    return (
                      <>
                        <td className="px-6 py-4">
                          {q.createdAt != null ? (
                            <span>{formatTimeDate(q.createdAt)}</span>
                          ) : (
                            <span>Pendiente</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {q.qualification.qualification != null ? (
                            <span>{q.qualification.qualification}</span>
                          ) : (
                            <span>Pendiente</span>
                          )}
                        </td>
                      </>
                    );
                  })}
                </tr>
              );
            })}
          </TableCardKardexStudent>
          </div>
        </div>
      ) : (
        <LoadingSection />
      )}
    </div>
  );
}
