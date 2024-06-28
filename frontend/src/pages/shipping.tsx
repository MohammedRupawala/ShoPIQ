import {ChangeEvent, ChangeEventHandler, useState} from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

const Shipping = () => {
    const navigate = useNavigate()
  const [shipping,setShipping]=useState({
    address:"",
    city:"",
    state:"",
    country:"",
    pinCode:"",
  })
  const chageHandler = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>
    {
        setShipping((prev)=>({...prev,[e.target.name]:e.target.value}))
    }
  return (
    <div className='shipping'>
        <button className='backButton' onClick={()=>navigate("/cart")}><BiArrowBack/></button>
        <form>
            <h1>Shipping Address</h1>
            <input 
            required
            type='text' 
            placeholder='Address' 
            name='address' 
            value={shipping.address} 
            onChange={chageHandler}></input>
            <input 
            required
            type='text' 
            placeholder='City' 
            name='city' 
            value={shipping.city} 
            onChange={chageHandler}></input>
             <input 
            required
            type='text' 
            placeholder='state' 
            name='state' 
            value={shipping.state} 
            onChange={chageHandler}></input>
            <select 
            name="country"
            required
            value={shipping.country}
            onChange={chageHandler}>
                <option value="">Choose Your Country</option>
                <option value="india">India</option>
                <option value="england">England</option>
                <option value="italy">Italy</option>
                <option value="germany">Germany</option>
            </select>
             <input 
            required
            type='number' 
            placeholder='Pin Code' 
            name='pinCode' 
            value={shipping.pinCode} 
            onChange={chageHandler}></input>
            <button type="submit">Pay Now</button>
           
        </form>
    </div>
  )
}

export default Shipping