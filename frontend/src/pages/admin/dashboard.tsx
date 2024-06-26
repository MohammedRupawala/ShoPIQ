//import React from 'react'
import { BsSearch } from 'react-icons/bs'

import { FaRegBell } from 'react-icons/fa'
import userImg from "../../assets/admin/profile.png"
import { HiTrendingDown,HiTrendingUp } from 'react-icons/hi'
import data from "../../assets/admin/data.json"

import { BiMaleFemale } from 'react-icons/bi'
import AdminSide from '../../components/admin/adminSide'
import { BarCharts, DoughnutChart } from '../../components/admin/BarCharts'
import Table from "../../components/admin/DashboardTable"
const Dashboard = () => {
  return (
    <div className='adminContainer'>
        <AdminSide/>
        <main className="dashboard">
        <div className="bar">
          <BsSearch/>
          <input type ="text" placeholder='Search'/>
          <FaRegBell/>
          <img src={userImg}/>
          </div>
          <div className="widget-maker">
            <Widget heading="Revenue" 
            amount = {true}
            value={40000}
            percent={40}
            colour='rgb(0,115,255)'/>
             <Widget heading="User" 
            amount = {false}
            value={500}
            percent={20}
            colour='rgb(255,255,0)'/>
             <Widget heading="Transaction" 
            amount = {true}
            value={20000}
            percent={100}
            colour='rgb(0,115,255)'/>
             <Widget heading="Product" 
            amount = {false}
            value={10}
            percent={96}
            colour='cyan'/>
                      </div>
                      <section className = "graphContainer">
                        <div className="revenue"> 
                          <h2>
                            Revenue & Transaction
                          </h2>
                          <BarCharts 
                          data1={[300,144,433,655,237,255,190]}
                          data2={[200,444,343,556,778,455,990]}
                          title1="Revenue"
                          title2="Transaction"
                          bgColor1="rgb(0,115,255)"
                          bgColor2="rgba(53,162,235,0.8)"
                          />
                        </div>
                        <div className="inventory">
                          <h2> 
                            Inventory 
                          </h2>
                        
                          <div>
                         {
                          data.categories.map((i)=>(
                            <Item
                            key={i.heading}
                            heading={i.heading}
                            value={i.value}
                            color = {`hsl(${i.value * 4},${i.value}%,50%)`}/>
                          ))
                         }
                          </div>
                          
                        </div>

                      </section>
                      <section className="transaction">
                        <div className="gender">
                          <h2>Gender Ratio</h2>
                          {<DoughnutChart 
                          labels={["Male","Female"]}
                          data={[12,19]}
                          backgroundColor={["hsl(340,82%,56%)","rgba(56,162,235,8.8)"]}
                          cutout={90}/>}
                          <p><BiMaleFemale/></p>
                          {/* <div className="table">
                          <Table data={data.transaction}/>
                          </div> */}
                        </div>
                        <Table data={data.transaction}/>
                      </section>
          </main>
    </div>
  )
}

interface WidgetType {
  heading: string,
  value : number,
  amount : boolean,
  colour : string,
  percent : number
}
const Widget = ({heading,value,colour,amount,percent}:WidgetType)=>{
return <article className='widget'>
  <div className='widgetinfo'>
    <p>{heading}</p>
    <h3>{amount?`$${value}`:value}</h3>
    {
    percent>0?<span className='green'>
      <HiTrendingUp/> + {percent}%{" "}
    </span>
    :<span className='red'>
      <HiTrendingDown/> {percent}%{" "}
    </span>
    }
  </div>
  <div className="widgetCircle" style={{
    background: `conic-gradient(
    ${colour} ${Math.abs(percent)/100 * 360}deg,
    rgb(255,255,255) 0
    )`,
  }}>
    <span style={{
      color:colour
    }}>{percent}%</span>
  </div>
</article>
}
interface itemProps{
  color : string;
  value : number;
  heading : string;
}
const Item  = ({color,heading,value} : itemProps)=>{
  return<div className="items">
   <h5>
   {heading}
    </h5> 
    <div >
      <div  style = {{
        backgroundColor : color,
        width : `${value}%`,
      }}></div>
      </div>
      <span>{value}%</span>
    
    
  </div>

}


export default Dashboard