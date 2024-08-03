import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingBag,FaSearch,FaSignInAlt, FaUser, FaSign, FaSignOutAlt } from 'react-icons/fa'
import { User } from '../types/types'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import toast from 'react-hot-toast'
type Props = {
    user : User | null
}
const Header = ({user} : Props) => {
    const [isOpen,setIsOpen]=useState<boolean>(false)
   const logOutHandler = async()=>{
    try{
        signOut(auth)
        setIsOpen(false)
        toast.success("Sign Out Success")
    }
    catch(error){
        toast.error("Sign Out Unsuccessfull")
    }
    }
  return (
    <div>
        <nav className='header'>
            <Link to="/" onClick={()=>setIsOpen(false)}>Home</Link>
            <Link to ="/search" onClick={()=>setIsOpen(false)}><FaSearch/></Link>
            <Link to="/cart" onClick={()=>setIsOpen(false)}><FaShoppingBag/></Link>
           {
            user?._id?(
                <>
                <button onClick={()=>setIsOpen((prev)=>!prev)}>
                    <FaUser/>
                </button>
                <dialog open={isOpen}>
                    <div>
                        {
                            user.role==="admin" && <Link  onClick={()=>setIsOpen(false)}to="/admin/dashboard">Admin</Link>
                        }
                        <Link onClick={()=>setIsOpen(false)} to = "/orders">Order</Link>
                        <button onClick={logOutHandler}><FaSignOutAlt/></button>
                    </div>
                </dialog>
                </>
            ): (
            <Link to="/login"><FaSignInAlt/></Link>
        )}
        </nav>
    </div>
  )
}

export default Header