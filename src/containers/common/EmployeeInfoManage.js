import React from 'react';
import { connect } from 'react-redux';
import { getHRCardDetail } from 'actions/index';
import GetEmployeeInfo from '../../components/common/GetEmployeeInfo';

class EmployeeInfoManage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            user:JSON.parse(localStorage.getItem('user'))
        }
    }

    componentDidMount(){
        this.props.getHRCardDetail(this.state.user.employeeNo);
    }

    render(){

        const { HRCardDetailData } = this.props;

        return(
            <GetEmployeeInfo HRCardDetailData={HRCardDetailData && HRCardDetailData}/>
        );
    }
}

const mapStateToProps = ({humanResource}) => {
    const { HRCardDetailData } = humanResource;
    return { HRCardDetailData }
}

export default connect(mapStateToProps, { getHRCardDetail })(EmployeeInfoManage);