import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { categoriesResponse, messageResponse, productResponse, searchResponse } from "../../types/apiType";
import { newProductType, searchProductQueryType } from "../../types/types";

export const productAPI = createApi({
    reducerPath:"productAPI",
    baseQuery:fetchBaseQuery({
        baseUrl:`${import.meta.env.VITE_SERVER}/api/v1/product/`
    }),
    endpoints:(builder)=>({
        getLatestProduct : builder.query<productResponse,string>({
            query:()=>"latest"
        }),
        getAllProducts : builder.query<productResponse,string>({
            query:(id)=>`admin-products?id=${id}`
        }),
        getCategories : builder.query<categoriesResponse,string>({
            query:()=>`categories`
        }),

        getSearchProduct : builder.query<searchResponse,searchProductQueryType>({
            query:({search,price,sort,category,page})=>{
                let base = `all?search=${search}&page=${page}`
                if(price) base += `&price=${price}`
                if(category) base+= `&category=${category}`
                if(sort) base += `&sort=${sort}`

                return base;
            }
        }),

        createNewProduct : builder.mutation<messageResponse,newProductType>({
            query : ({id,formData})=>({
                url:`new?id=${id}`,
                method : "POST",
                body : formData
            })
        })

    })

})


export const {
    useCreateNewProductMutation,
    useGetLatestProductQuery,
    useGetAllProductsQuery,
    useGetCategoriesQuery,
    useGetSearchProductQuery} = productAPI