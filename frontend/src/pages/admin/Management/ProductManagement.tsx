import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaTrash } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import AdminSide from '../../../components/admin/adminSide'
import { useDeleteProductMutation, useSingleProductQuery, useUpdateProductMutation } from '../../../redux/api/productAPI'
import { server } from '../../../redux/store'
import { CustomError } from '../../../types/apiType'
import { userReducerIntialState } from '../../../types/reducer-types'
import { resToast } from '../../../utils/features'
import { SkeletonLoading } from '../../../components/Loader'
//const img ="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804"

export const ProductManagement = () => {
  const navigate = useNavigate()
  const params = useParams()
  console.log("hello")
  const {user} = useSelector((state:{userReducer : userReducerIntialState})=>state.userReducer)
  const {data,isLoading,isError,error} = useSingleProductQuery(params.id!)
  useEffect(() => {
    if (isError && error) {
      toast.error((error as CustomError).data.message || 'An error occurred');
    }
  }, [isError, error]);
  const [updateProduct] = useUpdateProductMutation()
  const [deleteProduct] = useDeleteProductMutation()
  const {photo,price,stock,name,category} = data?.product || {
    _id : "",
    photo : "",
    category : "",
    name : "",
    price : 0,
    stock : 0
  }
  const[nameUpdate,setNameUpdate]= useState<string>(name)
  const[priceUpdate,setPriceUpdate] = useState<number>(price)
  const[stockUpdate,setStockUpdate] = useState<number>(stock)
  const[photoUpdate,setPhotoUpdate] = useState<string>(photo)
  const[categoryUpdate,setCategoryUpdate] = useState<string>(category)
  const[photoFile,setPhotoFile] = useState<File>()
  
  const changeImage = (e:ChangeEvent<HTMLInputElement>)=>{
    const file:File | undefined = e.target.files?.[0]
    const reader: FileReader =   new FileReader()
    if(file){
      reader.readAsDataURL(file);
      reader.onloadend = ()=>{
        if(typeof reader.result === "string"){
          setPhotoUpdate(reader.result)
          setPhotoFile(file)
        }
      }
    }
  }

  const submitHandler = async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(!photoUpdate && !nameUpdate && !categoryUpdate && !priceUpdate && !stockUpdate)  toast.error("There is Nothing To Update")
     const formData = new FormData()
    if(nameUpdate) formData.set("name",nameUpdate)
    if(photoFile) formData.set("photo",photoFile)
    if(stockUpdate !==undefined )formData.set("stock",stockUpdate.toString())
    if(priceUpdate) formData.set("price",priceUpdate.toString())
    if(categoryUpdate)formData.set("category",categoryUpdate)
    
    const  res = await updateProduct({id :user?._id!,productId:data?.product._id!,formData})
    resToast(res,navigate,`/admin/products`)
  }
  const deleteHandler = async()=>{
    const  res = await deleteProduct({id :user?._id!,productId:data?.product._id!})
    resToast(res,navigate,`/admin/products`)
  }
  useEffect(()=>{
      if(data){
        setNameUpdate(data.product.name)
        setPriceUpdate(data.product.price)
        setCategoryUpdate(data.product.category)
        setStockUpdate(data.product.stock)
        setPhotoUpdate(data.product.photo)
      }
    },[data])
  return (
    <div className='adminContainer'>
    <AdminSide/>
    <main className="managementBox">
     {
      isLoading?(
        <SkeletonLoading length={20}/>
      ):(
        <>
         <section>
        <strong>{data?.product._id}</strong>
        <img src = {`${server}/${data?.product.photo}`} alt='Updated Product Image'/>
        <p>{data?.product.name}</p>
        {
          data?.product.stock! > 0 ? (
            <span style = {{color:"green"}}>{stock} Available</span>
          ):
          (
            <span className='red'>Not Available</span>
          )
        }
        <p>Category : {data?.product.category}</p>
        <p>${data?.product.price}</p>
      </section>
      <article>
        <button onClick={deleteHandler}><FaTrash/></button>
        <form onSubmit={submitHandler}>
          <h2>Update Product</h2>
          <div>
            <label>Name</label>
            <input
             type="string"
             placeholder='Name'
             value={nameUpdate}
             onChange={(e)=>{
              setNameUpdate(e.target.value)
            }}/>
           
          </div>
          <div>
            <label>Category</label>
            <input
            required
             type="string"
             placeholder='Enter Category'
             value={categoryUpdate}
             onChange={(e)=>{
              setCategoryUpdate(e.target.value)
            }}/>
           
          </div>
          <div>
            <label>Price</label>
            <input
             type="number"
             placeholder='Price'
             value={priceUpdate}
             onChange={(e)=>{
              setPriceUpdate(Number(e.target.value))
            }}/>
            
          </div>
          <div>
            <label>Stock</label>
            <input
             type="number"
             placeholder='Stock'
             value={stockUpdate}
             onChange={(e)=>{
              setStockUpdate(Number(e.target.value))
            }}/>
           
          </div>
          <div>
            <label>Photo</label>
            <input
            
             type="file"
             onChange={changeImage}/>
           
          </div>
          {
            photoUpdate && <img src={photoUpdate} alt="New Image"/>
          }
          <button type="submit">Update</button>
        </form>
      </article>
        </>
      )
     }
      </main>
      </div>
    )
}

export default ProductManagement;