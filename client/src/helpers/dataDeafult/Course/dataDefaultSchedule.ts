import { DataScheduleIn, DataHoursScheduleIn } from "../../../Interfaces/Schedule/dataSchedule";
import { dataDefaultCourse } from "./dataDefaultCourse";

export const dataDefaultHoursSchedule: DataHoursScheduleIn = {
    id: 0,
    course: dataDefaultCourse,
    endTime: "",
    startTime: ""
}

export const dataDefaultSchedule: DataScheduleIn = {
    day: "",
    hours: [dataDefaultHoursSchedule]
}