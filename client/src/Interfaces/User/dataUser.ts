import DataModelBaseIn from "../ModelBase"
import { DataTeamIn } from "../Team/dataTeam"
import { DataEducationalPlanIn } from "./EducationalPlan/dataEducationalPlan"
import { DataProfileUserIn } from "./Profile/dataProfile"
import { DataRoleIn } from "./Role/dataRole"
import { DataSemesterIn } from "./Semester/dataSemester"

export interface DataUserIn extends DataModelBaseIn {
    email: string
    image: string
    lastName: string
    name: string
    profile: DataProfileUserIn
    role: DataRoleIn
    semester: DataSemesterIn
    team: DataTeamIn
    educationalPlan: DataEducationalPlanIn
}