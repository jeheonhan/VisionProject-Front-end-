import React, {Component} from "react";
import { connect } from 'react-redux';
import { getHRCardDetail,
         getWorkAttitudeList,
         getSalaryList,
         cleanStoreState } from 'actions/index';
import About from "components/profile/About/index";
import GetWorkAttitudeInfo from 'components/common/GetWorkAttitudeInfo';
import GetSalaryInfo from 'components/common/GetSalaryInfo';
import Biography from "components/profile/Biography/index";
import Events from "components/profile/Events/index";
import Contact from "components/profile/Contact/index";
import Friends from "components/profile/Friends/index";
import Photos from "components/profile/Photos/index";
import ProfileHeader from "components/profile/ProfileHeader/index";
import Auxiliary from "util/Auxiliary";
import {friendList} from './data'


class GetEmployeeInfo extends Component {

    constructor(props){
        super(props);
        this.state = {
            user:JSON.parse(localStorage.getItem('user'))
        }
    }
    
    componentDidMount(){
        this.props.getHRCardDetail(this.state.user.employeeNo);
        this.props.getWorkAttitudeList({searchKeyword:this.state.user.employeeNo});
        this.props.getSalaryList({searchKeyword:this.state.user.employeeNo})
    }

    componentWillUnmount(){
        this.props.cleanStoreState("workAttitudeList");
    }

  render() {

    const { HRCardDetailData, workAttitudeList, salaryList } = this.props;
    const { user } = this.state;

    if(HRCardDetailData == undefined || workAttitudeList == undefined || salaryList == undefined){
        return(<div></div>);
    }else{
        return (
            <Auxiliary>
              <ProfileHeader HRCardDetailData={HRCardDetailData}/>
              <div className="jr-profile-content">
                <div className="row">
                  <div className="col-xl-8 col-lg-8 col-md-7 col-12">
                    <About HRCardDetailData={HRCardDetailData}/>
                    <GetWorkAttitudeInfo workAttitudeList={workAttitudeList}/>
                    <GetSalaryInfo salaryList={salaryList}/>
                    {/* <Events/> */}
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-5 col-12">
                    <Contact HRCardDetailData={HRCardDetailData}/>
                    <div className="row">
                      <div className="col-12">
                        <Friends friendList={friendList}/>
                      </div>
                      <div className="col-12">
                        {/* <Photos photoList={photoList}/> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Auxiliary>
          );
    }

   
  }
}


const mapStateToProps = ({humanResource, accounting}) => {
    const { HRCardDetailData, workAttitudeList } = humanResource;
    const { salaryList } = accounting;
    return { HRCardDetailData, workAttitudeList, salaryList }
}

export default connect(mapStateToProps, { getHRCardDetail, getWorkAttitudeList, cleanStoreState, getSalaryList })(GetEmployeeInfo);

