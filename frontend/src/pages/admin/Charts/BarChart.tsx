import AdminSide from "../../../components/admin/adminSide"
import { BarCharts } from "../../../components/admin/BarCharts"


const months= ["January","february","March","April","May","June","July","August","September","October","November","December"]
const BarChart = () => {
  return (
    <div className='adminContainer'>
        <AdminSide/>
        <main className='barBox'>
            <h1>Bar Chart</h1>
            <section>
                {<BarCharts 
                 title1='Products' title2='Users' 
                 data1={[200, 444, 343, 556, 778, 455, 990]}
                 data2={[300, 144, 433, 655, 237, 755, 190]} 
                 bgColor1='hsl(260,50%,30%)' bgColor2='hsl(360,90%,90%)'/>}
                 <h2>Top Selling Products</h2>
            </section>
            
            <section>
                {<BarCharts 
                 horizontal={true}
                 title1='Products' title2='Users' 
                 data1={[]}
                 data2={[300, 144, 433, 655, 237, 755, 190,556, 778, 455, 990,1201]} 
                 bgColor1='hsl(260,50%,30%)' bgColor2=''
                 labels={months}/>}
                 <h2>Products Throughout The Year</h2>
            </section>
        </main>
        </div>
  )
}

export default BarChart