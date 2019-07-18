import React from 'react';
import GetBranchList from 'components/businessSupport/GetBranchList';
import { connect } from 'react-redux';
import { getBranchList } from 'actions/BusinessSupport';

class BranchManage extends React.Component{

    constructor(props){
        super(props);
        this.state = {search:{serachKeyword:null}}
    }

    render(){

        const { branchList } = this.props;

        if(branchList === undefined){
            this.props.getBranchList(this.state.search);
        }else{
            console.log("sdjfklajeflwj :: "+branchList.totalCount)
        }

        return(
            <div>
            {branchList && ( <GetBranchList branchList={branchList}></GetBranchList>)}
            </div>  
        );
    }
}

const mapStateToProps = ({ businessSupport }) => {
    const { branchList } = businessSupport;
    return { branchList }
}

export default connect(mapStateToProps, { getBranchList })(BranchManage)