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
                <div>Loading...</div>
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
  



//import Iamport from 'react-iamport';


  // <Iamport
  //           identificationCode="imp36066914"
  //           params={{
  //             pg: 'inicis',
  //             pay_method: 'card',
  //             merchant_uid: 'merchant_' + new Date().getTime(),
  //             name: '상품 주문',
  //             amount: 222,
  //             buyer_email: '',
  //             buyer_name: '지점장명',
  //             buyer_tel: '지점장 휴대폰번호',
  //             buyer_addr: '지점주소',
  //             buyer_postcode: '지점우편번호',
  //             m_redirect_url: 'http://localhost:8080/productionManagement/orderFromBranch',
  //           }}
  //           jqueryLoaded={false}
  //           onFailed={err => console.log(err)}
  //           onSuccess={res => console.log(res)}
  //           render={(renderProps) => (
  //             <button
  //               type="button"
  //               onClick={renderProps.onClick}
  //             >
  //               결제하기
  //             </button>
  //           )}
  //         />

 