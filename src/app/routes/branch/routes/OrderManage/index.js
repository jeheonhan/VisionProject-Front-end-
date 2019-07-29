import React from "react";
import OrderFromBranchBox from 'containers/productmanagement/OrderFromBranchBox'
import ContainerHeader from "components/ContainerHeader";

const OrderManage = ({match}) => {
    return (
  
      <div>
        <ContainerHeader title={"내주문관리"} match={match}/>

        <OrderFromBranchBox/>
      </div>
    );
  };
  
  export default OrderManage;
  