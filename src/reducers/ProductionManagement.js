import { GET_PRODUCT_LIST, CARRY_PRODUCT_LIST ,
    GET_ORDER_TO_VENDOR_LIST, CARRY_ORDER_TO_VENDOR_LIST,
    ADD_PRODUCT,
    GET_ADD_PRODUCT_ACCOUNT,
    CARRY_ADD_PRODUCT_ACCOUNT,
  
} from "actionTypes/ActionTypes";


const INIT_STATE = {
productNo : "",
productName : "",
purchasePrice : "",
salesPrice : "",
quantity : "",

};

export default ( state = INIT_STATE, action) => {
console.log("분기하기전");

switch(action.type){
   

   case GET_PRODUCT_LIST : {
       console.log("겟프로덕트리스트" );
       return {
           ...state
       }
   }

   case CARRY_PRODUCT_LIST : {
       console.log("캐리프로덕트리스트 ");
       return{
           ...state,
           ProductList: action.payload
       }
   }

   case GET_ORDER_TO_VENDOR_LIST : {
       console.log("겟오더벤더리스트")
       return {
           ...state
       }
   }

   case CARRY_ORDER_TO_VENDOR_LIST : {
       console.log("캐리오브더벤더리스트")
       return {
           ...state,
           OrderToVendorList : action.payload
       }
   }

   case ADD_PRODUCT : {
    console.log("애드프로덕트")
       return {
           ...state
       }
   }

   case GET_ADD_PRODUCT_ACCOUNT : {
    console.log("애드프로덕트거래처번호가져오려고 액션취하는놈")
       return {
           ...state
       }
   }

   case CARRY_ADD_PRODUCT_ACCOUNT : {
    console.log("애드프로덕트거래처번호가져오는놈")
       return {
           ...state,
           getInfoAccount : action.payload
       }
   }

   

   default : {
       return{
           ...state
       }
   }

}

}
