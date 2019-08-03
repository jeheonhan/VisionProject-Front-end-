import React from 'react';
import { connect } from 'react-redux';
import { getDepartmentList, convertDepartUsageStatus, convertDepartmentDelete } from 'actions/index';
import ItemDepartment from "./departItem/ItemDepartment";
import AddItemDepartment from './departItem/AddItemDepartment';
import SweetAlert from 'react-bootstrap-sweetalert'

class GetDepartList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            search:{searchKeyword:null},
            data:null,
            flag:false,
            deleteConfirmShow:false
        }
    }

    //부서 삭제 Confirm 열기
    handleDeleteDepartmentOpen = (_depart) => {
        this.setState({
        deleteConfirmShow:true,
        depart:_depart
        })
        //this.props.convertWorkAttitudeUseStatus(this.state.selected);
    }

    //부서 삭제 Confirm 확인
    onConfirmDelete = () => {
        this.props.convertDepartmentDelete(this.state.depart)
        this.setState({
        deleteConfirmShow:false,
        depart:null
        })
    }

    //부서 삭제 Confirm 취소
    onCancelDelete = () => {
        this.setState({
        deleteConfirmShow:false,
        depart:null
        })
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
                    if(row.departCodeName != null){
                    return(
                        
                        <div className="col-md-4 px-lg-4">
                            <ItemDepartment
                            styleName="card package bg-white shadow"
                            headerStyle="package-header bg-secondary lighten-1 text-white"
                            itemStyle="package-items text-grey text-darken-3"
                            footerStyle="btn btn-default bg-secondary lighten-1 text-white"
                            values = {row}
                            handleDepartUsageStatus={handleDepartUsageStatus}
                            convertDepartmentDelete={this.props.convertDepartmentDelete}
                            handleDeleteDepartmentOpen={this.handleDeleteDepartmentOpen}
                            />
                        </div>
                )}})}
                <div className="col-md-4 px-lg-4">
                            <AddItemDepartment
                            styleName="card package bg-white shadow"
                            headerStyle="package-header bg-secondary lighten-1 text-white"
                            itemStyle="package-items text-grey text-darken-3"
                            footerStyle="btn btn-default bg-secondary lighten-1 text-white"
                            handleAddDepartOpen={this.props.handleAddDepartOpen}
                            />
                </div>
                <SweetAlert show={this.state.deleteConfirmShow}
                    warning
                    showCancel
                    confirmBtnText={"Yes"}
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title={"해당 부서를 영구삭제하시겠습니까?"}
                    onConfirm={this.onConfirmDelete}
                    onCancel={this.onCancelDelete}
                ></SweetAlert>
            </div>
        );
    }
}

const mapStateToProps = ({ humanResource }) => {
    const { departmentList } = humanResource;
    return { departmentList };
}

export default connect(mapStateToProps, { getDepartmentList, convertDepartUsageStatus, convertDepartmentDelete })(GetDepartList);