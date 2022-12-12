 export const ADD_TO_CART =  "ADD_TO_CART";
 export const REMOVE_FROM_CART =  "REMOVE_FROM_CART";
export const addToCart = products =>{
    return {type : ADD_TO_CART , products : products}
}

export const removeFromCart = productId =>{
    return {type : REMOVE_FROM_CART , pid : productId}
}