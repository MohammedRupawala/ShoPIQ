import { ReactElement } from "react"
import { Navigate, Outlet } from "react-router-dom"

type Props = {
    children?:ReactElement,
    isAdmin?:boolean,
    adminRoutes?:boolean,
    isLoggedIN?:boolean,
    redirect? : string
}
const Protected = ({isLoggedIN,children,adminRoutes,isAdmin,redirect="/"}: Props) => {
  if(!isLoggedIN){
        return <Navigate to = {redirect}/>
    }
  if(!isAdmin && adminRoutes){
    return <Navigate to = {redirect}/>
  }

return children? children : <Outlet/>
}

export default Protected