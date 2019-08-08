import React from 'react';
import { connect } from 'react-redux';
import { getDepartmentList, convertDepartUsageStatus, convertDepartmentDelete } from 'actions/index';
import ItemDepartment from "./departItem/ItemDepartment";
import AddItemDepartment from './departItem/AddItemDepartment';
import SweetAlert from 'react-bootstrap-sweetalert';
import Snackbar from '@material-ui/core/Snackbar';

class GetDepartList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            search:{searchKeyword:null},
            data:null,
            flag:false,
            deleteConfirmShow:false,
            convertConfirmShow:false,
            user:JSON.parse(localStorage.getItem('user'))
        }
    }

    //부서 삭제 Confirm 열기
    handleDeleteDepartmentOpen = (_depart) => {
        if(Number(this.state.user.rankCodeNo) > 4){
            this.setState({
                deleteConfirmShow:true,
                depart:_depart
                })
        }else{
            this.handleRequestSnackBarOpen("해당 기능에 접근권한이 없습니다.")
        }
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

    //부서 상태변경 Confirm열기
    handleConvertDepartmentOpen = () => {
        this.setState({
            convertConfirmShow:true
        })
    }

    //부서 상태변경 Confirm 확인
    onConfirmConvert = () => {
        this.props.convertDepartUsageStatus(this.state.temp);
        this.setState({
            temp:null,
            convertConfirmShow:false
        })
    }

    //부서 상태변경 Confirm 취소
    onCancelConvert = () => {
        this.setState({
            convertConfirmShow:false
        })
    }

    handleDepartUsageStatus = (rowData) => {
        var paramValue;

        if(Number(this.state.user.rankCodeNo) > 4){
            this.handleConvertDepartmentOpen();
            if(rowData.departUsageStatusCodeNo == '01'){
                paramValue = {departCodeNo:rowData.departCodeNo, departUsageStatusCodeNo:"02"}
            }else{
                paramValue = {departCodeNo:rowData.departCodeNo, departUsageStatusCodeNo:"01"}
            }

            this.setState({
                temp:paramValue
            })

        }else{
            this.handleRequestSnackBarOpen("해당 기능에 접근권한이 없습니다.")
        }
    }

    //스낵바 열기
    handleRequestSnackBarOpen = (contents) => {
        this.setState({
        snackbar:true,
        snackbarContents:contents
        })
    }

    //스낵바 닫기
    handleRequestClose = () => {
        this.setState({
        snackbar:false,
        snackbarContents:""
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
                        handleDepartUsageStatus={this.handleDepartUsageStatus}
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
                    confirmBtnText={"삭제"}
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    cancelBtnText={"취소"}
                    title={"해당 부서를 영구삭제하시겠습니까?"}
                    onConfirm={this.onConfirmDelete}
                    onCancel={this.onCancelDelete}
                ></SweetAlert>
               <SweetAlert show={this.state.convertConfirmShow}
                    warning
                    showCancel
                    confirmBtnText={"네"}
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    cancelBtnText={"아니오"}
                    title={"해당 부서의 사용상태를 변경하시겠습니까?"}
                    onConfirm={this.onConfirmConvert}
                    onCancel={this.onCancelConvert}
                ></SweetAlert>
                <Snackbar
                    anchorOrigin={{vertical:'top', horizontal:'center'}}
                    open={this.state.snackbar}
                    autoHideDuration="1500"
                    onClose={this.handleRequestClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.snackbarContents}</span>}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ humanResource }) => {
    const { departmentList } = humanResource;
    return { departmentList };
}

export default connect(mapStateToProps, { getDepartmentList, convertDepartUsageStatus, convertDepartmentDelete })(GetDepartList);