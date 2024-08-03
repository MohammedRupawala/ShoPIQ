import { ChangeEvent, FormEvent, useState } from 'react'
import AdminSide from '../../../components/admin/adminSide'
import { FaTrash } from 'react-icons/fa'
const img ="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804"

export const ProductManagement = () => {
  const[name,setName]= useState<string>("Puma Shoes")
  const[price,setPrice] = useState<number>(1000)
  const[stock,setStock] = useState<number>(10)
  const[photo,setPhoto] = useState<string>(img)
  const[nameUpdate,setNameUpdate]= useState<string>("Puma Shoes")
  const[priceUpdate,setPriceUpdate] = useState<number>(1000)
  const[stockUpdate,setStockUpdate] = useState<number>(10)
  const[photoUpdate,setPhotoUpdate] = useState<string>(img)
  const changeImage = (e:ChangeEvent<HTMLInputElement>)=>{
    const file:File | undefined = e.target.files?.[0]
    const reader: FileReader =   new FileReader()
    if(file){
      reader.readAsDataURL(file);
      reader.onloadend = ()=>{
        if(typeof reader.result === "string"){
          setPhotoUpdate(reader.result)
        }
      }
    }
  }

  const submitHandler = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setName(nameUpdate)
    setPrice(priceUpdate)
    setStock(stockUpdate)
    setPhoto(photoUpdate)
  }
  return (
    <div className='adminContainer'>
    <AdminSide/>
    <main className="managementBox">
      <section>
        <strong>ID - 12313</strong>
        <img src = {photo} alt='Updated Product Image'/>
        <p>{name}</p>
        {
          stock > 0 ? (
            <span style = {{color:"green"}}>{stock} Available</span>
          ):
          (
            <span className='red'>Not Available</span>
          )
        }
        <p>${price}</p>
      </section>
      <article>
        <button><FaTrash/></button>
        <form onSubmit={submitHandler}>
          <h2>New Product</h2>
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
            <label>Price</label>
            <input
             type="numeber"
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
            required
             type="file"
             onChange={changeImage}/>
           
          </div>
          {
            photoUpdate && <img src={photoUpdate} alt="New Image"/>
          }
          <button type="submit">Update</button>
        </form>
      </article>
      </main>
      </div>
    )
}

export default ProductManagement;