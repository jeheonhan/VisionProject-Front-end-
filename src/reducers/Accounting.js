import {
    GET_VENDOR_LIST, 
    CARRY_VENDOR_LIST, 
    ADD_VENDOR, 
    GET_VENDOR, 
    CARRY_VENDOR, 
    UPDATE_VENDOR, 
    GET_CARD_LIST, 
    CARRY_CARD_LIST,
    ADD_CARD,
    GET_CARD,
    CARRY_CARD,
    GET_ACCOUNT_LIST,
    CARRY_ACCOUNT_LIST,
    ADD_ACCOUNT,
    CLEAN_STORE_STATE,
    GET_VENDOR_BANK,
    GET_VENDOR_ADDRESS,
    CARRY_VENDOR_BANK,
    CARRY_VENDOR_ADDRESS,
    UPDATE_CARD,
    GET_CHECK_ACCOUNT_LIST,
    CARRY_CHECK_ACCOUNT_LIST,
    GET_ACCOUNT,
    CARRY_ACCOUNT,
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
                vendorInfo : action.payload
            }
        }

        case UPDATE_VENDOR : {
            return{
                ...state
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
                cardInfo : action.payload
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
                accountList: action.payload
            }
        }        
        
        case ADD_ACCOUNT : {
            return{
                ...state
            }
        }

        //원하는 store의 state값 날리기
        case CLEAN_STORE_STATE : {
            return{
                ...state,
                [action.payload]:null
            }
        }

        case GET_VENDOR_BANK : {
            return{
                ...state
            }
        }

        case CARRY_VENDOR_BANK : {
            return{
                ...state,
                vendorBank : action.payload
            }
        }

        case GET_VENDOR_ADDRESS : {
            return{
                ...state
            }
        }

        case CARRY_VENDOR_ADDRESS : {
            return{
                ...state,
                vendorAddress : action.payload
            }
        }

        case UPDATE_CARD : {
            return{
                ...state
            }
        }

        case GET_CHECK_ACCOUNT_LIST : {
            return{
                ...state
            }
        }

        case CARRY_CHECK_ACCOUNT_LIST : {
            return{
                ...state,
                checkAccountList: action.payload
            }
        }
        
        case GET_ACCOUNT : {
            return{
                ...state
            }
        }

        case CARRY_ACCOUNT : {
            return{
                ...state,
                accountInfo : action.payload
            }
        }

        default : {
            return{
                ...state
            }
        }
    }
}