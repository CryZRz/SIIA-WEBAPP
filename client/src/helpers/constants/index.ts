import TypesOfGroupEnum from "../../enums/TypesOfGroup"

export const pathAPI = import.meta.env.VITE_API_URL
export const pathAPIImages = import.meta.env.VITE_API_URL+"/images"
export const listTypesOfGroup = Object.values(TypesOfGroupEnum).filter(t => typeof(t) === "string")