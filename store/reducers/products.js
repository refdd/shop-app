import PRODUCTS from "../../data/dummy-data";
const initialState = {
    availableProdusts:PRODUCTS,
    userProducts : PRODUCTS.filter(prod => prod.ownrId === 'u1')
};
export default (state = initialState , action) =>{
    return state
}