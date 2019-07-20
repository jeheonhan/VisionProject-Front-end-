import React from 'react';
import ContainerHeader from "components/ContainerHeader";
import CodeDetailManage from 'containers/code/CodeDetailManage'

// const CodeList = ({match}, props) => {
    
//     alert(props);

//     return (
  
//       <div>
//         <ContainerHeader title={"그룹코드목록"} match={match} description={"코드로 사용되는 정보를 관리할 수 있습니다"}/>
        
//         <CodeDetailManage></CodeDetailManage>
//         <div align="right">
//         </div>
  
//       </div>
//     );
//   };
  
//   export default CodeList;

class CodeList extends React.Component{

  render(){
    return(

      <div>
        <ContainerHeader title={"그룹코드목록"} match={this.props.match} description={"코드로 사용되는 정보를 관리할 수 있습니다"}/>
                <CodeDetailManage search = {this.props.location.state.search}></CodeDetailManage>
       <div align="right">
       </div>
  
       </div> 
    );
  }
}

export default CodeList;