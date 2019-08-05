import React, {Component} from "react";
import { connect } from 'react-redux';
import { getBranchDetail, cleanStoreState } from 'actions/index';
import About from "components/profile/About/index";
import GetWorkAttitudeInfo from 'components/common/GetWorkAttitudeInfo';
import GetSalaryInfo from 'components/common/GetSalaryInfo';
import Contact from "components/profile/Contact/index";
import Signature from "components/profile/Friends/index";
import ProfileHeader from "components/profile/ProfileHeader/index";
import Auxiliary from "util/Auxiliary";


class GetEmployeeInfo extends Component {

    constructor(props){
        super(props);
        this.state = {
            user:JSON.parse(localStorage.getItem('user'))
        }
    }
    
    componentDidMount(){
        this.props.getBranchDetail(this.state.user.branchNo);
    }

    componentWillUnmount(){
        this.props.cleanStoreState("branch");
    }

  render() {

    const { branch } = this.props;
    const { user } = this.state;

    if(branch == undefined){
        return(<div></div>);
    }else{
        return (
            <Auxiliary>
              <ProfileHeader branch={branch}/>
              <div className="jr-profile-content">
                <div className="row">
                  <div className="col-xl-8 col-lg-8 col-md-7 col-12">
                    <About branch={branch} title="지점정보"/>
                   
                    {/* <Events/> */}
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-5 col-12">
                    <Contact branch={branch}/>
                    <div className="row">
                      <div className="col-12">
                        {/* <Signature signatureImage={branch.signatureImage}/> */}
                      </div>
                      {/* <div className="col-12">
                        <Photos photoList={photoList}/>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </Auxiliary>
          );
    }

   
  }
}


const mapStateToProps = ({ businessSupport }) => {
    const { branch } = businessSupport;
    return { branch }
}

export default connect(mapStateToProps, { getBranchDetail, cleanStoreState })(GetEmployeeInfo);

