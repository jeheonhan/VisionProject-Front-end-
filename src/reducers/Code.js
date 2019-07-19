import { CARRY_NEW_CODE_NO, CARRY_FOR_CODE_DETAIL, GET_GROUP_CODE_LIST, CARRY_GROUP_CODE_LIST, GET_CODE_LIST, CARRY_CODE_LIST, CHECK_DUPLICATE_RESULT, ADD_CODE_RESULT } from "actionTypes/ActionTypes";


const INIT_STATE = {
    groupCode: "",
    groupCodeName: "",
    codeNo: "",
    codeName: "",
    codeUsageStatus: ""
};

export default (state = INIT_STATE, action) => {
switch(action.type){
   case GET_GROUP_CODE_LIST : {
       //console.log("reducer GET_GROUP_CODE_LIST")
       return{
           ...state
       }
   }
   case CARRY_NEW_CODE_NO : {
       return{
           ...state,
           newCodeNo: action.payload
       }
   }
   case CARRY_GROUP_CODE_LIST : {
       return{
           ...state,
           groupCodeList: action.payload
       }
   }

   case GET_CODE_LIST : {
       return{
           ...state
       }
   }

   case CARRY_CODE_LIST : {
       const named = action.payload[0].groupCode+"List";
       return {
           ...state,
           [named]: action.payload
       }
    }

    case CARRY_FOR_CODE_DETAIL : {
        return {
            ...state,
            codeList : action.payload
        }
    }

    case ADD_CODE_RESULT : {
        return{
            ...state,
            codeList : action.payload
        }
    }

    case CHECK_DUPLICATE_RESULT : {
        return {
            ...state,
            CodeNameBool : action.payload
        }
    }

   default : {
       return{
           ...state
       }
   }
}
}