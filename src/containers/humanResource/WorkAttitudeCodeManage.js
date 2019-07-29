import React from 'react';
import { connect } from 'react-redux';
import { getWorkAttitudeCodeList } from 'actions/index';
import GetWorkAttitudeCodeList from 'components/humanResource/GetWorkAttitudeCodeList';
import CardBox from "components/CardBox";
import ModifyWorkAttitudeCode from 'components/humanResource/ModifyWorkAttitudeCode';

class WorkAttitudeCodeManage extends React.Component{

    state = {
        search:{searchKeyword:null},
        modifyOpen:false
    }

    //수정화면 열기 & 수정할 Row Data 받기
    handleModifyOpen = (rowData) => {
        this.setState({
            modifyOpen:true,
            data:rowData
        })
    }

     //수정화면 닫기
     handleModifyClose = () => {
        this.setState({
            modifyOpen:false,
            data:null
        })
    }


    render(){

        const { data } = this.state;
        const { workAttitudeCodeList } = this.props;

        if(workAttitudeCodeList === undefined){
            this.props.getWorkAttitudeCodeList(this.state.search)
        }

        return(
            <div>
            <CardBox styleName="col-lg-13" cardStyle="p-0" headerOutside>
                {workAttitudeCodeList !== undefined ? (<GetWorkAttitudeCodeList handleModifyOpen={this.handleModifyOpen}/>):(<div></div>)}
            </CardBox>
            <ModifyWorkAttitudeCode open={this.state.modifyOpen} 
                                    handleModifyClose={this.handleModifyClose}
                                    rowData={data && data}/>
            </div>
        );
    }
}

const mapStateToProps = ({humanResource}) => {
    const { workAttitudeCodeList } = humanResource;
    return { workAttitudeCodeList }
}

export default connect(mapStateToProps, { getWorkAttitudeCodeList })(WorkAttitudeCodeManage)

