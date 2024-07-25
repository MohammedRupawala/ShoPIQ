import {  GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'
import { auth } from '../firebase'
import { useLoginMutation } from '../redux/api/userAPI'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { newUserResponse } from '../types/apiType'
const Login = () => {
    const [gender,setGender] = useState<string>("")
    const [dateOfBirth,setDateOfBirth] = useState<string>("")
    const [login]  = useLoginMutation()
    const loginHandler = async()=>{
        try{
            const provider = new GoogleAuthProvider();
            const {user} = await signInWithPopup(auth,provider)
           const res = await login({
                name:user.displayName!,
                email:user.email!,
                photo:user.photoURL!,
                _id:user.uid,
                role:"user",
                dob:dateOfBirth,
                gender,

            })
            if("data" in res && res.data){
                toast.success(res.data.message!) as string
            }
            else {
                const error = res.error as FetchBaseQueryError
                const  message = error.data as newUserResponse
                toast.error(message.message)
            }
            console.log(user)
        }
        catch(error){
            toast.error("Sign IN Fail")
        }
    }
    
  return (
    <div className='login'>
        <main>
        <h1 className='heading'>Heading</h1>
        <div>
            <label>
                Gender
            </label>
            <select 
            value={gender} 
            onChange={(e)=>setGender(e.target.value)}>
                <option value=""> Select Gender</option>
                <option value="male"> Male</option>
                <option value="female"> Female</option>
            </select>
       
        </div>
        <div>
            <label>
                Date Of Birth
            </label>
            <input type='date' 
            value={dateOfBirth} 
            onChange={(e)=>{setDateOfBirth(e.target.value)}}/>
        </div>
        <div>
            <p>Already Signed In</p>
            <button onClick={loginHandler}><FcGoogle/> <span>Continue with Google</span></button>
        </div>
        </main>
    </div>
  )
}

export default Login