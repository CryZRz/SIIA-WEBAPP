import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { pathAPIImages } from "../helpers/constants";
import { clientAuthFetch } from "../helpers/fetching/clientFecth";
import { DataPostIn } from "../Interfaces/Post/dataPost";
import LoadingSection from "./LoadingSection";

export default function PostsPreview() {
  const [listPost, setListPost] = useState<DataPostIn[]>([]);
  const [loadListPost, setLoadListPost] = useState(false);

  useEffect(() => {
    async function getAllPost() {
      try {
        const reqAllPost = await clientAuthFetch.get("/api/posts");
        console.log(reqAllPost.data)
        setListPost(reqAllPost.data.data);
        setLoadListPost(true);
      } catch (e) {
        alert(e);
        console.log(e)
      }
    }

    getAllPost();
  }, []);

  return (
    <div className="w-full mt-4">
      <div>
        <h1 className="text-orangeLight text-4xl font-Anton ml-12">Ultimos posts</h1>
      </div>
      <div className="flex items-center justify-center flex-wrap">
        {loadListPost ? (
          listPost.slice(0, 3).map((p) => {
            return (
              <a
                href="#"
                className="flex flex-col m-4 items-center bg-white border shadow-2xl rounded-lg md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="w-80 p-2">
                  <section className="w-full h-14 flex items-center">
                    <div className="w-14 h-14">
                      <img
                        className="w-12 h-12 rounded-full"
                        src={`${pathAPIImages}/profiles/${p.author.image}`}
                        alt={`image user ${p.author.name}`}
                      />
                    </div>
                    <div className="ml-1">
                      <h3 className="text-base text-bold">
                        {p.author.name} {p.author.lastName}
                      </h3>
                    </div>
                  </section>
                  <section className="w-full h-80 mt-2">
                    <div>
                      <p>{p.title}</p>
                    </div>
                    <div>
                      <img
                        className="w-full h-72"
                        src={`${pathAPIImages}/posts/${p.image}`}
                        alt={`image posts ${p.title}`}
                      />
                    </div>
                  </section>
                  {p.comments.length >= 1 ? (
                    <section className="w-full h-14">
                      <div className="h-14 w-full flex">
                        <div>
                          <img
                            className="w-10 h-10 rounded-full"
                            src={`${pathAPIImages}/profiles/${p.comments[0].author.image}`}
                            alt={`image user ${p.comments[0].author.name}`}
                          />
                        </div>
                        <div className="ml-2 flex flex-col">
                          <div>
                            <span className="text-sm text-bold">{p.comments[0].author.name}</span>
                          </div>
                          <div>
                            <p className="text-sm">{p.comments[0].comment}</p>
                          </div>
                        </div>
                      </div>
                    </section>
                  ) : (
                    <section className="w-full h-14 text-sm">
                        <span>Sin comentarios</span>
                    </section>
                  )}
                </div>
              </a>
            );
          })
        ) : (
          <LoadingSection />
        )}
      </div>
      <div className="w-full p-6 text-orangeLight">
            <Link to={"/publicaciones"} className="block border-transparent border-2 border-b-orangeLight ml-24 w-28 text-center p-2 text-base font-bold">
              Ver todos
            </Link>
        </div>
    </div>
  );
}
