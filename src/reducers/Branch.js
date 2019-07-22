import { GET_DAILY_SALES_LIST, CARRY_DAILY_SALES_LIST } from "actionTypes/ActionTypes";



const INIT_STATE = {
}

export default ( state = INIT_STATE, action) => {
    switch(action.type){
        case GET_DAILY_SALES_LIST : {
            return {
                ...state
            }
        }

        case CARRY_DAILY_SALES_LIST : {
            return {
                ...state,
                dailySalesList : action.payload
            }
        }

        default : {
            return{
                ...state
            }
        }
    }
}