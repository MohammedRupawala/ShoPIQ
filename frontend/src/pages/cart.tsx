import  { useEffect, useState } from 'react'
import { VscError } from 'react-icons/vsc'
import CartItem from "../components/cartItem"
import { Link } from 'react-router-dom'
const subtotal = 2000
const tax = 2000 * 0.18
const shippingCharges = 50
const discount = 200
const total = subtotal + shippingCharges + tax - discount
const cartItems = [
  {
    photo :"https://m.media-amazon.com/images/I/81zdgqyLRWL._SY450_.jpg",
    productId:"addd",
    stock:20,
    quantity:1,
    name:"Lenevo Loq",
    price:49999
  }
]

const Cart = () => {
  const [couponCode,setCouponCode]  = useState<string>("")
  const [isValidcouponCode,setIsValidCouponCode]  = useState<boolean>(false)
  useEffect(()=>{
    const timeOutId = setTimeout(()=>{
      if(Math.random()>0.5){setIsValidCouponCode(true)
      }
        else setIsValidCouponCode(false)
    },1000)
  return()=>{
    clearTimeout(timeOutId)
    setIsValidCouponCode(false)
  }
  },[couponCode])

  return (
    <div className='cart'>
      <main>
        {
       cartItems.length > 0 ? (
        cartItems.map((i,idx)=><CartItem key={idx} cartItem={i} />)
       ):(
        <h1>No Items Added</h1>
       )
        }
      </main>
      <aside>
        <p>SubTotal : {subtotal}</p>
        <p>Tax : {tax}</p>
        <p>ShippingCharges : {shippingCharges}</p>
        <p>Discount : {discount}</p>
        <p>Total : {total}</p>
        <input type='text' placeholder='Coupon Code' value={couponCode} onChange={e=>setCouponCode(e.target.value)}>
        </input>
        {
          couponCode && (
            isValidcouponCode?(
              <span className='green'>{discount} of using  <code>{couponCode}</code></span>
            ):(
              <span className='red'>In Valid Coupon Code <VscError/></span>
            )
          )
        }
        {
          cartItems.length>0 && <Link to="/shipping">Check Out</Link>
        }
      </aside>
    </div>
  )
}

export default Cart