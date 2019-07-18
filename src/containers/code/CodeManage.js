import React from "react";
import {Redirect} from 'react-router-dom';
import GetGroupCodeList from "components/code/GetGroupCodeList"
import GetCodeList from "components/code/GetCodeList"
import CardBox from "components/CardBox";
import { connect } from 'react-redux';
import { getGroupCodeList, getCodeList } from "actions/Code";

class CodeManage extends React.Component{

    constructor(props){
        super(props);
        this.state={
          redirect : false,
          search : {searchKeyword:""}
        }
    }

    handleClick = (_searchKeyword) => {
      alert("codeManage.handleClick")
      this.setState({
        redirect:true,
        search : {searchCondition : "01", searchKeyword : _searchKeyword}
      })
    }

    renderRedirect = () => {
      if (this.state.redirect) {
        this.setState({
          redirect:false
        });
        this.props.getCodeList(this.state.search);
        return <Redirect to='/app/code/detail'/>
      }
    }

    render(){

      const { groupCodeList } = this.props;

      if(groupCodeList === undefined){
        this.props.getGroupCodeList();
      }
      
      if(groupCodeList !== undefined){
      return (
        groupCodeList.map((code, index) => {
        return (<div className="col-lg-3 col-sm-4 col-4" style={{float:"left"}} key={index}>
          {this.renderRedirect()}
                <CardBox styleName="col-lg-13" cardStyle="p-0" headerOutside >
                    <GetGroupCodeList action={this.handleClick} title={code.groupCodeName} code={code.groupCode} list={code.codeList}></GetGroupCodeList>
                </CardBox>
                </div>
               )
        }
        ))
      }
      return (
        <div>
          &nbsp;&nbsp;&nbsp;&nbsp;LOADING...
        </div>
      )
    }

}
  
  const mapStateToProps = ({code}) => {
    const { groupCodeList, codeList } = code;
    return { groupCodeList, codeList };
  }

  export default connect(mapStateToProps, { getGroupCodeList, getCodeList })(CodeManage);
  

 