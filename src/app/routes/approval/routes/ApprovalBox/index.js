import React from "react";
import ContainerHeader from "components/ContainerHeader";
import ApprovalBoxContainer from 'containers/approval/ApprovalBoxContainer'

const ApprovalBox = ({match}) => {
    return (
  
      <div>
        <ContainerHeader title={"내 결재함"} match={match}/>
               <ApprovalBoxContainer></ApprovalBoxContainer>
       <div align="right">
       </div>
  
       </div> 
    );
  };
  
  export default ApprovalBox;
  