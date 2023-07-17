import { ReactNode, useEffect, useContext } from 'react'
import { DataContextLogin } from '../../context/Context'
import { useNavigate } from 'react-router-dom'
import RolesEnum from '../../enums/Role'

export default function ValidateAdmin({children} : {children : ReactNode}) {

    const navigate = useNavigate()
    const {dataUser} = useContext(DataContextLogin)

    useEffect(() => {
        if (dataUser.role.name != RolesEnum[2]) {
          navigate("/inicio")
        }
    }, [])

  return (
    <>
    {children}
    </>
  )
}