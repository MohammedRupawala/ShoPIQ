import React, { useState } from 'react'
import ProductCard from '../components/productCard'

const Search = () => {
  const [search,setSearch] = useState<string>("")
  const [sort,setSort] = useState<string>("")
  const [maxPrice,setMaxPrice] = useState<number>()
  const [category,setCategory] = useState<string>("")
  const [page,setPage] = useState<number>(1)
  const isPrev = false;
  const isNext = false; 
const addToCart = ()=>{}
  return (
    <div className='search'>
      <aside>
        <h2>Filter</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e)=>setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Low to High</option>
            <option  value="dsc">High to Low</option>
          </select>
        </div>
        <div>
          <h4>Max Price : {maxPrice}</h4>
          <input type="range" value={maxPrice}  max={1000000} min ={100}onChange={(e)=>setMaxPrice(Number(e.target.value))} />
        </div>
        <div>
          <h4>Sort</h4>
          <select value={category} onChange={(e)=>setCategory(e.target.value)}>
            <option value="">All Category</option>
            <option value="cam">Cameras</option>
            <option  value="laptop">Laptops</option>
            <option  value="games">Game</option>
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input type="text" value={search} placeholder='Search' onChange={(e)=>{setSearch(e.target.value)}}/>
        <div className="searchList">
          <ProductCard productId='hhhgh' 
         name={"Ea FC"}
         price={2000} 
         stock={32} 
         photo="https://m.media-amazon.com/images/I/81zdgqyLRWL._SY450_.jpg" 
         handler={addToCart}/>
         <ProductCard productId='hhhgh' 
         name="Moto Ac"
         price={29000} 
         stock={32} 
         photo="https://m.media-amazon.com/images/I/81zdgqyLRWL._SY450_.jpg" 
         handler={addToCart}/>
         <ProductCard productId='hhhgh' 
         name="Lenovo Loq"
         price={200000} 
         stock={32} 
         photo="https://m.media-amazon.com/images/I/81zdgqyLRWL._SY450_.jpg" 
         handler={addToCart}/>
        </div>
        <article>
          <button disabled={!isPrev} onClick={()=>setPage(prev=>prev = prev - 1)}>Prev</button>
          <span>{page} of 6</span>
          <button disabled={!isNext} onClick={()=>setPage(prev=>prev = prev + 1)}>next</button>
        </article>
      </main>
    </div>
  )
}

export default Search