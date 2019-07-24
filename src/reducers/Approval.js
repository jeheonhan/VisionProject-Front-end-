import { CARRY_APPROVAL_FORM_LIST, GET_APPROVAL_FORM_LIST, CARRY_APPROVAL_FORM_DETAIL } from "actionTypes/ActionTypes";


const INIT_STATE = {
};

export default (state = INIT_STATE, action) => {
switch(action.type){
   case GET_APPROVAL_FORM_LIST : {
       return{
           ...state
       }
   }

   case CARRY_APPROVAL_FORM_LIST : {
       return{
           ...state,
           approvalFormList : action.payload
       }
   }

   case CARRY_APPROVAL_FORM_DETAIL : {
       return{
           ...state,
           approvalFormDetail : action.payload
       }
   }

   default : {
       return{
           ...state
       }
   }
}
}