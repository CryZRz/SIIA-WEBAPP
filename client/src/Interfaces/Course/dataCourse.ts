import { DataQualificationIn } from "../Kardex/qualification/dataQualification";
import DataModelBaseIn from "../ModelBase";
import { DataPeriodIn } from "../Period/dataPeriod";
import { DataScheduleIn } from "../Schedule/dataSchedule";
import { DataSubjectIn } from "../Subject/dataSubject";
import { DataTeamIn } from "../Team/dataTeam";
import { DataUserIn } from "../User/dataUser";
import { DataEducationalPlanIn } from "../User/EducationalPlan/dataEducationalPlan";
import { DataSemesterIn } from "../User/Semester/dataSemester";

export interface DataCourseIn extends DataModelBaseIn{
    courseStudiedId: number | null
    subject: DataSubjectIn
    team: DataTeamIn
    teacher: DataUserIn | null
    period: DataPeriodIn
    typeOfGroup: string
    semester: DataSemesterIn
    schedule: DataScheduleIn[]
    educationalPlan: DataEducationalPlanIn
}

export interface DataCourseStudiedIn extends DataModelBaseIn{
    course: DataCourseIn
    opportunity: number
    student: DataUserIn
    qualification: DataQualificationIn
    finished: boolean
}