import React from "react";
import { connect } from 'react-redux';
import OrderFromBranchRequest from "components/productManagement/OrderFromBranchRequest";


class OrderFromBranchRequestContainer extends React.Component{

  constructor(props){
    super(props);
    this.state={search:{searchKeyword:""}}
  }

    render(){


        return(
          <OrderFromBranchRequest/>
        );
    }
}
  
  const mapStateToProps = ({humanResource}) => {
    const { HRCardList } = humanResource;
    return { HRCardList };
  }

  export default connect(mapStateToProps, {})(OrderFromBranchRequestContainer);
  

 