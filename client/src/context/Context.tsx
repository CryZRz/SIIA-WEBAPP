import { useEffect, useState, createContext } from "react";
import axios from "axios"
import { DataUserIn } from "../Interfaces/User/dataUser";
import { dataDefaultUse } from "../helpers/dataDeafult/User/userDataDefault";
import { clientAuthFetch } from "../helpers/fetching/clientFecth";

const defaultDataUserLog : DataUserIn = dataDefaultUse

export const DataContextLogin = createContext<{
    dataUser: DataUserIn, isLoading: boolean, err : boolean, updateInfo : () => Promise<void>, setIsLoading: (p: boolean) => void}>
    ({dataUser : defaultDataUserLog, isLoading: false, err : false, updateInfo : () => {throw Promise<void>}, setIsLoading: () => {}})

export function VerifyLoginContext({children} : { children: React.ReactNode }){

    const [dataUser, setDataUser] = useState<DataUserIn>(defaultDataUserLog)
    const [loadDataUser, setLoadDataUser] = useState(false)
    const [userDataErr, setUserDataErr] = useState(false)
    const getTokenUser = localStorage.getItem("AuthToken")

    useEffect(() => {
        async function verifyToken(){
            try {
                const reqVerifyToken = await clientAuthFetch.get("/api/user")
                setDataUser(reqVerifyToken.data.data)
                console.log(reqVerifyToken.data)
                setLoadDataUser(true)
            } catch (e) {
                setUserDataErr(true)
            }
        }

        if (getTokenUser) {
            verifyToken()
        }else{
            setUserDataErr(true)
        }
        
    }, [])

    async function updateInfo(){
        if (getTokenUser != undefined) {
            try {
                setLoadDataUser(false)
                const reqUpdateInfo = await clientAuthFetch.get("/api/user")
                setDataUser(reqUpdateInfo.data.data)
                setLoadDataUser(true)
            } catch (e) {
              setUserDataErr(true)  
            }
        } else {
            setUserDataErr(true) 
        }
    }

    function changeIsLoading(state: boolean){
        setLoadDataUser(state)
    }

    return(
        <DataContextLogin.Provider value={{ dataUser, isLoading: loadDataUser, err : userDataErr, updateInfo, setIsLoading: changeIsLoading }}>
            {children}
        </DataContextLogin.Provider>
    )

}
