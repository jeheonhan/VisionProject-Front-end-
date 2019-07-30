import React from "react";
import ContainerHeader from "components/ContainerHeader";
import OrderBranchCompany from 'containers/productmanagement/OrderFromBranchBoxCompany'

const OrderFromBranch = ({match}) => {
    return (
  
      <div>
           <ContainerHeader title={"주문관리"} match={match} description={"지점으로부터의 주문현황을 관리할 수 있습니다."}/>
           <OrderBranchCompany/>   
      </div>
    );
  };
  
  export default OrderFromBranch;
  