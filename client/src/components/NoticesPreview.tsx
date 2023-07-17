import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { clientAuthFetch } from "../helpers/fetching/clientFecth";
import { DataNoticeIn } from "../Interfaces/Events/dataNoticeIn";
import LoadingSection from "./LoadingSection";
import NoticeCard from "./NoticeCard";

export default function NoticesPreview() {

  const [listNotices, setListNotices] = useState<DataNoticeIn[]>([]);
  const [loadLostNotices, setLoadLostNotices] = useState(false);

  useEffect(() => {
    async function getNotices() {
      try {
        const reqNotices = await clientAuthFetch.get("/api/notices")
        console.log(reqNotices.data)
        setListNotices(reqNotices.data.data);
        setLoadLostNotices(true);
      } catch (e) {
        alert(e);
      }
    }

    getNotices();
  }, []);

  return (
    <div className="w-full">
      <div className="p-4">
          <h1 className="text-orangeLight text-4xl font-Anton ml-24 text-bold">Avisos</h1>
        </div>
        <div className="flex items-center justify-center flex-wrap gap-y-6 gap-x-20">
        {loadLostNotices ? (
          listNotices.map((n) => {
            return (
              <NoticeCard
                key={n.id}
                title={n.title}
                image={n.image}
                description={n.description}
                url={"/"}
              />
            );
          })
        ) : (
          <LoadingSection />
        )}
        </div>
        <div className="w-full p-6 text-orangeLight">
            <Link to={"/avisos"} className="block border-transparent border-2 border-b-orangeLight ml-24 w-24 p-2 text-base font-bold">
              Ver todos
            </Link>
        </div>
    </div>
  );
}


