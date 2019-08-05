import { SIGNOUT_USER_SUCCESS, CARRY_APPROVAL_FORM_LIST, GET_APPROVAL_FORM_LIST, CARRY_APPROVAL_FORM_DETAIL, CARRY_APPROVAL_LIST, CARRY_APPROVAL_DETAIL } from "actionTypes/ActionTypes";


const INIT_STATE = {
    approvalFormList:undefined,
    approvalFormDetail:undefined,
    approvalList:undefined,
    approvalDetail:undefined
};

export default (state = INIT_STATE, action) => {
switch(action.type){
   case SIGNOUT_USER_SUCCESS : {
       return {
           INIT_STATE
       }
   }
   case GET_APPROVAL_FORM_LIST : {
       return{
           ...state,
           loader:true
       }
   }

   case CARRY_APPROVAL_FORM_LIST : {
       return{
           ...state,
           approvalFormList : action.payload,
           loader:false
       }
   }

   case CARRY_APPROVAL_FORM_DETAIL : {
       return{
           ...state,
           approvalFormDetail : action.payload,
           loader:false
       }
   }

   case CARRY_APPROVAL_LIST : {
       return{
           ...state,
           approvalList : action.payload,
           loader:false
       }
   }

   case CARRY_APPROVAL_DETAIL : {
       return{
           ...state,
           approvalDetail : action.payload
       }
   }

   default : {
       return{
           ...state
       }
   }
}
}