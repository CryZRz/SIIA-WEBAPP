import DataModelBaseIn from "../ModelBase"
import { DataSemesterIn } from "../User/Semester/dataSemester"

export interface DataTeamIn extends DataModelBaseIn{
    name: string
    semester: DataSemesterIn
}