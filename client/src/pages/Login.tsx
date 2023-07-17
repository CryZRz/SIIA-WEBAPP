import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../assets/styles/login.styles.css"
import 'animate.css';
import { LoginUser, RegisterUser, resDataLogin } from "../Interfaces/Login";

import ugEscudoBw from "../assets/images/escudo-baw.png"
import { LoginMainIn, RegisterMainIn } from "../Interfaces/AuthMain/Auth";
import {clientFetch, clientAuthFetch} from "../helpers/fetching/clientFecth";

export default function LoginPage() {

  const formsList : JSX.Element[] = [<LoginForm/>, <RegisterForm/>]
  const [indexForm, setIndexForm] = useState(0)
  const [selectedButtomLogin, setSelectedButtomLogin] = useState(true)
  const [selectedButtomRegister, setSelectedButtomRegister] = useState(false)
  const navigate = useNavigate()

  useEffect(()=> {

    async function verifyUserLoged(){
      try {
        await clientAuthFetch.get("/api/user")
        return navigate("/inicio")
      } catch (e) {
        console.log(e)
        return navigate("/")
      }
    }

    verifyUserLoged()

  }, [])

  function validateEmail(email : string) : boolean {
    const regexEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    if (regexEmail.test(email)) {
      return true
    }

    return false
  }

  async function sendDataRegister(data: RegisterMainIn) {
    try {
      const reqDataUser = await clientFetch.post("/api/register", data)
      console.log(reqDataUser)
      return alert("Tu registro ha sido exitoso ahora puedes iniciar sesion")
    } catch (e) {
      console.log(e)
      return alert("Ha ocurrido un error intenta enviar tus datos en otro momento")
    }
  }

  async function sendDataLogin(data : LoginMainIn){
    try {
      const sendDataLogin  = await clientFetch.post("/api/login", data)
      const tokenUser = sendDataLogin.data
      localStorage.setItem("AuthToken", tokenUser.token)
      return navigate("/inicio")
    } catch (e) {
      console.log(e)
      return alert("Ha ocurrido un error: " + e)
    }
  }

  function LoginForm(){

    const [saveLoginData, setSaveLoginData] = useState<LoginUser>({
      email: "",
      password: ""
    })

    function lisenChangeLogin({target: {value, name}} : ChangeEvent<HTMLInputElement>) {
      setSaveLoginData({...saveLoginData, [name] : value})
    }

    function verifyDataLogin(event : FormEvent<HTMLFormElement>) {
      event.preventDefault()
      if (saveLoginData.email == "" || saveLoginData.password == "") {
        return alert("No puedes enviar datos vacios")
      }
      else if (!validateEmail(saveLoginData.email)) {
        return alert("Ingresa un email valido")
      }else{
        return sendDataLogin(saveLoginData)
      }
    }

    return(
      <div className="form-login-content" style={{animation: "3s fadeIn"}}>
        <div className="form-login-title">
          <h1>Iniciar sesion</h1>
        </div>
        <form className="form-login" onSubmit={verifyDataLogin}>
          <input 
            className="get-email-user" 
            type="email"
            name="email"
            placeholder="NUA a 6 digitos"
            value={saveLoginData.email}
            onChange={lisenChangeLogin}
          />
          <input 
            className="get-password-user" 
            type="password"
            name="password"
            placeholder="Contraseña" 
            value={saveLoginData.password}
            onChange={lisenChangeLogin}
          />
          <button className="send-login-form">
            Acceder
          </button>
        </form>
        <div className="form-login-more-info">
          <button>Coordonadores de asuntos escolares</button>
          <button>Calendario escolar</button>
        </div>
        <div className="form-login-how-to-use">
          <div className="form-login-change-password">
            <span>¿Olvidaste tu contraseña?</span>
            <span>Recuperala aqui</span>
          </div>
          <div className="form-login-how-to-use">
            <span>¿Alguna duda? Ingresa a la</span>
            <span>Mesa de AyuDAE</span>
          </div>
        </div>
      </div>
    )
  }

  function RegisterForm(){

    const [saveRegisterData, setsaveRegisterData] = useState<RegisterMainIn>({
      name: "",
      lastName: "",
      email: "",
      password: "",
      direction: "",
      role: "teacher"
    })
    
    function lisenChnageResgister({target: {value, name}}: ChangeEvent<HTMLInputElement>) {
      setsaveRegisterData({...saveRegisterData, [name] : value})
    }

    function lisenChnageRol({target: {value}}: ChangeEvent<HTMLSelectElement>){
      setsaveRegisterData({...saveRegisterData, role : value})
    }

    function verifyDataRegister(event : FormEvent<HTMLFormElement>) {
      event.preventDefault()
      if (Object.values(saveRegisterData).includes("")) {
        return alert("No puedes enviar datos vacios")
      }
      else if (!validateEmail(saveRegisterData.email)) {
        return alert("Ingresa un email valido")
      }
      else if (saveRegisterData.password.length < 8) {
        return alert("Tu contraseña no puede menor a 8 caracteres")
      }
      else{
        return sendDataRegister(saveRegisterData)
      }
    }

    return(
      <div className="form-register-content" style={{animation: "3s fadeIn"}}>
        <div className="form-login-title">
          <h1>Registrate</h1>
        </div>
        <form className="form-register" onSubmit={verifyDataRegister}>
          <div className="form-register-name-lastname">
            <input 
              className="get-register-adw-user" 
              name="name" type="text" 
              placeholder="Name"
              onChange={lisenChnageResgister}
            />
            <input 
              className="get-register-adw-user" 
              name="lastName" 
              type="text" 
              placeholder="Last name" 
              onChange={lisenChnageResgister}
            />
          </div>
          <div className="form-register-epc">
            <input 
              className="get-register-email-user" 
              name="email" 
              type="email" 
              placeholder="Email"
              onChange={lisenChnageResgister}
            />
            <input 
              className="get-register-password-user" 
              name="password" 
              type="password" 
              placeholder="Password"
              onChange={lisenChnageResgister}            
            />
            <input 
              className="get-register-adw-user" 
              name="direction" 
              type="text" 
              placeholder="Direcciòn" 
              onChange={lisenChnageResgister}            
            />
          </div>
          <select className="get-role-user" onChange={lisenChnageRol}>
            <option>Seleccione un maestro</option>
            <option value="1">Maestro</option>
            <option value="2">Alumno</option>
          </select>
          <button className="send-register-form">Registrarse</button>
        </form>
      </div>
    )
  }

  return (
    <div className="login-container">
        <div className="login-sections">
          <section className="login-section-form">
            <div className="login-form-change-section">
              <button 
                className="login-btn-change-section-login"
                style={selectedButtomLogin ? {borderBottom: "1px solid #ffff"} : {borderBottom : "none"}}
                onClick={e => {
                  setSelectedButtomRegister(false)
                  setSelectedButtomLogin(true)
                  setIndexForm(0)
                }}
                >
                Login
              </button>
              <button
                style={selectedButtomRegister ? {borderBottom: "1px solid #ffff"} : {borderBottom : "none"}}
                className="login-btn-change-section-register"
                onClick={e => {
                  setSelectedButtomRegister(true)
                  setSelectedButtomLogin(false)
                  setIndexForm(1)
                }}
                >
                Register
              </button>
            </div>
            <div className="forms-list-content">
              {formsList[indexForm]}
            </div>
          </section>
          <section className="login-section-background">
            <div className="login-logo-title-content">
                <div className="login-logo-title">  
                    <div className="login-logo">
                      <img src={ugEscudoBw} alt="ug escudo color blanco"></img>
                    </div>
                    <div className="login-title">
                      <h3>KARDEX</h3>
                      <h3>de Estudiante</h3>
                    </div>
                </div>
            </div>
          </section>
        </div>
    </div>
  )
}
