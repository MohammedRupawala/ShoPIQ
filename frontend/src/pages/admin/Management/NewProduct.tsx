import { ChangeEvent, useState } from 'react'
import AdminSide from '../../../components/admin/adminSide'


const NewProduct = () => {
  const[name,setName]= useState<string>("")
  const[price,setPrice] = useState<number>()
  const[stock,setStock] = useState<number>()
  const[photo,setPhoto] = useState<string>("")
  const changeImage = (e:ChangeEvent<HTMLInputElement>)=>{
    const file:File | undefined = e.target.files?.[0]
    const reader: FileReader =   new FileReader()
    if(file){
      reader.readAsDataURL(file);
      reader.onloadend = ()=>{
        if(typeof reader.result === "string"){
          setPhoto(reader.result)
        }
      }
    }
  }
  return (
    <div className='adminContainer'>
    <AdminSide/>
    <main className="managementBox">
      <article>
        <form>
          <h2>New Product</h2>
          <div>
            <label>Name</label>
            <input
             type="string"
             placeholder='Name'
             value={name}
             onChange={(e)=>{
              setName(e.target.value)
            }}/>
           
          </div>
          <div>
            <label>Price</label>
            <input
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
            photo && <img src={photo} alt="New Image"/>
          }
          <button type="submit">Create</button>
        </form>
      </article>
      </main>
      </div>
    )
}

export default NewProduct