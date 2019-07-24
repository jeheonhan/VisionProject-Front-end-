import React from 'react';
import { connect } from 'react-redux';
import { getDepartmentList, convertDepartUsageStatus } from 'actions/index';
import ItemDepartment from "./departItem/ItemDepartment";
import AddItemDepartment from './departItem/AddItemDepartment';

class GetDepartList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            search:{searchKeyword:null},
            data:null,
            flag:false
        }
    }

    

    render(){

        const { departmentList } = this.props;
        const { data } = this.state;

        if(!this.state.flag){
            this.props.getDepartmentList(this.state.search);
            this.setState({flag:true});
        }

        if(departmentList !== this.state.data){
            this.setState({
                data:departmentList
            })
        }

        const handleDepartUsageStatus = (rowData) => {
            var paramValue;
    
            if(rowData.departUsageStatusCodeNo == '01'){
                paramValue = {departCodeNo:rowData.departCodeNo, departUsageStatusCodeNo:"02"}
            }else{
                paramValue = {departCodeNo:rowData.departCodeNo, departUsageStatusCodeNo:"01"}
            }
    
            this.props.convertDepartUsageStatus(paramValue);
        }

        console.log(this.state)

        return(
            <div className="price-tables row pt-default d-flex justify-content-around">
                {data && data.map( row => {
                    return(
                        <div className="col-md-4 px-lg-4">
                            <ItemDepartment
                            styleName="card package bg-white shadow"
                            headerStyle="package-header bg-secondary lighten-1 text-white"
                            itemStyle="package-items text-grey text-darken-3"
                            footerStyle="btn btn-default bg-secondary lighten-1 text-white"
                            values = {row}
                            handleDepartUsageStatus={handleDepartUsageStatus}
                            />
                        </div>
                )})}
                <div className="col-md-4 px-lg-4">
                            <AddItemDepartment
                            styleName="card package bg-white shadow"
                            headerStyle="package-header bg-secondary lighten-1 text-white"
                            itemStyle="package-items text-grey text-darken-3"
                            footerStyle="btn btn-default bg-secondary lighten-1 text-white"
                            handleAddDepartOpen={this.props.handleAddDepartOpen}
                            />
                        </div>
            </div>
        );
    }
}

const mapStateToProps = ({ humanResource }) => {
    const { departmentList } = humanResource;
    return { departmentList };
}

export default connect(mapStateToProps, { getDepartmentList, convertDepartUsageStatus })(GetDepartList);