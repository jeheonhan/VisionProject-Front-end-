import React from "react";
import { connect } from 'react-redux';
import {getOrderToVendorList} from "actions/ProductionManagement";
import GetOrderToVendorList from 'components/productManagement/GetOrderToVendorList'



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

                {OrderToVendorList !== undefined ? (<GetOrderToVendorList OrderToVendorList = {OrderToVendorList}></GetOrderToVendorList>):"error"}

            </div>
        );
        
    }


}

const mapStateToProps = ({productionManagement}) => {
    const {OrderToVendorList} = productionManagement;
    return {OrderToVendorList};
}

export default connect(mapStateToProps,{getOrderToVendorList})(OrderToVendorManage)
