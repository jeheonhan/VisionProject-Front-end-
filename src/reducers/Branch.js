import { GET_DAILY_SALES_LIST, 
        CARRY_DAILY_SALES_LIST, 
        GET_DAILY_SALES_DETAIL, 
        CARRY_DAILY_SALES_DETAIL }      from "actionTypes/ActionTypes";



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

        case GET_DAILY_SALES_DETAIL : {
            return {
                ...state
            }
        }

        case CARRY_DAILY_SALES_DETAIL : {
            return {
                ...state,
                salesProduct : action.payload
            }
        }

        default : {
            return{
                ...state
            }
        }
    }
}