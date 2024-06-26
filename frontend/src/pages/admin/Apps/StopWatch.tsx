import  { useEffect, useState } from 'react'
import AdminSide from '../../../components/admin/adminSide'
const format = ((timeInSeconds:number)=>{
    const hours =Math.floor(timeInSeconds/3600)
    const minutes =Math.floor((timeInSeconds  % 3600) / 60)
    const seconds =timeInSeconds % 60

    const hoursInString = hours.toString().padStart(2,"0")
    const minutesInString = minutes.toString().padStart(2,"0")
    const secondsInString = seconds.toString().padStart(2,"0")
    return `${hoursInString}:${minutesInString}:${secondsInString}`
})


const StopWatch = () => {
const [time,setTime]  = useState<number>(0)
const [isRunning,setIsRunning] = useState<boolean>(false)
useEffect(()=>{
    let intervalId:number
    if(isRunning){
        intervalId = setInterval(()=>{
            setTime((prev) => prev + 1 )
        },1000)
    }
    return ()=>{
        clearInterval(intervalId)
    }
},[isRunning])
  return (
    <div className='adminContainer'>
    <AdminSide/>
    <main className="appsBox">
    <h1>StopWatch</h1>
        <section>
          <div className="stopwatch">
          <h2>{format(time)}</h2> 
           <button onClick={()=>{
            setIsRunning((prev)=> !prev )
           }}>{isRunning?"Stop":"Start"}</button>
           <button onClick={()=>{
            setTime(0)
            setIsRunning(false)
           }}>Reset</button>
          </div>
        </section>
    </main>
    </div>
  )
}

export default StopWatch