import React from 'react';
import CardBox from 'components/CardBox';
import { connect } from 'react-redux';
import { getAppointList } from 'actions/HumanResource';
import GetAppointList from 'components/humanResource/GetAppointList';

class AppointManage extends React.Component{
    constructor(props){
        super(props);
        this.state={search:{searchKeyword:""}}
    }

    render(){

        const { appointList } = this.props;

        if(appointList === undefined){
            this.props.getAppointList(this.state.search)
        }

        return(
            <CardBox styleName="col-lg-13" cardStyle="p-0" headerOutside>
                {appointList !== undefined ? (<GetAppointList appointList={appointList}/>):""}
          </CardBox>
        );
    }
}

const mapStateToProps = ({ humanResource }) => {
    const { appointList } = humanResource;
    return { appointList }
}

export default connect(mapStateToProps, { getAppointList })(AppointManage)