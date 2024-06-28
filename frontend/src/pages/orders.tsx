import React, { ReactElement, useState } from 'react'
import TableHoc from '../components/admin/TableHoc'
import { Column } from 'react-table'
import { TRUE } from 'sass'
import { Link } from 'react-router-dom'
type DataType = {
  _id:string,
  amount:number,
  quantity:number,
  discount:number,
  status:ReactElement,
  action:ReactElement,
}
const column:Column<DataType>[]=[{
  Header:"ID",
  accessor:"_id"
},
{
  Header:"Quantity",
  accessor:"quantity"
},
{
  Header:"Discount",
  accessor:"discount"
},
{
  Header:"Amount",
  accessor:"amount"
},
{
  Header:"Status",
  accessor:"status"
},
{
  Header:"Action",
  accessor:"action"
},]
const Order = () => {
  const [row,setRows]= useState<DataType[]>([{
    _id:"hhehhhe",
    amount:1234,
    quantity:3,
    discount:25,
    status:<span className='red'>Processing</span>,
    action:<Link to={`/order/hhehhhe`}>View</Link>
  }])
  const Table = TableHoc<DataType>(column,row,"dashboardProductTable", "Orders",true)
  return (
    <div className='container'>
      <h1>My Orders</h1>
      {Table()}
    </div>
  )
}

export default Order