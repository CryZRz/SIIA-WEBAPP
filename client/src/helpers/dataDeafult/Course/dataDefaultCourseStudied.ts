import { DataCourseStudiedIn } from "../../../Interfaces/Course/dataCourse";
import { DataQualificationIn } from "../../../Interfaces/Kardex/qualification/dataQualification";
import { dataDefaultUse } from "../User/userDataDefault";
import { dataDefaultCourse } from "./dataDefaultCourse";

export const dataDataDefaultQualification: DataQualificationIn = {
    id: 0,
    qualification: 0,
    createdAt: "",
    status: "",
    updatedAt: ""
}

export const dataDataDefaultCourseStudied: DataCourseStudiedIn = {
    id: 0,
    course: dataDefaultCourse,
    createdAt: "",
    finished: false,
    opportunity: 0,
    qualification: dataDataDefaultQualification,
    student: dataDefaultUse,
    updatedAt: ""
}