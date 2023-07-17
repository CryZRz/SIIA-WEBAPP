import { DataCourseIn } from "../Course/dataCourse";
import DataModelBaseIn from "../ModelBase";

export interface DataScheduleIn {
    day: string
    hours: DataHoursScheduleIn[]
}

export interface DataHoursScheduleIn {
    id: number | string
    startTime: string
    endTime: string
    course: DataCourseIn
}