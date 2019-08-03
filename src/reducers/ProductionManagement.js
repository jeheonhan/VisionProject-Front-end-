import { GET_PRODUCT_LIST, CARRY_PRODUCT_LIST ,
    GET_ORDER_TO_VENDOR_LIST, CARRY_ORDER_TO_VENDOR_LIST,
    ADD_PRODUCT,
    GET_INFO_ACCOUNT,  CARRY_INFO_ACCOUNT,
    GET_ORDER_TO_VENDOR_DETAIL_LIST, CARRY_ORDER_TO_VENDOR_DETAIL_LIST, UPDATE_ORDER_TO_VENDOR_CODE ,
    ADD_ORDER_TO_VENDOR , UPDATE_ORDER_TO_VEN_ITEM_CODE,  CARRY_ORDER_BRANCH_LIST , GET_PRODUCT_LIST_FOR_ORDER
    , CARRY_PRODUCT_LIST_FOR_ORDER,
    GET_PRODUCT,
    CARRY_PRODUCT , UPDATE_PRODUCT
} from "actionTypes/ActionTypes";


const INIT_STATE = {


};

export default ( state = INIT_STATE, action) => {

switch(action.type){
   case CARRY_ORDER_BRANCH_LIST : {
       return{
           ...state,
           orderBranchList:action.payload
       }
   }   

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

   case GET_PRODUCT_LIST_FOR_ORDER : {
       return {
           ...state
       }
   }

   case CARRY_PRODUCT_LIST_FOR_ORDER : {
       return {
           ...state,
           ProductListForOrder : action.payload
       }
   }

   case GET_PRODUCT : {
       return {
           ...state
       }
   }

   case CARRY_PRODUCT : {
       return {
           ...state,
           Product: action.payload
       }
   }

   case UPDATE_PRODUCT : {
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
