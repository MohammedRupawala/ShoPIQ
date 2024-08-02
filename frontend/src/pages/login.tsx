
// import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth';
// import { useEffect, useState } from 'react';
// import toast from 'react-hot-toast';
// import { FcGoogle } from 'react-icons/fc';
// import { auth } from '../firebase';
// import { useLoginMutation } from '../redux/api/userAPI';
// import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
// import { newUserResponse } from '../types/apiType';
// const loginHandler = async () => {
//     try {
//         const provider = new GoogleAuthProvider();
//         await signInWithRedirect(auth, provider);
//     } catch (error) {
//         toast.error("Sign In Failed");
//         console.log("hello")
//         // toast.error(`Sign In Failed: ${error.message}`);
//     }
// };

// const Login = () => {
//     const [gender, setGender] = useState<string>("");
//     const [dateOfBirth, setDateOfBirth] = useState<string>("");
//     const [login] = useLoginMutation();

//     useEffect(() => {
//         const redirectLoginResult = async () => {
//             try {
//                 console.log("Attempting to get redirect result...");
//                 const res = await getRedirectResult(auth);
//                 console.log("Redirect result:", res);
//                 if (res) {
//                     console.log(res);
//                     console.log("hello");
//                     const user = res.user;
//                     const loginResponse = await login({
//                         name: user.displayName!,
//                         email: user.email!,
//                         _id: user.uid,
//                         photo: user.photoURL!,
//                         gender,
//                         role: "user",
//                         dob: dateOfBirth,
//                     });

//                     if ("data" in loginResponse && loginResponse.data) {
//                         toast.success(loginResponse.data.message!);
//                     } else {
//                         const error = loginResponse.error as FetchBaseQueryError;
//                         const message = error.data as newUserResponse;
//                         toast.error(message.message);
//                     }
//                 }
//             } catch (error) {
//                 toast.error("Sign In Failed");
//             }
//         };

//         redirectLoginResult();
//     }, [login, dateOfBirth, gender]);

    

//     return (
//         <div className='login'>
//             <main>
//                 <h1 className='heading'>Heading</h1>
//                 <div>
//                     <label>Gender</label>
//                     <select value={gender} onChange={(e) => setGender(e.target.value)}>
//                         <option value="">Select Gender</option>
//                         <option value="male">Male</option>
//                         <option value="female">Female</option>
//                     </select>
//                 </div>
//                 <div>
//                     <label>Date Of Birth</label>
//                     <input type='date' value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
//                 </div>
//                 <div>
//                     <p>Already Signed In</p>
//                     <button onClick={loginHandler}>
//                         <FcGoogle /> <span>Continue with Google</span>
//                     </button>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default Login;



















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
