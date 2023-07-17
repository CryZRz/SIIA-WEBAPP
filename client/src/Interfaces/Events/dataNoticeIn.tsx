import DataModelBaseIn from "../ModelBase";

export interface DataNoticeIn extends DataModelBaseIn {
    title: string,
    image: string,
    description: string,
}