import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { categoriesResponse, messageResponse, productResponse, searchResponse, singleResponse } from "../../types/apiType";
import { deleteProductType, newProductType, searchProductQueryType, updateProductType } from "../../types/types";

export const productAPI = createApi({
    reducerPath:"productAPI",
    baseQuery:fetchBaseQuery({
        baseUrl:`${import.meta.env.VITE_SERVER}/api/v1/product/`
    }),
    tagTypes: ["product"],
    endpoints:(builder)=>({
        getLatestProduct : builder.query<productResponse,string>({
            query:()=>"latest",
            providesTags: ["product"],
        }),
        getAllProducts : builder.query<productResponse,string>({
            query:(id)=>`admin-products?id=${id}`,
            providesTags: ["product"],
        }),
        getCategories : builder.query<categoriesResponse,string>({
            query:()=>`categories`,
            providesTags: ["product"],
        }),

        getSearchProduct : builder.query<searchResponse,searchProductQueryType>({
            query:({search,price,sort,category,page})=>{
                let base = `all?search=${search}&page=${page}`
                if(price) base += `&price=${price}`
                if(category) base+= `&category=${category}`
                if(sort) base += `&sort=${sort}`

                return base;
            },
            providesTags: ["product"],
        }),

        createNewProduct : builder.mutation<messageResponse,newProductType>({
            query : ({id,formData})=>({
                url:`new?id=${id}`,
                method : "POST",
                body : formData
            }),
            invalidatesTags: ["product"],
        }),
        singleProduct : builder.query<singleResponse,string>({
            query : (id)=>id,
            providesTags:["product"]
        }),
        updateProduct : builder.mutation<messageResponse,updateProductType>({
            query : ({id,productId,formData})=>({
                url : `${productId}?id=${id}`,
                method : "PUT",
                body : formData
            }),
            invalidatesTags: ["product"],
        }),
        deleteProduct : builder.mutation<messageResponse,deleteProductType>({
            query : ({productId,id})=>({
                url:`${productId}?id=${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["product"]
        })

    })

})


export const {
    useCreateNewProductMutation,
    useGetLatestProductQuery,
    useGetAllProductsQuery,
    useGetCategoriesQuery,
    useGetSearchProductQuery,
    useSingleProductQuery,
    useUpdateProductMutation,
    useDeleteProductMutation
} = productAPI