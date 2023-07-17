import { DataUserIn } from "../../../Interfaces/User/dataUser";
import { dataDefaultTeam } from "../Team/dataDefaultTeam";
import { dataDefaultProfile } from "./Profile/dataDefaultProfile";
import { dataDefaultRole } from "./Role/dataDefaultRole";
import { dataDefaultSemester } from "./Semester/dataDefaultSemester";

export const dataDefaultUse: DataUserIn = {
    id: 0,
    email: "",
    image: "",
    name: "",
    lastName: "",
    educationalPlan: {
        id: 0,
        name: "",
        year: 0,
        created_at: "",
        updated_at: ""
    },
    profile: dataDefaultProfile,
    role: dataDefaultRole,
    team: dataDefaultTeam,
    semester: dataDefaultSemester
}