import React from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/productCard'
import { useGetLatestProductQuery } from '../redux/api/productAPI'
import toast from 'react-hot-toast'
import { SkeletonLoading } from '../components/Loader'
const addToCart=()=>{}
const Home = () => {
  const {data,isLoading,isError} = useGetLatestProductQuery("")
if(isError) toast.error("Cannot Fetch")
  return (


    <div className='home'>
      <section>

      </section>
      <h1>
        Latest Program
        <Link  className="findMore"to="/search">More</Link>
      </h1>
      <main>
        {
         isLoading?(<SkeletonLoading length={10}width="80vw"/>): (data?.products.map(i=>(
            <ProductCard 
            key = {i._id}
            productId={i._id} 
            name={i.name}
            price={i.price} 
            stock={i.stock} 
            photo={i.photo} 
            handler={addToCart}/>
   
          )))
        }
      </main>

    </div>
  )
}

export default Home