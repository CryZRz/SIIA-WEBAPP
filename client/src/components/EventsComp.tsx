import { useState, useEffect } from "react";
import LoadingSection from "./LoadingSection";
import CardEvent from "./CardEvent";
import { DataEventIn } from "../Interfaces/Events/dataEvents";

export default function EventsComp() {
  const [loadListEvents, setLoadListEvents] = useState(false);
  const [listEvents, setListEvents] = useState<DataEventIn[]>([]);

  useEffect(() => {
    async function getEventsSchool() {
      try {
        //todo
      } catch (e) {
        console.log(e);
      }
    }

    getEventsSchool();
  }, []);

  return (
    <div className="w-full">
      <div className="w-11/12 mx-auto my-4 flex justify-center items-center flex-wrap">
        <div className="w-full text-center">
            <h1 className="text-orangeLight text-4xl font-bold">Eventos</h1>
        </div>
        {loadListEvents ? (
          listEvents.map((e, i) => {
            return (
              <CardEvent
                key={e.title}
                title={e.title}
                image={e.image}
                description={e.description}
                url={"/"}
              />
            );
          })
        ) : (
          <LoadingSection />
        )}
      </div>
    </div>
  );
}
