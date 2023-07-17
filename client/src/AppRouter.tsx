import './App.css'
import {createBrowserRouter} from "react-router-dom"
import { VerifyLoginContext } from './context/Context'
import LoginPage from './pages/Login'
import Profile from './pages/Profile'
import Post from './pages/Post'
import Home from './pages/Home'
import Proceedings from './pages/Proceedings'
import UpsAndDowns from './pages/UpsAndDowns'
import Posts from './pages/Posts'
import Credential from './pages/Credential'
import Notices from './pages/Notices'
import Events from './pages/Events'
import Users from './pages/adminPages/Users'
import User from './pages/adminPages/User'
import Periods from './pages/adminPages/Periods'
import Menu from './pages/Menu'
import Courses from './pages/adminPages/Courses'
import Subjects from './pages/adminPages/Subjects'
import Schedules from './pages/adminPages/Schedules'


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage/>
  },
  {
    path: "/inicio",
    element: <VerifyLoginContext>
                <Home/>
              </VerifyLoginContext>
  },
  {
    path: "/altasbajas",
    element: <VerifyLoginContext>
                <UpsAndDowns/>
              </VerifyLoginContext>
  },
  {
    path: "/kardex",
    element: <VerifyLoginContext>
                <Proceedings/>
              </VerifyLoginContext>
  },
  {
    path: "/profile/:id",
    element: <VerifyLoginContext>
                <Profile/>
              </VerifyLoginContext>
  },
  {
    path: "/publicaciones",
    element: <VerifyLoginContext>
                <Posts/>
              </VerifyLoginContext>
  },
  {
    path: "/post/:id",
    element: <VerifyLoginContext>
                <Post/>
              </VerifyLoginContext>
  },
  {
    path: "/credencial",
    element: <VerifyLoginContext>
                <Credential/>
              </VerifyLoginContext>
  },
  {
    path: "/avisos",
    element: <VerifyLoginContext>
                <Notices/>
              </VerifyLoginContext>
  },
  {
    path: "/eventos",
    element: <VerifyLoginContext>
                <Events/>
              </VerifyLoginContext>
  },
  {
    path: "/regularizaciones",
    element: <VerifyLoginContext>
                <Events/>
              </VerifyLoginContext>
  },
  {
    path: "/menu",
    element: <VerifyLoginContext>
                <Menu/>
              </VerifyLoginContext>
  },
  //admin routes
  {
    path: "/periodos",
    element: <VerifyLoginContext>
                <Periods/>
            </VerifyLoginContext>
  },
  {
    path: "/usuarios",
    element: <VerifyLoginContext>
                <Users/>
            </VerifyLoginContext>
  },
  {
  path: "/usuario/:id",
  element: <VerifyLoginContext>
                <User/>
          </VerifyLoginContext>
  },
  {
    path: "/cursos",
    element: <VerifyLoginContext>
                <Courses/>
            </VerifyLoginContext>
  },
  {
    path: "/materias",
    element: <VerifyLoginContext>
                <Subjects/>
            </VerifyLoginContext>
  },
  {
    path: "/horarios",
    element: <VerifyLoginContext>
                <Schedules/>
            </VerifyLoginContext>
  },
])

export default appRouter
