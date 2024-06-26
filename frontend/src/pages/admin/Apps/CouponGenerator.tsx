import { FormEvent, useEffect, useState } from "react"
import AdminSide from "../../../components/admin/adminSide";
const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "1234567890";
const allSymbols = "!@#$%^&*()_+";


const CouponGenerator = () => {
  const [size,setSize] = useState<number>(8)
  const [prefix,setprefix] = useState<string>("")
  const [includeNumber,setincludeNumber] = useState<boolean>(false)
  const [includeSymbol,setincludeSymbol] = useState<boolean>(false)
  const [includeCharacter,setincludeCharacter] = useState<boolean>(false)
  const [isCopied,setIsCopied] = useState<boolean>(false)
  const [coupon,setCoupon] = useState<string>("")
  const copyCode= async(coupon:string)=>{
    await window.navigator.clipboard.writeText(coupon)
    setIsCopied(true)
  }
  const submitHandler = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(!includeCharacter && !includeNumber && !includeSymbol){
      return alert("Kuch To Lele")
    }
    let result  : string = prefix || ""
    const length:number = size - result.length
    for(let i = 0;i<length;i++){
      let entireString= ""
      if(includeCharacter) entireString += allLetters
      if(includeNumber) entireString += allNumbers
      if(includeSymbol) entireString += allSymbols
      const ranNum : number = ~~(Math.random()*entireString.length)
      result += entireString[ranNum]
    }
    setCoupon(result)

  }
  useEffect(()=>{
    setIsCopied(false)
  },[coupon])

  return (
    <div className='adminContainer'>
    <AdminSide/>
    <main className="appsBox">
      <h1>Coupon</h1>
      <section>
        <form className="couponForm" onSubmit={submitHandler}>
          <input type="text" 
          placeholder="Include Text" 
          value={prefix}
          onChange={(e)=>setprefix(e.target.value)}/>
           <input type="number" 
          placeholder="Coupon Length" 
          value={size}
          onChange={(e)=>setSize(Number(e.target.value))}
          max={25}
          min={4}/>
          <fieldset>
            <legend>Include</legend>
            <input 
            type="checkbox" 
            checked={includeNumber}
            onChange={()=>setincludeNumber((prev)=>!prev)}/>
            <span>Numbers</span>
            <input 
            type="checkbox" 
            checked={includeCharacter}
            onChange={()=>setincludeCharacter((prev)=>!prev)}/>
            <span>Characters</span>
            <input 
            type="checkbox" 
            checked={includeSymbol}
            onChange={()=>setincludeSymbol((prev)=>!prev)}/>
            <span>Symbols</span>
          </fieldset>
          <button type='submit'>Generate</button>
        </form>
        {
          coupon && <code>
            {
              coupon
            }
            <span onClick={()=>copyCode(coupon)}>{isCopied?"Copied":"Copy"}</span>
          </code>
        }
      </section>
    </main>
    </div>
  )
}

export default CouponGenerator