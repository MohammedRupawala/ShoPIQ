
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { Bar, Doughnut,Line,Pie } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);
interface BarChartsProps{
  horizontal?:boolean
  data1:number[]
  data2:number[]
  title1:string
  title2:string
  bgColor1: string
  bgColor2:string
  labels?:string[]

}
const months = ['January',
  'February',
  'March',
  'April',
  'May', 
  'June', 
  'July'
];


export const BarCharts = ({
  horizontal,
  data1=[],
  data2=[],
  title1,
  title2,
  bgColor1,
  bgColor2,
  labels =  months}:BarChartsProps)=> {
   const options:ChartOptions<"bar"> = {
    responsive: true,
    indexAxis:horizontal?"y":"x",
    plugins: {
      legend: {
        display:false,
      },
      title: {
        display: false,
        text: 'Chart.js Bar Chart',
      },
    },
    scales:{
      y:{
        beginAtZero:true,
        grid:{
          display:false,
        },
      },
      x:{
        beginAtZero:true,
        grid:{
          display:false,
        },
      },
      
    }
  };
  
  
   const data:ChartData<"bar",number[],string>= {
    labels,
    datasets: [
      {
        label: title1,
        data: data1,
        backgroundColor: bgColor1,
        barThickness:"flex",
        barPercentage:1,
        categoryPercentage:0.4
      },
      {
        label: title2,
        data: data2,
        backgroundColor: bgColor2,
        barThickness:"flex",
        barPercentage:1,
        categoryPercentage:0.4
      },
    ],
  };
  return <Bar width={horizontal?"200%":""}options={options} data={data} />;
}


interface DoughnutChartProps {
  
  data:number[]
  backgroundColor:string[]
  labels:string[]
  cutout?:number | string
  legends?: boolean
  offset?:number[] 
   
}


export const DoughnutChart= ({
  data,
  backgroundColor,
  labels,
  cutout,
  legends,
  offset}:DoughnutChartProps)=>{
  const doughnutData : ChartData<"doughnut",number[],string >={
    labels,
    datasets :[
      {
        data,
        backgroundColor,
        borderWidth:0,
        offset

      }
    ]
  }
  const doughnutOption : ChartOptions<"doughnut"> = {
    responsive:true,
    plugins:{
      legend:{
        display:legends,
        position:"bottom",
        labels:{
          padding:40,
        }
      }
    },
    cutout
  }
  return <Doughnut options={doughnutOption} data = {doughnutData}/>
}
interface PieChartProps {
  
  data:number[]
  backgroundColor:string[]
  labels:string[]
  offset?:number[] 
   
}


export const PieCharts= ({
  data,
  backgroundColor,
  labels,
  offset}:PieChartProps)=>{
  const PieChartData : ChartData<"pie",number[],string >={
    labels,
    datasets :[
      {
        data,
        backgroundColor,
        borderWidth:1,
        offset

      },
    ]
  }
  const PieOption : ChartOptions<"pie"> = {
    responsive:true,
    plugins:{
      legend:{
        display:false,
      }
    },
    
  }
  return <Pie  data = {PieChartData} options={PieOption}/>
}
interface LineChartProps{
 
  data:number[]
  label:string
  backgroundColor:string
  borderColor:string
  labels?:string[]

}


export const LineCharts = ({
  
  data,
  label,
  backgroundColor,
  borderColor,
  labels =  months}:LineChartProps)=> {
   const options:ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display:false,
      },
      title: {
        display: false,
        text: 'Chart.js Bar Chart',
      },
    },
    scales:{
      y:{
        beginAtZero:true,
        grid:{
          display:false,
        },
      },
      x:{
        beginAtZero:true,
        grid:{
          display:false,
        },
      },
      
    }
  };
  
  
   const LineChartData:ChartData<"line",number[],string>= {
    labels,
    datasets: [
      {
        fill:true,
        label,
        data,
        backgroundColor,
        borderColor
       },
    ],
  };
  return <Line options={options} data={LineChartData} />;
}
