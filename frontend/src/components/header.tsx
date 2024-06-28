import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingBag,FaSearch,FaSignInAlt, FaUser, FaSign, FaSignOutAlt } from 'react-icons/fa'
const user={_id:"1212",role:"user"}
const Header = () => {
    const [isOpen,setIsOpen]=useState<boolean>(false)
   const logOutHandler = ()=>{
    setIsOpen(false)
   }
  return (
    <div>
        <nav className='header'>
            <Link to="/" onClick={()=>setIsOpen(false)}>Home</Link>
            <Link to ="/search" onClick={()=>setIsOpen(false)}><FaSearch/></Link>
            <Link to="/cart" onClick={()=>setIsOpen(false)}><FaShoppingBag/></Link>
           {
            user._id?(
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