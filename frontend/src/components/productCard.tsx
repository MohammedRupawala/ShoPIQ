import React from 'react'
import { FaPlus } from "react-icons/fa"
import { server } from '../redux/store'
type ProductProps = {
    photo:string
    productId : string
    stock : number
    price : number
    name :string
    handler : ()=>void
}

const ProductCard = ({name,photo,productId,stock,price,handler}:ProductProps) => {
  return (
    <div className='productCard'>
         <img src={`${server}/${photo}`} alt={name}/>
         <p>{name}</p>
         <span>${price}</span>
        <div>
            <button onClick={()=>handler()}>
                <FaPlus/>
            </button>
        </div>
    </div>
    
  )
}

export default ProductCard