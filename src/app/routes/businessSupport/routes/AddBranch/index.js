import React from "react";
import ContainerHeader from "components/ContainerHeader";
import AddBranchManage from "containers/businessSupport/AddBranchManage";

const AddBranch = ({match}) => {
    return (
  
      <div>
        <ContainerHeader title={"신규가맹등록"} match={match}/>  
        <AddBranchManage></AddBranchManage>
      </div>
    );
  };
  
  export default AddBranch;
  