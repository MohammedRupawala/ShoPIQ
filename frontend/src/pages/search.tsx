import React, { useEffect, useState } from 'react'
import ProductCard from '../components/productCard'
import { useGetCategoriesQuery, useGetSearchProductQuery } from '../redux/api/productAPI'
import toast from 'react-hot-toast'
import { CustomError } from '../types/apiType'
import { SkeletonLoading } from '../components/Loader'

const Search = () => {

  const{data ,isLoading,isError,error} = useGetCategoriesQuery("")
  const [search,setSearch] = useState<string>("")
  const [sort,setSort] = useState<string>("")
  const [maxPrice,setMaxPrice] = useState<number>(1000000)
  const [category,setCategory] = useState<string>("")
  const [page,setPage] = useState<number>(1)
  const {isLoading  : productLoading ,data : productData,isError : isProductError ,error : productError} = useGetSearchProductQuery({
    search,
    price:maxPrice,
    category,
    page,
    sort
  })
  const isPrev = page > 1;
  const isNext = productData ? page < productData.totalPages : false
  useEffect(() => {
    if (isError && error) {
      toast.error((error as CustomError).data.message || 'An error occurred');
    }
  }, [isError, error]);
  useEffect(() => {
    if (isProductError && productError) {
      toast.error((productError as CustomError).data.message || 'An error occurred');
    }
  }, [isProductError, productError]); 
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
            {
             !isLoading && data?.categories.map((i)=>(
              <option key={i} value={i}>{i.toUpperCase()}</option>
             ))
              
            }
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input type="text" value={search} placeholder='Search' onChange={(e)=>{setSearch(e.target.value)}}/>
        {
          productLoading?
          (<SkeletonLoading length={20}/>)
          :(
            <div className="searchList">
          {
            productData?.products.map((i)=>(
              <ProductCard productId={i._id} 
                name={i.name}
                price={i.price} 
                stock={i.stock} 
                photo={i.photo} 
                handler={addToCart}/>
            ))
          }
        </div>
          )
        }
       {
        productData && productData.totalPages>1 &&  <article>
        <button disabled={!isPrev} onClick={()=>setPage(prev=>prev = prev - 1)}>Prev</button>
        <span>{page} of {productData.totalPages}</span>
        <button disabled={!isNext} onClick={()=>setPage(prev=>prev = prev + 1)}>next</button>
      </article>
       }
      </main>
    </div>
  )
}

export default Search