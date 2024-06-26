
import {categories} from "../../../assets/admin/data.json"
import { PieCharts, DoughnutChart } from "../../../components/admin/BarCharts"
import AdminSide from "../../../components/admin/adminSide"

const PieChart = () => {
  return (
    <div className='adminContainer'>
        <AdminSide/>
        <main className='barBox'>
            <h1>Pie Chart</h1>
            <section>
              <div>
              <PieCharts labels={['Process','Shipped','Delivered']} data={[12,9,10]} backgroundColor={[
                  'hsl(110,80%,80%)',
                  'hsl(110,80%,50%)',
                  'hsl(110,40%,50%)'
                ]} offset={[0,0,50]}/>
              </div>
              <h2>Order Fulfillment Ratio</h2>
            </section>
            <section>
              <div>
              <DoughnutChart labels={categories.map((i)=>i.heading)}
               data={categories.map((i)=>i.value)} 
               backgroundColor={categories.map((i)=>`hsl(${i.value*4},${i.value}%,50%)`)} 
               offset={[0,0,0,80]}
               legends={false}
               cutout={"70%"}/>
              </div>
              <h2>Categories Product Ratio</h2>
            </section>
            <section>
              <div>
              <DoughnutChart labels={["In Stock","Out Of Stock"]}
               data={[40,19]} 
               backgroundColor={["hsl(129,80%,80%)","hsl(229,50%,80%)"]} 
               offset={[0,80]}
               legends={false}
               cutout={"70%"}/>
               
              </div>
              <h2>Stock Availability</h2>
            </section>
            <section>
              <div>
              <DoughnutChart labels={["Marketing Cost","Discount","Burnt","Production Cost","Net Margin"]}
               data={[10.,2,1,25,4]} 
               backgroundColor={["hsl(129,80%,80%)","hsl(69,80%,80%)","hsl(309,50%,80%)","hsl(109,50%,80%)","hsl(299,50%,80%)"]} 
               offset={[0,0,0,0,80]}
               legends={false}
               cutout={"70%"}/>
               
              </div>
              <h2>Stock Availability</h2>
            </section>
            <section>
              <div>
              <PieCharts labels={['Process','Shipped','Delivered']} data={[12,9,10]} backgroundColor={[
                  'hsl(110,80%,80%)',
                  'hsl(110,80%,50%)',
                  'hsl(110,40%,50%)'
                ]} offset={[0,0,50]}/>
              </div>
              <h2>Order Fulfillment Ratio</h2>
            </section>
            <section>
              <div>
              <DoughnutChart labels={categories.map((i)=>i.heading)}
               data={categories.map((i)=>i.value)} 
               backgroundColor={categories.map((i)=>`hsl(${i.value*4},${i.value}%,50%)`)} 
               offset={[0,0,0,80]}
               legends={false}
               cutout={"70%"}/>
              </div>
              <h2>Categories Product Ratio</h2>
            </section>
            <section>
              <div>
              <PieCharts labels={['Kids','Adult','Old']} data={[9,45,10]} backgroundColor={[
                  'hsl(10,80%,80%)',
                  'hsl(10,80%,50%)',
                  'hsl(10,40%,50%)'
                ]} offset={[0,0,50]}/>
              </div>
              <h2>Age Group</h2>
            </section>
            <section>
              <div>
              <DoughnutChart labels={["Admin","Customer"]}
               data={[20,175]} 
               backgroundColor={["hsl(335,100%,38%)","hsl(44,98%,50%)"]} 
               offset={[0,80]}
               />
               
              </div>
              <h2>Users & Admin</h2>
            </section>
            
            
            
            
        </main>
        </div>
  )
}

export default PieChart