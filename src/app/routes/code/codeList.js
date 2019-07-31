import React from 'react';
import ContainerHeader from "components/ContainerHeader";
import CodeDetailManage from 'containers/code/CodeDetailManage'
import {Card, CardBody, CardImg, CardSubtitle, CardText} from 'reactstrap';
import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router-dom';

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

  state = {
    redirect:false
  }

  renderSwitch = () => {
    this.setState({
      redirect:true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: "/app/code",
      }}/>
    }
  }

  render(){
    return(
      <div style={{padding:"2%"}}>
        {this.renderRedirect()}
        <ContainerHeader title={"그룹코드목록"} match={this.props.match} description={"코드로 사용되는 정보를 관리할 수 있습니다"}/>
                {this.props.location.state && <CodeDetailManage search = {this.props.location.state.search}></CodeDetailManage>}  
                {this.props.location.state===undefined &&     <Card className="shadow border-0">
      <CardBody>
        <div><i class="zmdi zmdi-alert-circle-o zmdi-hc-2x"></i><h2 style={{display:"inline"}}>&nbsp;코드관리를 통해 접근해주세요</h2></div>
        <CardSubtitle style={{paddingTop:"20px"}}>이 페이지는 그룹코드 상세조회 페이지입니다. <br/> 정보를 얻으시려면, 코드관리 페이지에서 세부목록을 조회할 그룹코드를 선택해주세요</CardSubtitle>
        <Button variant="contained" fullWidth className="bg-warning text-white" onClick={this.renderSwitch}>코드관리로 이동하기</Button>
      </CardBody>
    </Card>}
       </div> 
    );
  }
}

export default CodeList;