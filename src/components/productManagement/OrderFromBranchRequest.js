import React, { Component } from 'react';
import Iamport from 'react-iamport';
import OrderBranchRequestTable from 'components/productManagement/OrderBranchRequestTable'
import {connect} from 'react-redux'
import { getProductList } from 'actions/index';


class OrderFromBranchRequest extends React.Component{

  constructor(props){
    super(props);
    this.state={

    }
  }

    render(){
      const { ProductList } = this.props;

            if(ProductList === undefined){
              this.props.getProductList();
              return(
                <div></div>
              );
            }

      return (
          <div>
            <OrderBranchRequestTable ProductList={ProductList}/>
          </div>
      );
    }
}
  
const mapStateToProps = ({productionManagement}) => {

  const { ProductList } = productionManagement;
  return { ProductList };
}

  export default connect(mapStateToProps, {getProductList})(OrderFromBranchRequest);
  


