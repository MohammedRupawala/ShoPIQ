import { LineCharts } from "../../../components/admin/BarCharts"
import AdminSide from "../../../components/admin/adminSide"

const months= ["January","february","March","April","May","June","July","August","September","October","November","December"]


const LineChart = () => {
  return (
    <div className='adminContainer'>
        <AdminSide/>
        <main className='barBox'>
            <h1>Line Chart</h1>
            <section>
                {<LineCharts 
                 label='Products' 
                 data={[200, 444, 343, 556, 778, 455, 990,1444,256,447,1000,1200]} 
                 backgroundColor='rgb(53,162,255)' borderColor='rgb(53,162,255,0.5)'
                 labels={months}/>
                 }
                 <h2>Active User</h2>
            </section>
            <section>
          <LineCharts
            data={[40, 60, 244, 100, 143, 120, 41, 47, 50, 56, 32]}
            backgroundColor={"hsla(269,80%,40%,0.4)"}
            borderColor={"hsl(269,80%,40%)"}
            label="Products"
            labels={months}
          />
          <h2>Total Products (SKU)</h2>
        </section>

        <section>
          <LineCharts
            data={[
              24000, 14400, 24100, 34300, 90000, 20000, 25600, 44700, 99000,
              144400, 100000, 120000,
            ]}
            backgroundColor={"hsla(129,80%,40%,0.4)"}
            borderColor={"hsl(129,80%,40%)"}
            label="Revenue"
            labels={months}
          />
          <h2>Total Revenue</h2>
        </section>

        <section>
          <LineCharts
            data={[
              9000, 12000, 12000, 9000, 1000, 5000, 4000, 1200, 1100, 1500,
              2000, 5000,
            ]}
            backgroundColor={"hsla(29,80%,40%,0.4)"}
            borderColor={"hsl(29,80%,40%)"}
            label="Discount"
            labels={months}
          />
          <h2>Discount Allotted</h2>
        </section>
            </main>
        </div>
  )
}

export default LineChart