import axios from "axios";
import { createContext } from "react";


export let WishContext =createContext();
  

export default function WishContextProvider (props){

let headers={
    token:localStorage.getItem("userToken")
}

   function addProductToWishList(id){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId:id},{headers:headers})
    .then((res)=>res)
    .catch((err)=>err)
   }


   function getProductFromWishList(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers:headers})
    .then((res)=>res)
    .catch((err)=>err)
   }


   function deleteProductFromWishList(id)
   {

    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers})
    .then((res)=>res)
    .catch((err)=>err)
   }

    return <WishContext.Provider value={{addProductToWishList ,getProductFromWishList ,deleteProductFromWishList }}>
    {props.children}
    </WishContext.Provider>
}








