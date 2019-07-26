import React from "react";
import ContainerHeader from "components/ContainerHeader";
import SalaryManage from "containers/accounting/SalaryManage";
import AddSalary from "components/accounting/AddSalary";

const Salary = ({match}) => {
    return (
  
      <div>
        <ContainerHeader title={"회계관리"} match={match}/>
        <SalaryManage></SalaryManage>
        <div align="right">
          <AddSalary></AddSalary>
        </div>
      </div>
    );
  };
  
  export default Salary;
  