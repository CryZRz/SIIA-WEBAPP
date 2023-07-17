import { DataCourseIn, DataCourseStudiedIn } from "../Course/dataCourse"
import DataModelBaseIn from "../ModelBase"
import { DataPeriodIn } from "../Period/dataPeriod"
import { DataScheduleIn } from "../Schedule/dataSchedule"
import { DataSubjectIn } from "../Subject/dataSubject"
import { DataTeamIn } from "../Team/dataTeam"
import { DataUserIn } from "../User/dataUser"
import { DataEducationalPlanIn } from "../User/EducationalPlan/dataEducationalPlan"
import { DataSemesterIn } from "../User/Semester/dataSemester"
import { DataQualificationIn } from "./qualification/dataQualification"

export interface DataCourseKardexStudentIn {
    id: number
    clave: number
    credits: number
    subject: string
    ratings: DataRaitingCourseKardexStudentIn[]
}

export interface DataRaitingCourseKardexStudentIn extends DataModelBaseIn{
    course: DataCourseIn
    finished: boolean
    opportunity: number
    student: DataUserIn
    qualification: DataQualificationIn
}

export interface DataCourseKardexTeacherIn extends DataModelBaseIn{
    educationalPlan: DataEducationalPlanIn
    period: DataPeriodIn
    schedule: DataScheduleIn[]
    semester: DataSemesterIn
    students: DataCourseStudiedIn[]
    subject: DataSubjectIn
    teacher: DataUserIn
    team: DataTeamIn
    typeOfGroup: string
}

export interface DataSendQualificationsKardexIn {
    id: number
    qualification: string | number | null
}

export interface EditCourseStudinbgKardexIn {
    id: number
    courseId: number
    subject: DataSubjectIn
    credits: number
    teacher: DataUserIn | null
    team: DataTeamIn
    opportunity: number
    typeOfGroup: string
    period: DataPeriodIn
    student: DataUserIn
}