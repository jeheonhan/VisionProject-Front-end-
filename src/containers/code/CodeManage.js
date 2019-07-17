import React from "react";
import GetGroupCodeList from "components/code/GetGroupCodeList"
import GetCodeList from "components/code/GetCodeList"
import CardBox from "components/CardBox";
import { connect } from 'react-redux';
import { getGroupCodeList, getCodeList } from "actions/Code";

class CodeManage extends React.Component{

    constructor(props){
        super(props);
        this.state={
        }
    }

    render(){

      const { groupCodeList } = this.props;
      //얘는 import해서 쓰는건데 왜 this.props로 접근하지??? connect를 쓰기 위한 방법 중 하나. import를 하지 않으면 mappropstodispatch인가 뭐시긴가를 써줘야함
      if(groupCodeList === undefined){
        console.log("containers/code/CodeManage.js groupCodeList===undefined");
        this.props.getGroupCodeList();
      }
      console.log("conainers/code/CodeManage.js : groupCodeList : "+groupCodeList)
      
      if(groupCodeList !== undefined){
      return groupCodeList.map((code, index) => {
        return (<div className="col-lg-4 col-sm-4 col-4" style={{float:"left"}} key={index}>
                <CardBox styleName="col-lg-13" cardStyle="p-0" headerOutside >
                    <GetGroupCodeList action={this.props.getCodeList} title={code.groupCodeName} code={code.groupCode}></GetGroupCodeList>
                </CardBox>
                </div>
               )
        })
      }
      return (
        <div>
        </div>
      )
    }
}
  
  const mapStateToProps = ({code}) => {
    const { groupCodeList, codeList } = code;
    return { groupCodeList, codeList };
  }

  export default connect(mapStateToProps, { getGroupCodeList, getCodeList })(CodeManage);
  

 