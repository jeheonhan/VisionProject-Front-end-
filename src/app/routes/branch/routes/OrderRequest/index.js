import React from "react";
import OrderFromBranchRequestContainer from "components/productManagement/OrderFromBranchRequest";
import ContainerHeader from "components/ContainerHeader";

const OrderRequest = ({match}) => {
    return (
  
      <div>
        <ContainerHeader title={"주문요청"} match={match}/>

        <OrderFromBranchRequestContainer/>  
      </div>
    );
  };
  
  export default OrderRequest;
  