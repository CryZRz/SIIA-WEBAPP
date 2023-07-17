import { DataUserIn } from "../../User/dataUser"

export interface DataCommentIn {
    id: number
    comment: string
    author: DataUserIn
    createdAt: string
    updatedAt: string
}