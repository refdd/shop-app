import { AUTHENTICATE, LOGOUT } from "../actions/auth"

const initialState = {
    token : null,
    userId: null,
    modeSingn: false
}
 export default (state = initialState , action)=>{
    switch (action.type){
        case AUTHENTICATE :
            return {
                token : action.token,
                userId : action.userId,
                modeSingn:action.mode 
            }
            case LOGOUT :
                return initialState
        // case SIGNUP : return {
        //         token : action.token,
        //         userId : action.userId,
        //         modeSingn:action.mode 
        //     }
        default:
            return state    
    }
 }