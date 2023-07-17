import { useEffect, useState } from "react";
import { clientAuthFetch } from "../../helpers/fetching/clientFecth";
import { formatTimeDate } from "../../helpers/formatTime";
import { DataPeriodIn } from "../../Interfaces/Period/dataPeriod";
import LoadingSection from "../LoadingSection";
import Pagination from "../Pagination";
import TablePeriod from "../TablePeriod";

export default function MenuListPeriods({
  action,
  regularization
  } : 
  {
    action : (p: DataPeriodIn) => void
    regularization?: boolean
  }) {
  const [listPeriods, setListPeriods] = useState<DataPeriodIn[]>([]);
  const [loadListPeriods, setLoadListPeriods] = useState(false);

  async function getListPeriods() {

    try {
      setLoadListPeriods(false);
      const reqListPeriods = await clientAuthFetch.get("/api/periods");
      console.log(reqListPeriods)
      setListPeriods(reqListPeriods.data.data);
      setLoadListPeriods(true);
    } catch (e) {
      console.log(e)
      alert(e);
    }
  }

  useEffect(() => {
    getListPeriods();
  }, []);

  return (
    <div className="w-full">
      {loadListPeriods ? (
        <TablePeriod>
          {listPeriods.map((p, i) => {

            function addPeriod(){
                action(p)
            }

            return (
              <tr
                key={p.id}
                className="hover:bg-orangeLight hover:text-white"
                onClick={addPeriod}
              >
                <td className="p-1">{p.id}</td>
                <td className="p-1">{p.name}</td>
                <td className="p-1">{formatTimeDate(p.startDate)}</td>
                <td className="p-1">{formatTimeDate(p.endDate)}</td>
                <td className="p-1">{p.typeOfPeriod}</td>
              </tr>
            );
          })}
        </TablePeriod>
      ) : (
        <LoadingSection />
      )}
      <Pagination
        start={0}
        end={10}
        fetchingData={getListPeriods}
        isLoading={!loadListPeriods}
      />
    </div>
  );
}
