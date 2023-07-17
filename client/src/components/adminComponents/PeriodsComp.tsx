import { useState } from "react";
import MenuCreatePeriod from "./MenuCreatePeriod";
import MenuListPeriods from "./MenuListPeriods";
import { DataPeriodIn } from "../../Interfaces/Period/dataPeriod";

export default function PeriodsComp() {
  const [savePeriodEdit, setSavePeriodEdit] = useState<DataPeriodIn>();
  const [showMenuCreatePeriod, setShowMenuCreatePeriod] = useState(false);
  const [showMenuEditPeriod, setShowMenuEditPeriod] = useState(false);

  function addPeriodEdit(period: DataPeriodIn){
    setSavePeriodEdit(period)
    setShowMenuEditPeriod(true)
  }

  return (
    <div>
      <div className="relative overflow-x-auto my-4">
        <MenuCreatePeriod
          showMenu={showMenuCreatePeriod}
          setShowMenu={setShowMenuCreatePeriod}
        />
        <MenuCreatePeriod
          showMenu={showMenuEditPeriod}
          setShowMenu={setShowMenuEditPeriod}
          periodEdit={savePeriodEdit}
          setPeriodEdit={setSavePeriodEdit}
        />
        <div className="w-4/5 mx-auto m-2 text-4xl font-bold text-orangeLight">
          <h1>Periodos</h1>
        </div>
        <div className="w-4/5 mx-auto mb-2">
          <button
            className="w-full bg-orangeLight p-1 text-white"
            onClick={(e) => {
              setShowMenuCreatePeriod(true);
            }}
          >
            Crear periodo
          </button>
        </div>
        <div className="w-4/5 mx-auto mt-5">
          <MenuListPeriods
            action={addPeriodEdit}
          />
        </div>
      </div>
    </div>
  );
}
