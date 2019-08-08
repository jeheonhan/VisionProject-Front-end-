import React from 'react';
import GetDepartList from 'components/humanResource/GetDepartList';
import AddDepartment from 'components/humanResource/AddDepartment';
import Snackbar from '@material-ui/core/Snackbar';

class DepartManage extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            addDepartOpen:false,
            user:JSON.parse(localStorage.getItem('user'))
        }
    }

    //부서등록 화면 열기
    handleAddDepartOpen = () => {
        if(Number(this.state.user.rankCodeNo) > 4){
            this.setState({addDepartOpen:true})
        }else{
            this.handleRequestSnackBarOpen("해당 기능에 접근권한이 없습니다.")
        }
    }

    //부서등록 화면 닫기
    handleAddDepartClose = () => {
        this.setState({addDepartOpen:false})
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
        return(
            <div>
                <GetDepartList
                    handleAddDepartOpen={this.handleAddDepartOpen}/>
                <AddDepartment  
                    open={this.state.addDepartOpen}
                    handleAddDepartClose={this.handleAddDepartClose}/>
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

export default DepartManage;