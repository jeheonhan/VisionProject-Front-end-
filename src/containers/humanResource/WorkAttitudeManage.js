import React from 'react';
import { connect } from 'react-redux';
import { getWorkAttitudeList } from 'actions/HumanResource';
import CardBox from "components/CardBox";
import WorkAttitudeList from 'components/humanResource/WorkAttitudeList';

class WorkAttitudeManage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            search:{searchKeyword:null}
        }
    }

    render(){

        const { workAttitudeList } = this.props;

        if(workAttitudeList === undefined){
            this.props.getWorkAttitudeList(this.state.search)
        }

        return(
            <div>
            <CardBox styleName="col-lg-13" cardStyle="p-0" headerOutside>
                {workAttitudeList !== undefined ? (<WorkAttitudeList/>):(<div>error</div>)}
            </CardBox>
            </div>
        );
    }
}

const mapStateToProps = ({ humanResource }) => {
    const { workAttitudeList } = humanResource;
    return { workAttitudeList };
  }
  
  export default connect(mapStateToProps, { getWorkAttitudeList })(WorkAttitudeManage);