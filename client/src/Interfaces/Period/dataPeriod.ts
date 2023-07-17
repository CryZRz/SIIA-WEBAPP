import DataModelBaseIn from "../ModelBase";

export interface DataPeriodIn extends DataModelBaseIn {
    name: string,
    startDate: string,
    endDate: string,
    typeOfPeriod: string,
}
