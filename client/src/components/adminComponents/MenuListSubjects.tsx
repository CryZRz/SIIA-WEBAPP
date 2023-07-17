import { useState, useEffect } from "react";
import { clientAuthFetch } from "../../helpers/fetching/clientFecth";
import { DataSubjectIn } from "../../Interfaces/Subject/dataSubject";
import LoadingSection from "../LoadingSection";
import Pagination from "../Pagination";
import TableSubject from "../TableSubject";

export default function MenuListSubjects({action} : {action : (p: DataSubjectIn) => void}) {

  const [loadListSubjects, setLoadListSubjects] = useState(false);
  const [saveListSubjects, setSaveListSubjects] = useState<DataSubjectIn[]>([]);

  async function getListSubjects() {
    try {
      setLoadListSubjects(false);
      const listSubjects = await clientAuthFetch.get("/api/admin/subjects");
      setSaveListSubjects(listSubjects.data.data);
      setLoadListSubjects(true);
      console.log(listSubjects.data);
    } catch (e) {
      alert(e);
    }
  }

  useEffect(() => {
    getListSubjects();
  }, []);

  return (
    <div className="w-full">
      <div className="w-full bg-oceanBlue text-white font-bold text-center">
        <span>Materia seleccionada</span>
      </div>
      {loadListSubjects ? (
        <TableSubject>
          {saveListSubjects.map((s) => {
            function addSubject() {
              action(s);
            }

            return (
              <tr
                key={s.id}
                className="hover:bg-orangeLight cursor-pointer"
                onClick={addSubject}
              >
                <td className="p-1">{s.id}</td>
                <td className="p-1">{s.name}</td>
                <td className="p-1">{s.credits}</td>
              </tr>
            );
          })}
        </TableSubject>
      ) : (
        <LoadingSection />
      )}
      <Pagination
        start={0}
        end={10}
        fetchingData={getListSubjects}
        isLoading={!loadListSubjects}
      />
    </div>
  );
}
