import React from "react";
import { connect } from 'react-redux';
import OrderFromBranchTableC from "components/productManagement/OrderBranchTableC";
import { getOrderBranchList } from "actions/index"


class OrderFromBranchRequestContainer extends React.Component{

  constructor(props){
    super(props);
  }

    render(){
        if(this.props.orderBranchList===undefined){
            this.props.getOrderBranchList({});
            return (
                <div></div>
            )
        }
        return(
          <OrderFromBranchTableC/>
        );
    }
}
  
  const mapStateToProps = ({productionManagement}) => {
    const { orderBranchList } = productionManagement;
    return { orderBranchList };
  }

  export default connect(mapStateToProps, { getOrderBranchList })(OrderFromBranchRequestContainer);
  

 