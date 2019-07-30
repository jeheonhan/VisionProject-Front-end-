import React from "react";
import ContainerHeader from "components/ContainerHeader";
import DailySalesManage from "containers/branch/DailySalesManage";
import AddDailySalesManage from "containers/branch/AddDailySalesManage";

const DailySales = ({match}) => {
    return (
  
      <div>
        <ContainerHeader title={"일 매출조회"} match={match}/>
        <DailySalesManage></DailySalesManage>
        <div align="right">
        <AddDailySalesManage></AddDailySalesManage>
        </div>
      </div>
    );
  };
  
  export default DailySales;
  