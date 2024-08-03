import { ChangeEvent, FormEvent, useState } from 'react'
import AdminSide from '../../../components/admin/adminSide'
import { useSelector } from 'react-redux'
import { userReducerIntialState } from '../../../types/reducer-types'
import { useCreateNewProductMutation } from '../../../redux/api/productAPI'
import toast from 'react-hot-toast'
import { resToast } from '../../../utils/features'
import { useNavigate } from 'react-router-dom'


const NewProduct = () => {
  const {user}  = useSelector((state : {userReducer : userReducerIntialState})=>state.userReducer)
  const[name,setName]= useState<string>("")
  const[price,setPrice] = useState<number>(0)
  const[stock,setStock] = useState<number>(0)
  const[photo,setPhoto] = useState<File | null>()
  const[category,setCategory] = useState<string>("")
  const changeImage = (e:ChangeEvent<HTMLInputElement>)=>{
    const file:File | undefined = e.target.files?.[0]
    const reader: FileReader =   new FileReader()
    if(file){
      // reader.readAsDataURL(file);
      // reader.onloadend = ()=>{
      //   if(typeof reader.result === "string"){
      //     setPhoto(reader.result)
      //   }
      // }
      setPhoto(file)
    }
  }
  const navigate = useNavigate()
  const [newProduct]  = useCreateNewProductMutation()
  const submitHandler = async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(!name || !category || !price || !stock || !photo) return toast.error("Enter All Details")
    const newFormData = new FormData()
    newFormData.set("name" , name)
    newFormData.set("photo",photo)
    newFormData.set("stock",stock.toString())
    newFormData.set("price",price.toString())
    newFormData.set("category",category)
    const res = await newProduct({id : user?._id!,formData : newFormData})
   
    resToast(res,navigate,"/admin/products")
  }
  return (
    <div className='adminContainer'>
    <AdminSide/>
    <main className="managementBox">
      <article>
        <form onSubmit={submitHandler}>
          <h2>New Product</h2>
          <div>
            <label>Name</label>
            <input
            required
             type="string"
             placeholder='Name'
             value={name}
             onChange={(e)=>{
              setName(e.target.value)
            }}/>
          </div>
          <div>
            <label>Category</label>
            <input
            required
             type="string"
             placeholder='Enter Category'
             value={category}
             onChange={(e)=>{
              setCategory(e.target.value)
            }}/>
           
          </div>
          <div>
            <label>Price</label>
            <input
            required
             type="numeber"
             placeholder='Price'
             value={price}
             onChange={(e)=>{
              setPrice(Number(e.target.value))
            }}/>
            
          </div>
          <div>
            <label>Stock</label>
            <input
            required
             type="number"
             placeholder='Stock'
             value={stock}
             onChange={(e)=>{
              setStock(Number(e.target.value))
            }}/>
           
          </div>
          <div>
            <label>Photo</label>
            <input
            required
             type="file"
             onChange={changeImage}/>
           
          </div>
          {
            photo && <img src={photo.toString()} alt="New Image"/>
          }
          <button type="submit">Create</button>
        </form>
      </article>
      </main>
      </div>
    )
}

export default NewProduct