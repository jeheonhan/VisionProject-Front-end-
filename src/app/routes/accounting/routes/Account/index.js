import React from "react";
import ContainerHeader from "components/ContainerHeader";
import AccountManage from "containers/accounting/AccountManage";
import AddAccount from "components/accounting/AddAccount";

const Account = ({match}) => {
    return (
  
      <div>
        <ContainerHeader title={"회계관리"} match={match}/>
        <AccountManage></AccountManage>
        <div align="right">
          <AddAccount></AddAccount>
        </div>
  
      </div>
    );
  };
  
  export default Account;
  