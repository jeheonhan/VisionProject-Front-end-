import React from "react";
import ProductionManage from 'containers/productmanagement/ProductManage';
import ContainerHeader from "components/ContainerHeader";
import AddProduct from 'components/productManagement/AddProduct';

const Product = ({match}) => {
  console.log("시작부분")
  
  return (
    <div>
      <ContainerHeader title={"물품관리"} match={match}/>
      <ProductionManage></ProductionManage>
      <div align="right">
          <AddProduct></AddProduct>
        </div>
    </div>
    
  );
  };
  
  export default Product;
  