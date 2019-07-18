import { GET_GROUP_CODE_LIST, CARRY_GROUP_CODE_LIST, GET_CODE_LIST, CARRY_CODE_LIST } from "actionTypes/ActionTypes";


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

   default : {
       return{
           ...state
       }
   }
}
}