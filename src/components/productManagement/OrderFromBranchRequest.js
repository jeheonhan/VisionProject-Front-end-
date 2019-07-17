import React, { Component } from 'react';
import Iamport from 'react-iamport';
import {connect} from 'react-redux'

class OrderFromBranchRequest extends React.Component{

  constructor(props){
    super(props);
    this.state={

    }
  }

    render(){

      return (
          <Iamport
            identificationCode="imp36066914"
            params={{
              pg: 'inicis',
              pay_method: 'card',
              merchant_uid: 'merchant_' + new Date().getTime(),
              name: '상품 주문',
              amount: 222,
              buyer_email: '',
              buyer_name: '지점장명',
              buyer_tel: '지점장 휴대폰번호',
              buyer_addr: '지점주소',
              buyer_postcode: '지점우편번호',
              m_redirect_url: 'http://localhost:8080/productionManagement/orderFromBranch',
            }}
            jqueryLoaded={false}
            onFailed={err => console.log(err)}
            onSuccess={res => console.log(res)}
            render={(renderProps) => (
              <button
                type="button"
                onClick={renderProps.onClick}
              >
                결제하기
              </button>
            )}
          />
      );
    }
}
  
  const mapStateToProps = (state) => {
    return state;
  }

  export default connect(mapStateToProps)(OrderFromBranchRequest);
  

 