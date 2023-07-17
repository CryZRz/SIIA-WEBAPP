import { useState, useEffect } from "react";
import { dataDefaultTeam } from "../../helpers/dataDeafult/Team/dataDefaultTeam";
import { clientAuthFetch } from "../../helpers/fetching/clientFecth";
import { DataTeamIn } from "../../Interfaces/Team/dataTeam";
import LoadingSection from "../LoadingSection";
import Pagination from "../Pagination";
import TableTeam from "../TableTeam";

export default function MenuListTeams({action} : {action : (p : DataTeamIn) => void}) {

  const [loadListTeams, setLoadListTeams] = useState(false);
  const [saveListTeams, setSaveListTeams] = useState<DataTeamIn[]>([dataDefaultTeam]);

  async function getListTeams() {
    try {
      setLoadListTeams(false);
      const listTeams = await clientAuthFetch.get("/api/teams");
      setSaveListTeams(listTeams.data.data);
      setLoadListTeams(true);
    } catch (e) {
      alert(e);
    }
  }

  useEffect(() => {
    getListTeams();
  }, []);

  return (
    <div className="w-full">
      <div className="w-full bg-oceanBlue text-white font-bold text-center">
        <span>Grupo seleccionado</span>
      </div>
      {loadListTeams ? (
        <div>
          <TableTeam>
            {saveListTeams.map((t) => {

              function addTeam() {
                action(t);
              }

              return (
                <tr
                  key={t.id}
                  className="hover:bg-orangeLight cursor-pointer"
                  onClick={addTeam}
                >
                  <td className="p-1">{t.id}</td>
                  <td className="p-1">{t.name}</td>
                  <td className="p-1">{t.semester.id}</td>
                </tr>
              );
            })}
          </TableTeam>
        </div>
      ) : (
        <LoadingSection />
      )}
      <Pagination
        start={0}
        end={10}
        isLoading={!loadListTeams}
        fetchingData={getListTeams}
      />
    </div>
  );
}
