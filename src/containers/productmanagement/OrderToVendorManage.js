import React from "react";
import { connect } from 'react-redux';
import {getOrderToVendorList} from "actions/ProductionManagement";
import GetOrderToVendorList from 'components/productManagement/GetOrderToVendorList'
import CardBox from "components/CardBox";


class OrderToVendorManage extends React.Component{

    constructor(props){
        super(props);
          
        }


    render(){
        
        const {OrderToVendorList} = this.props;

        if(OrderToVendorList === undefined){
            this.props.getOrderToVendorList()
        }

        return(

            <div>
          <CardBox styleName="col-lg-13" cardStyle="p-0" headerOutside>
            <div>

                {OrderToVendorList !== undefined ? (<GetOrderToVendorList OrderToVendorList = {OrderToVendorList}></GetOrderToVendorList>):"error"}

            </div>
            </CardBox>
            </div>
        );
        
    }


}

const mapStateToProps = ({productionManagement}) => {
    const {OrderToVendorList} = productionManagement;
    return {OrderToVendorList};
}

export default connect(mapStateToProps,{getOrderToVendorList})(OrderToVendorManage)
