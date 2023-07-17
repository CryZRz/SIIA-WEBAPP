import { DataCourseIn } from "../../../Interfaces/Course/dataCourse";
import { dataDataDefaultPeriod } from "../period/dataDefaultPeriod";
import { dataDefaultTeam } from "../Team/dataDefaultTeam";
import { dataDefaultSemester } from "../User/Semester/dataDefaultSemester";
import { dataDefaultUse } from "../User/userDataDefault";
import { dataDataDefaultEdPlan } from "./dataDefaultEdPlan";
import { dataDefaultSchedule } from "./dataDefaultSchedule";
import { dataDefaultSubject } from "./dataDefaultSubject";

export const dataDefaultCourse: DataCourseIn = {
    id: 0,
    teacher: dataDefaultUse,
    team: dataDefaultTeam,
    semester: dataDefaultSemester,
    period: dataDataDefaultPeriod,
    educationalPlan: dataDataDefaultEdPlan,
    subject: dataDefaultSubject,
    courseStudiedId: null,
    schedule: [],
    updatedAt: "",
    createdAt: "",
    typeOfGroup: ""
}