import {
    GET_VENDOR_LIST, 
    CARRY_VENDOR_LIST, 
    ADD_VENDOR, 
    GET_VENDOR, 
    CARRY_VENDOR, 
    UPDATE_VENDOR, 
    GET_CARD_LIST, 
    CARRY_CARD_LIST,
    GET_ACCOUNT_LIST,
    CARRY_ACCOUNT_LIST,
    ADD_CARD,
    GET_CARD,
    CARRY_CARD
} from'../actionTypes/ActionTypes';

const INIT_STATE = {
    loader: false,
};

export default (state = INIT_STATE, action) => {
    switch(action.type){
        case GET_VENDOR_LIST : {
            return{
                ...state
            }
        }

        case CARRY_VENDOR_LIST : {
            return{
                ...state,
                VendorList: action.payload
            }
        }

        case ADD_VENDOR : {
            return{
                ...state
            }
        }

        case GET_VENDOR : {
            return{
                ...state
            }
        }

        case CARRY_VENDOR : {
            return{
                ...state,
                Vendor : action.payload
            }
        }

        case UPDATE_VENDOR : {
            return{
                ...state,
                Vendor : action.payload
            }
        }

        case GET_CARD_LIST : {
            return{
                ...state
            }
        }

        case CARRY_CARD_LIST : {
            return{
                ...state,
                cardList: action.payload
            }
        }

        case GET_ACCOUNT_LIST : {
            return{
                ...state
            }
        }

        case CARRY_ACCOUNT_LIST : {
            return{
                ...state,
                AccountList: action.payload
            }
        }        
        
        case ADD_CARD : {
            return{
                ...state
            }
        }

        case GET_CARD : {
            return{
                ...state
            }
        }

        case CARRY_CARD : {
            return{
                ...state,
                Card : action.payload
            }
        }

        default : {
            return{
                ...state
            }
        }
    }
}