import React from "react";
import ContainerHeader from "components/ContainerHeader";
import OrderToVendorManage from "containers/productmanagement/OrderToVendorManage";
import OrderToVendorRequest from "components/productManagement/OrderToVendorRequest";
import { connect } from 'react-redux';




const OrderToVendor = ({match}) => {

  
    return (

      
  
      <div>
        <ContainerHeader title={"발주관리"} match={match}/>
        <OrderToVendorManage></OrderToVendorManage>
        <div align="right">
          <OrderToVendorRequest ></OrderToVendorRequest>
        </div>
      </div>
    );
  };
  
  export default OrderToVendor;
  



  