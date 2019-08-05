import React from "react";
import { connect } from 'react-redux';
import OrderFromBranchTableB from "components/productManagement/OrderBranchTableB";
import { getOrderBranchList } from "actions/index"


class OrderFromBranchRequestContainer extends React.Component{

  constructor(props){
    super(props);
    this.state={search:{searchKeyword:JSON.parse(localStorage.getItem("user")).branchNo}}
  }

    render(){
        if(this.props.orderBranchList===undefined){
            this.props.getOrderBranchList(this.state.search);
            return (
                <div></div>
            )
        }
        return(
          <OrderFromBranchTableB/>
        );
    }
}
  
  const mapStateToProps = ({productionManagement}) => {
    const { orderBranchList } = productionManagement;
    return { orderBranchList };
  }

  export default connect(mapStateToProps, { getOrderBranchList })(OrderFromBranchRequestContainer);
  

 