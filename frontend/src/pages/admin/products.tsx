import  { ReactElement, useCallback, useEffect, useState } from 'react'

import { Column } from 'react-table'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import TableHoc from '../../components/admin/TableHoc'
import AdminSide from '../../components/admin/adminSide'
import { useGetAllProductsQuery } from '../../redux/api/productAPI'
import { server } from '../../redux/store'
import { SkeletonLoading } from '../../components/Loader'
import { CustomError } from '../../types/apiType'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { userReducerIntialState } from '../../types/reducer-types'
interface DataType{
  photo : ReactElement,
  name :string,
  price : number,
  stock : number,
  action : ReactElement
}
const columns:Column<DataType>[]=[{
  Header:"Photo",
  accessor:"photo"  
},
{
  Header:"Name",
  accessor:"name"
},
{
  Header:"Price",
  accessor:"price"
},
{
  Header:"Stock",
  accessor:"stock"
},
{
  Header:"Action",
  accessor:"action"
}]


const Products = () => {
  const {user} = useSelector((state:{userReducer : userReducerIntialState})=>(state.userReducer)) 

  const {data,isLoading,isError,error} = useGetAllProductsQuery(user?._id!)
  const [rows,setRows] = useState<DataType[]>([])
  useEffect(() => {
    if (isError && error) {
      toast.error((error as CustomError).data.message || 'An error occurred');
    }
  }, [isError, error]); 
  useEffect(()=>{
    if(data)
      setRows(data.products.map((i)=>({
         key:i._id,
        name:i.name,
        photo:<img src={`${server}/${i.photo}`}/>,
        price:i.price,
        stock : i.stock,
        action:<Link to ={`/admin/product/${i._id}`}>Manage</Link>
      }))
    )
  },[data])
  const Table = TableHoc<DataType>(columns,rows,"dashboardProductTable","Products",true)()
  return (
    <div className='adminContainer'>
    <AdminSide/>
    <main>{isLoading?<SkeletonLoading length={20}/>:Table}</main>
    <Link to="/admin/product/new" className='addNewProduct'>
    <FaPlus/>
    </Link>
</div>
  )
}

export default Products