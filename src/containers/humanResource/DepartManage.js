import React from 'react';
import GetDepartList from 'components/humanResource/GetDepartList';
import AddDepartment from 'components/humanResource/AddDepartment';

class DepartManage extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            addDepartOpen:false
        }
    }

    //부서등록 화면 열기
    handleAddDepartOpen = () => {
        this.setState({addDepartOpen:true})
    }

    //부서등록 화면 닫기
    handleAddDepartClose = () => {
        this.setState({addDepartOpen:false})
    }

    render(){
        return(
            <div>
                <GetDepartList
                    handleAddDepartOpen={this.handleAddDepartOpen}/>
                <AddDepartment  
                    open={this.state.addDepartOpen}
                    handleAddDepartClose={this.handleAddDepartClose}/>
            </div>
        );
    }
}

export default DepartManage;