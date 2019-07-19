import React from "react";
import {Redirect} from 'react-router-dom';
import GetGroupCodeList from "components/code/GetGroupCodeList"
import CardBox from "components/CardBox";
import { connect } from 'react-redux';
import { getGroupCodeList, getCodeList, getForCodeDetail } from "actions/Code";

class CodeManage extends React.Component{

    constructor(props){
        super(props);
        this.state={
          redirect : false,
          search : {searchKeyword:""}
        }
    }

    handleClick = (_searchKeyword) => {
      this.setState({
        redirect:true,
        search : {searchCondition : "0", searchKeyword : _searchKeyword}
      })
      
    }

    renderRedirect = () => {
      if (this.state.redirect) {
        this.setState({
          ...this.state,
          redirect:false
        })

        return <Redirect to={{
          pathname: "/app/code/detail",
          state: {search : this.state.search }
        }}/>
      }
    }

    render(){
      const { groupCodeList } = this.props;
      if(groupCodeList === undefined){
        this.props.getGroupCodeList();
        return (
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;LOADING...
          </div>
        )
      }
      
      else if(groupCodeList !== undefined){
        if(this.state.search.searchCondition!==undefined){
          this.props.getForCodeDetail(this.state.search);
        }
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
    }

}
  
  const mapStateToProps = ({code}) => {
    const { groupCodeList, codeList } = code;
    return { groupCodeList, codeList };
  }

  export default connect(mapStateToProps, { getGroupCodeList, getCodeList, getForCodeDetail })(CodeManage);
  

 