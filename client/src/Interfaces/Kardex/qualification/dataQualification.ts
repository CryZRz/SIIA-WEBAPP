import DataModelBaseIn from "../../ModelBase";

export interface DataQualificationIn extends DataModelBaseIn{
    qualification: string | number | null
    status: string
}