import "../assets/styles/cardPost.styles.css";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { DataContextLogin } from "../context/Context";
import { Link } from "react-router-dom";
import CommentPost from "./CommentPost";
import { MoreHoriz } from "iconoir-react";
import { formatTimeXTime } from "../helpers/formatTime";
import { DataCommentIn } from "../Interfaces/Post/comment/dataCommet";
import { pathAPIImages } from "../helpers/constants";
import { clientAuthFetch } from "../helpers/fetching/clientFecth";
import RolesEnum from "../enums/Role";

export default function CardPost({
  postId,
  imageUser,
  name,
  lastName,
  title,
  image,
  date,
  comments,
  authorId,
  showFullComments,
  reloadPost,
}: {
  postId: number;
  imageUser: string;
  name: string;
  lastName: string;
  title: string;
  image: string;
  date: string;
  comments: DataCommentIn[];
  authorId: number;
  showFullComments: boolean;
  reloadPost: (p: number) => void;
}) {
  const [saveComment, setSaveComment] = useState("");
  const [showEditPost, setShowEditPost] = useState(false);
  const [saveImageUpdatePost, setSaveImageUpdatePost] = useState<File | null>();
  const [saveNameImageUpdate, setSaveNameImageUpdate] = useState("");
  const [saveTitlePostUpdate, setSaveTitlePostUpdate] = useState(title);
  const { dataUser } = useContext(DataContextLogin);

  function handleChangeComment({
    target: { value },
  }: ChangeEvent<HTMLTextAreaElement>) {
    setSaveComment(value);
  }

  async function sendComment(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (saveComment == "" || saveComment.length <= 0) {
      return alert("No puedes enviar comentarios vacios");
    } else {
      try {
        await clientAuthFetch.post(
          "/api/comments",
          {
            postId,
            comment: saveComment,
          }
        );
        reloadPost(postId);
        alert("tu comentario se ha publicado");
      } catch (e) {
        alert("error al enviar el comenario");
        console.log(e)
      }
    }
  }

  function silceComments() {
    if (!showFullComments) {
      return comments.slice(0, 3);
    }

    return comments;
  }

  async function sendRemovePost() {
    try {
      await clientAuthFetch.delete(`/api/post/${postId}`);
      alert("Post eliminado correctamente");
    } catch (e) {
      alert(e);
    }
  }

  function handleChangeImageUpdate({
    target: { files, value },
  }: ChangeEvent<HTMLInputElement>) {
    const fileImage = files[0];
    if (fileImage.type !== "image/jpeg" || fileImage.size > 20 * 1000000) {
      return alert("Solo puedes subir archivos de tipo imagen y menor a 20mb");
    } else {
      setSaveNameImageUpdate(value);
      setSaveImageUpdatePost(fileImage);
      alert(
        "Esto solo es una previsualizacion de la imagen debes dar en actualizar para guardarlo"
      );
    }
  }

  function hanldeChangeTitlePost({target: {value}} : ChangeEvent<HTMLTextAreaElement>){
    setSaveTitlePostUpdate(value)
  }

  async function sendUpdatePost(){
    if (saveTitlePostUpdate == "") {
      return alert("No pudes actulizar un post con titulo vacio")
    }else{
      const formDataUpdate = new FormData()
      formDataUpdate.append("title", saveTitlePostUpdate)
      if (saveImageUpdatePost != null) {
        formDataUpdate.append("image", saveImageUpdatePost)
      }
      try {
        /**
         * ?_method=PUT is used because laravel doesn't read the formdata in put method
         */
        await clientAuthFetch.post(`/api/post/${postId}?_method=PUT`, formDataUpdate)
        alert("Post actualizado correctamente")
        //return reloadPost(postId);
      } catch (e) {
        console.log(e)
        return alert(e)
      }
    }
  }


  return (
    <div className="card-post-container">
      <div className="card-post-sections">
        <div className="card-post-section-title">
          <div className="card-post-author-info">
            <div className="card-post-author-image-content">
              <img
                src={`${pathAPIImages}/profiles/${imageUser}`}
                alt={`imagen susario ${imageUser}`}
              />
            </div>
            <div className="card-post-author-name-date-content">
              <div className="card-post-author-name-edit-content">
                <Link to={`/profile/${authorId}`}>
                  <h3>
                    {name} {lastName}
                  </h3>
                </Link>
                {authorId == dataUser.id || dataUser.role.name == RolesEnum[2] && (
                  <ul className="btn-list-more-options-comment">
                  <li>
                    <MoreHoriz width={25} height={25} />
                    <ul className="list-more-options-comment">
                      <li>
                        <button
                          onClick={(e) => {
                            setShowEditPost(true);
                          }}
                        >
                          Editar
                        </button>
                      </li>
                      <li>
                        <button onClick={sendRemovePost}>Eliminar</button>
                      </li>
                    </ul>
                  </li>
                </ul>
                )}
              </div>
              <p>{formatTimeXTime(date)}</p>
            </div>
          </div>
          <div className="card-post-title-content">
            {showEditPost ? (
              <textarea value={saveTitlePostUpdate} placeholder="Ingresa un titulo" onChange={hanldeChangeTitlePost}></textarea>
            ) : (
              <span>{title}</span>
            )}
          </div>
        </div>
        <div className="card-post-section-image" style={showEditPost ? {height : "auto"} : {}}>
          <div className="card-post-image-content">
            {showEditPost ? (
              <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-65 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (Optional. 500x500px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  value={saveNameImageUpdate}
                  onChange={handleChangeImageUpdate}
                />
              </label>
            </div>
            ) : (
              <img
                src={`${pathAPIImages}/posts/${image}`}
                alt={`imagen post ${title}`}
              />
            )}
            {
              saveImageUpdatePost != null && showEditPost &&
              <div className="card-post-update-image-content">
                <img src={URL.createObjectURL(saveImageUpdatePost)} alt={`imagen post ${title}`} />
              </div>
            }
          </div>
        </div>
        {
          showEditPost &&
          <div className="btns-update-post-container">
            <button onClick={e => {setShowEditPost(false)}}>Cancelar</button>
            <button onClick={sendUpdatePost}>Actualiar</button>
          </div>
        }
        <div className="card-post-section-comments">
          <span>Comentarios: {comments.length}</span>
          <div className="card-post-list-comments-container">
            {silceComments().map((c) => {
              return (
                <CommentPost
                  key={c.id}
                  name={c.author.name}
                  lastName={c.author.lastName}
                  image={c.author.image}
                  authorPostId={authorId}
                  commentId={c.id}
                  authorCommentId={c.author.id}
                  date={c.createdAt}
                  comment={c.comment}
                  postId={postId}
                  reloadPost={reloadPost}
                />
              );
            })}
            {!showFullComments && comments.length > 3 && (
              <div className="show-more-comments-content">
              <button>
                <Link to={`/post/${postId}`}>Ver todos los comentarios</Link>
              </button>
            </div>
            )}
          </div>
        </div>
        <div className="card-post-section-create-comment">
          <form
            className="card-post-section-create-comment-form"
            onSubmit={sendComment}
          >
            <textarea
              placeholder="Introduce un comentario"
              onChange={handleChangeComment}
            ></textarea>
            <button>Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
