import { GET_PRODUCT_LIST, CARRY_PRODUCT_LIST ,
    GET_ORDER_TO_VENDOR_LIST, CARRY_ORDER_TO_VENDOR_LIST,
    ADD_PRODUCT,
    GET_INFO_ACCOUNT,
    CARRY_INFO_ACCOUNT,
  
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
   }//리듀서가 ProdictList라는 키네임으로 저장을 함.

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

   case GET_INFO_ACCOUNT : {
    console.log("애드프로덕트거래처번호가져오려고 액션취하는놈")
       return {
           ...state
       }
   }

   case CARRY_INFO_ACCOUNT : {
    console.log("애드프로덕트거래처번호가져오는놈")
       return {
           ...state,
           infoAccount : action.payload
       }
   }

   

   default : {
       return{
           ...state
       }
   }

}

}
