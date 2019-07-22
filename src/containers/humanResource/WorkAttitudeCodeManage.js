import React from 'react';
import { connect } from 'react-redux';
import { getWorkAttitudeCodeList } from 'actions/index';
import GetWorkAttitudeCodeList from 'components/humanResource/GetWorkAttitudeCodeList';
import CardBox from "components/CardBox";

class WorkAttitudeCodeManage extends React.Component{

    state = {
        search:{searchKeyword:null}
    }

    render(){

        const { workAttitudeCodeList } = this.props;

        if(workAttitudeCodeList === undefined){
            this.props.getWorkAttitudeCodeList(this.state.search)
        }

        return(
            <div>
            <CardBox styleName="col-lg-13" cardStyle="p-0" headerOutside>
                {workAttitudeCodeList !== undefined ? (<GetWorkAttitudeCodeList/>):(<div>error</div>)}
            </CardBox>
            </div>
        );
    }
}

const mapStateToProps = ({humanResource}) => {
    const { workAttitudeCodeList } = humanResource;
    return { workAttitudeCodeList }
}

export default connect(mapStateToProps, { getWorkAttitudeCodeList })(WorkAttitudeCodeManage)

