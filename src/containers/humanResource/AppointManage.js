import React from 'react';
import CardBox from 'components/CardBox';
import { connect } from 'react-redux';
import { getAppointList, getSimpleHRCardByEmployeeNo } from 'actions/HumanResource';
import GetAppointList from 'components/humanResource/GetAppointList';
import SimpleHRCard from 'components/humanResource/SimpleHRCard';

class AppointManage extends React.Component{
    constructor(props){
        super(props);
        this.state={search:{searchKeyword:null}}
    }

    render(){
        const { appointList } = this.props;

        if(appointList === undefined){
            this.props.getAppointList(this.state.search)
        }

        return(
            
            <div >
            <CardBox styleName="col-lg-13" cardStyle="p-0" headerOutside  >
                {appointList !== undefined ? 
                    (<GetAppointList appointList={appointList} 
                                    getSimpleHRCardByEmployeeNo={this.props.getSimpleHRCardByEmployeeNo}
                                    style={{zIndex:1}}/>):""}
          </CardBox>
            {/* <SimpleHRCard/> */}
            </div>
            
        );
    }
}

const mapStateToProps = ({ humanResource }) => {
    const { appointList } = humanResource;
    if(appointList !== undefined){
        console.log("길이 :: "+appointList.length)
    }
    return { appointList }
}

export default connect(mapStateToProps, { getAppointList,  getSimpleHRCardByEmployeeNo})(AppointManage)