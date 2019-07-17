import React from "react";
import ContainerHeader from "components/ContainerHeader";
import VendorManage from "containers/accounting/VendorManage";
import AddVendor from "components/accounting/AddVendor";

//거래처 관리 누르면 나오는 화면
const Vendor = ({match}) => {

    return (
  
      <div>
        <ContainerHeader title={"회계관리"} match={match}/>
        <VendorManage></VendorManage>
        <div align="right">
          <AddVendor></AddVendor>
        </div>
      </div>
    );
  };
  
  export default Vendor;
  