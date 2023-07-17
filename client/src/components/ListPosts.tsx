import { useEffect, useState } from "react"
import LoadingSection from "./LoadingSection"

import CardPost from "./CardPost"
import { DataPostIn } from "../Interfaces/Post/dataPost"
import { clientAuthFetch } from "../helpers/fetching/clientFecth"

export default function ListPosts() {

  const [listPost, setListPost] = useState<DataPostIn[]>([])
  const [loadListPost, setLoadListPost] = useState(false)

  useEffect(()=> {
    async function getAllPost(){
      try {
        const reqAllPost = await clientAuthFetch.get("/api/posts")
        setListPost(reqAllPost.data.data)
        console.log(reqAllPost.data.data)
        setLoadListPost(true)
      } catch (e) {
        alert(e)
      }
    }

    getAllPost()
  }, [])

  async function reloadPost(postId : number){
    try {
      
    } catch (e) {
      alert(e)
    }
  }

  return (
    <div>
      {
        loadListPost ?
        listPost.map(p => {
          return <CardPost
            key={p.id}
            postId={p.id}
            title={p.title}
            imageUser={p.author.image}
            image={p.image}
            date={p.createdAt}
            name={p.author.name}
            lastName={p.author.lastName}
            comments={p.comments}
            authorId={p.author.id}
            showFullComments={false}
            reloadPost={reloadPost}
          />
        })
        :
        <LoadingSection/>
      }
    </div>
  )
}
