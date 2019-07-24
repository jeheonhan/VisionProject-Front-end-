import React from "react";
import ContainerHeader from "components/ContainerHeader";
import OrderToVendorManage from "containers/productmanagement/OrderToVendorManage";
const OrderToVendor = ({match}) => {
    return (
  
      <div>
        <ContainerHeader title={"발주관리"} match={match}/>
        <OrderToVendorManage></OrderToVendorManage>
      </div>
    );
  };
  
  export default OrderToVendor;
  