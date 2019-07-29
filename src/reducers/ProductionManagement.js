import { GET_PRODUCT_LIST, CARRY_PRODUCT_LIST ,
    GET_ORDER_TO_VENDOR_LIST, CARRY_ORDER_TO_VENDOR_LIST,
    ADD_PRODUCT,
    GET_INFO_ACCOUNT,  CARRY_INFO_ACCOUNT,
    GET_ORDER_TO_VENDOR_DETAIL_LIST, CARRY_ORDER_TO_VENDOR_DETAIL_LIST, UPDATE_ORDER_TO_VENDOR_CODE ,
    ADD_ORDER_TO_VENDOR , UPDATE_ORDER_TO_VEN_ITEM_CODE
} from "actionTypes/ActionTypes";


const INIT_STATE = {
productNo : "",
productName : "",
purchasePrice : "",
salesPrice : "",
quantity : "",

};

export default ( state = INIT_STATE, action) => {

switch(action.type){
   

   case GET_PRODUCT_LIST : {
       return {
           ...state
       }
   }

   case CARRY_PRODUCT_LIST : {
       return{
           ...state,
           ProductList: action.payload
       }
   }//리듀서가 스토어에 ProdictList라는 키네임으로 저장을 함.

   case GET_ORDER_TO_VENDOR_LIST : {
       return {
           ...state
       }
   }

   case CARRY_ORDER_TO_VENDOR_LIST : {
       return {
           ...state,
           OrderToVendorList : action.payload
       }
   }

   case ADD_PRODUCT : {
       return {
           ...state
       }
   }

   case GET_INFO_ACCOUNT : {
       return {
           ...state
       }
   }

   case CARRY_INFO_ACCOUNT : {
       return {
           ...state,
           infoAccount : action.payload
       }
   }

   case GET_ORDER_TO_VENDOR_DETAIL_LIST : {
       return {
           ...state
       }
   }

   case CARRY_ORDER_TO_VENDOR_DETAIL_LIST : {
       return {
           ...state,
           OrderToVendorDetatilList : action.payload
       }
   }

   case UPDATE_ORDER_TO_VENDOR_CODE : {
       return {
           ...state
       }
   }

   case ADD_ORDER_TO_VENDOR : {
       return {
           ...state
       }
   }

   case UPDATE_ORDER_TO_VEN_ITEM_CODE : {
       return {
           ...state
       }
   }
   

   default : {
       return{
           ...state
       }
   }

}

}
