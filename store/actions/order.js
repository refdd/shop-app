export const ADD_ORDER =  "ADD_ORDER";
export const addToCart = (carItems , totalAmount) =>{
   return {type : ADD_ORDER , orderData:{
    items: carItems , amount: totalAmount
   }}
}


