import React from "react";
import ContainerHeader from "components/ContainerHeader";
import DailySalesManage from "containers/branch/DailySalesManage";

const DailySales = ({match}) => {
    return (
  
      <div>
        <ContainerHeader title={"일 매출조회"} match={match}/>
        <DailySalesManage></DailySalesManage>
      </div>
    );
  };
  
  export default DailySales;
  