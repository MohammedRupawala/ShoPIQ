import { Column } from "react-table"
import TableHoc from "./TableHoc"


interface Data { 
    id : string
    quantity : number
    discount : number
    amount : number
    status : string
}
const columns :Column<Data>[]= [{
    Header : "Id",
    accessor: "id",
},
{
    Header : "Quantity",
    accessor: "quantity",
},
{
    Header : "Discount",
    accessor: "discount",
},
{
    Header : "Amount",
    accessor: "amount",
},
{
    Header : "Status",
    accessor: "status",
},
]

const DashboardTable = ({data = []}:{data:Data[]}) => {
  return TableHoc<Data>(columns,data,"transactionBox","Top Transaction",false)();
}

export default DashboardTable