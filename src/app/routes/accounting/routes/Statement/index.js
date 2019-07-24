import React from "react";
import ContainerHeader from "components/ContainerHeader";
import StatementManage from "containers/accounting/StatementManage";
import AddStatement from "components/accounting/AddStatement";

const Statement = ({match}) => {
    return (
  
      <div>
        <ContainerHeader title={"회계관리"} match={match}/>
        <StatementManage></StatementManage>
        <div align='right'>
          <AddStatement></AddStatement>
        </div>
      </div>
    );
  };
  
  export default Statement;
  