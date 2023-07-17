export interface RegisterMainIn {
    name: string,
    lastName: string,
    email: string,
    password: string,
    direction : string,
    role: string,
}

export interface LoginMainIn {
    email: string,
    password:string
}