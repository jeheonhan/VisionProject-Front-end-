import { GET_DAILY_SALES_LIST, 
        CARRY_DAILY_SALES_LIST, 
        GET_DAILY_SALES_DETAIL, 
        CARRY_DAILY_SALES_DETAIL, 
        ADD_DAILY_SALES,
        GET_SALES_MENU_LIST,
        CARRY_SALES_MENU_LIST,
        }      from "actionTypes/ActionTypes";



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

        case ADD_DAILY_SALES : {
            return {
                ...state
            }
        }

        case GET_SALES_MENU_LIST : {
            return {
                ...state
            }
        }

        case CARRY_SALES_MENU_LIST : {
            return {
                ...state,
                salesMenuList : action.payload
            }
        }

        default : {
            return{
                ...state
            }
        }
    }
}