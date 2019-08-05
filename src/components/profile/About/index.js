import React from "react";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Widget from "components/Widget/index";
// import {aboutList} from 'components/common/data';
import AboutItem from "./AboutItem";


class About extends React.Component {

  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({value});
  };

  render() {
    const {value} = this.state;
    const {HRCardDetailData, branch, title} = this.props;

    var birthDay = "";

    var aboutList = [];

    if(HRCardDetailData != null){
      aboutList =  [
        {
          id: 1,
          title: '회사',
          icon: 'city-alt',
          userList: '',
          desc: ['비전 콤파니']
        },
        {
          id: 2,
          title: '생일',
          icon: 'cake',
          userList: '',
          desc: [birthDay]
        },
        {
          id: 3,
          title: '주소',
          icon: 'home',
          userList: '',
          desc: [HRCardDetailData.address]
        },
        {
          id: 4,
          title: '급여통장',
          icon: 'balance-wallet',
          userList: '',
          desc: [HRCardDetailData.account.bankCodeName+"("+HRCardDetailData.account.accountNo+")"]
        },
        {
          id: 5,
          title: '시급',
          icon: 'money',
          userList: '',
          desc: [HRCardDetailData.wage+"원"]
        }
      ];

      birthDay = "19"+(HRCardDetailData.ssn).substring(0,2)+". "+(HRCardDetailData.ssn).substring(2,4)+". "
      +(HRCardDetailData.ssn).substring(4,6)+".";
    }else if(branch != null){
      aboutList =  [
        {
          id: 1,
          title: '지점명',
          icon: 'city-alt',
          userList: '',
          desc: [branch.branchName]
        },
        // {
        //   id: 2,
        //   title: '생일',
        //   icon: 'cake',
        //   userList: '',
        //   desc: [birthDay]
        // },
        {
          id: 3,
          title: '주소',
          icon: 'home',
          userList: '',
          desc: [<div dangerouslySetInnerHTML={ {__html: branch.address + "<br/>" +branch.detailAddress} }/>]
        },
        {
          id: 4,
          title: '사업자등록번호',
          icon: 'info-outline',
          userList: '',
          desc: [branch.businessLicenseNo]
        },
        {
          id: 5,
          title: '영업여부',
          icon: 'check-circle',
          userList: '',
          desc: [branch.branchStatus]
        },
        // {
        //   id: 5,
        //   title: '지점명',
        //   icon: 'money',
        //   userList: '',
        //   desc: [branch.branchName]
        // }
      ];
    }
    
    return (
      <Widget styleName="jr-card-full jr-card-tabs-right jr-card-profile">
        <div className="card-header">
          <h4 className="card-title mb-0">{title}</h4>
        </div>
        <div className="jr-tabs-classic">
          <Tabs className="jr-tabs-up" value={value} onChange={this.handleChange}>
            {/* <Tab className="jr-tabs-label" label="Overview"/> */}
            {/* <Tab className="jr-tabs-label" label="Work"/>
            <Tab className="jr-tabs-label" label="Education"/> */}
          </Tabs>
          <div className="jr-tabs-content jr-task-list">
            <div className="row">
              {value === 0 && aboutList.map((about, index) => <div
                className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12"><AboutItem data={about}/></div>)}
              {value === 1 && aboutList.map((about, index) => <div
                className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12"><AboutItem data={about}/></div>)}
              {value === 2 && aboutList.map((about, index) => <div
                className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12"><AboutItem data={about}/></div>)}
            </div>
          </div>
        </div>
      </Widget>
    );
  }
}


export default About;
