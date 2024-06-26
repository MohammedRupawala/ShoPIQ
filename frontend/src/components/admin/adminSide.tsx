
import {RiDashboardFill,RiShoppingBag3Fill,RiCoupon3Fill} from "react-icons/ri"
import { IconType } from 'react-icons'
import{AiFillFileText} from "react-icons/ai"
import {IoIosPeople} from "react-icons/io"
import { Location,Link, useLocation } from 'react-router-dom'
import { FaChartBar,FaChartLine,FaChartPie,FaGamepad,FaStopwatch} from 'react-icons/fa'
import { useEffect, useState } from "react"
import { HiMenuAlt4 } from "react-icons/hi"
const AdminSide = () => {
  const [modal,setModal] = useState<boolean>(false)
  const [phoneActive, setPhoneActive] = useState<boolean>(
    window.innerWidth < 1100
  );
  
  const resizeHandler = () => {
    setPhoneActive(window.innerWidth < 1100);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

    const Locate = useLocation();
  return (
    <>
     {phoneActive && (
        <button id="hamburger" onClick={() => setModal(true)}>
          <HiMenuAlt4 />
        </button>
      )}
    <aside  style={
    phoneActive
      ? {
          width: "20rem",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: modal ? "0" : "-20rem",
          transition: "all 0.5s",
        }
      : {}
  }>
    <h2>Login.</h2>
    <DivDash Locate={Locate}/>
    <DivChart Locate={Locate}/>
    <DivApps Locate={Locate}/>
    {phoneActive && (
          <button id="close-sidebar" onClick={() => setModal(false)}>
            Close
          </button>
        )}
  </aside>
  </>
  
  )
}
const DivDash = ({Locate} : {Locate : Location})=>{
 return <div>
      <h5>Dashboard</h5>
       <ul>
        <Li 
        text={"Dashboard"} 
        Icon={RiDashboardFill}
        location={Locate} 
        url="/admin/dashboard">
        </Li>
        <Li 
        text={"Products"} 
        Icon={RiShoppingBag3Fill}
        location={Locate} 
        url="/admin/products">
        </Li>
        <Li 
        text={"Customer"} 
        Icon={IoIosPeople}
        location={Locate} 
        url="/admin/customer">
      </Li>
      <Li 
        text={"Transaction"} 
        Icon={AiFillFileText}
        location={Locate} 
        url="/admin/Transaction">
        </Li>
       </ul>
    </div>

}
const DivChart = ({Locate} : {Locate : Location})=>{
  return <div>
       <h5>Charts</h5>
        <ul>
         <Li 
         text={"Charts"} 
         Icon={FaChartBar}
         location={Locate} 
         url="/admin/charts/bar">
         </Li>
         <Li 
         text={"Pie"} 
         Icon={FaChartPie}
         location={Locate} 
         url="/admin/charts/pie">
         </Li>
         <Li 
         text={"Line"} 
         Icon={FaChartLine}
         location={Locate} 
         url="/admin/charts/line">
       </Li>
        </ul>
     </div>
 
 }
 const DivApps = ({Locate} : {Locate : Location})=>{
  return <div>
       <h5>Apps</h5>
        <ul>
         <Li 
         text={"StopWatch"} 
         Icon={FaStopwatch}
         location={Locate} 
         url="/admin/apps/stopwatch">
         </Li>
         <Li 
         text={"Coupons"} 
         Icon={RiCoupon3Fill}
         location={Locate} 
         url="/admin/apps/coupongenerator">
         </Li>
         <Li 
         text={"Toss"} 
         Icon={FaGamepad}
         location={Locate} 
         url="/admin/apps/toss">
       </Li>
        </ul>
     </div>
 
 }
interface LiProps {
  url:string,
  text:string,
  location : Location,
  Icon : IconType
}
const Li = ({url,location,Icon,text}:LiProps)=>{
return <li  style={
          {
            backgroundColor:location.pathname.includes(url) ? "rgba(0,115,225,0.1)": " white"
          }
        }>
       <Link to ={url} style={{
       color:location.pathname.includes(url) ? "rgba(0,115,225)": " black"
       }}> 
       <Icon/>
      {text}
       </Link>
       </li>
}
export default AdminSide


