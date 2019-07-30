import React from "react";
import GetProductList from 'components/productManagement/GetProductList';
import { connect } from 'react-redux';
import { getProductList } from "actions/ProductionManagement";
import CardBox from "components/CardBox";
import AddProduct from "components/productManagement/AddProduct";
import {  getInfoAccount } from 'actions/index';

class ProductionManage extends React.Component{
    
    constructor(props){
        
      super(props);
        const {getInfoAccount} = this.props;

    if({getInfoAccount} !== undefined){
      getInfoAccount();
    };
    }
        render(){
            
            const { ProductList } = this.props;

            if(ProductList === undefined){
              this.props.getProductList()
            }
              return(
                <div>
          <CardBox styleName="col-lg-13" cardStyle="p-0" headerOutside>
                <div>
                      
                  {ProductList !== undefined ? (<GetProductList ProductList={ProductList}></GetProductList>):"error"}
               
                  </div>
                  </CardBox>
                <div align="right">
                  <AddProduct  infoAccount = { getInfoAccount } >  </AddProduct>
                  </div>
                  </div>
                  
              );
        }
}

  const mapStateToProps = ({productionManagement}) => {

    const { ProductList } = productionManagement;
    console.log("ProductList ------");
    console.log(ProductList);
    return { ProductList };
  }
  
  export default connect(mapStateToProps, { getProductList,  getInfoAccount })(ProductionManage);