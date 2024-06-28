import React from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/productCard'
const addToCart=()=>{}
const Home = () => {
  return (
    <div className='home'>
      <section>

      </section>
      <h1>
        Latest Program
        <Link  className="findMore"to="/search">More</Link>
      </h1>
      <main>
        <ProductCard 
         productId='hghhgh' 
         name="Lenovo Loq"
         price={49999} 
         stock={32} 
         photo="https://m.media-amazon.com/images/I/81zdgqyLRWL._SY450_.jpg" 
         handler={addToCart}/>
      </main>

    </div>
  )
}

export default Home