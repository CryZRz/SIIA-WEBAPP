import { DataUserIn } from "../User/dataUser"
import { DataCommentIn } from "./comment/dataCommet"

export interface DataPostIn {
    id: number
    title: string
    image: string
    author: DataUserIn
    comments: DataCommentIn[]
    createdAt: string
    updatedAt: string
}