import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import CardBox from 'components/CardBox';
import { convertNoticeStatusCode } from 'actions/Notice';
import { connect } from 'react-redux';


function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class GetNoticeDetail extends React.Component {

  constructor(props){

    super(props);

    this.state = {
      notice : this.props.noticeDetail,
      open : this.props.open
    }
}

  convertNoticeStatusCode = ( notice ) => {
    this.props.convertNoticeStatusCode(notice);
    this.props.handleRequestClose();
  }

  render() {

    if(this.state.notice !== this.props.noticeDetail){
       this.setState({notice: this.props.noticeDetail});
    }
    //console.log(this.state)
    return (
      <div className="app-wrapper">
        <Dialog
          open={this.props.open}
          TransitionComponent={Transition}
          maxWidth=""
        >
          <AppBar className="position-relative" >
            <Toolbar className="bg-deep-orange">
              <Typography variant="title" color="inherit" style={{
                flex: 1,
                minWidth: '800px',
                }} 
                align="left"
                >
                공지사항 상세조회
              </Typography>
                   
            </Toolbar>
          </AppBar>

                

              <br/>
              <div align="left">
              <h2><strong>&nbsp;&nbsp;{this.state.notice.noticeTitle}</strong></h2>
              </div>
              <br/>
              <div  align="left">
                  <table class="table" border="0">
                    <tr>
                        <th>No</th>
                        <td>{this.state.notice.noticeNo}</td>
                        <th>작성자</th>
                        <td>{this.state.notice.employeeName} ({this.state.notice.departCodeName})</td>
                    </tr>
                    <tr>
                      <th>등록일</th>
                      <td>{this.state.notice.noticeRegDate}</td>
                      <th>조회수</th>
                      <td>{this.state.notice.viewCount}</td>
                    </tr>
                    <tr>
                      <th></th>
                      <td></td>
                      <th></th>
                      <td></td>
                    </tr>
                  </table>
                  <CardBox styleName="col-lg-13" cardStyle="p-0" headerOutside ><div style={{padding:"50px"}} dangerouslySetInnerHTML={{__html:this.state.notice.content}}/></CardBox>
              </div>
              <div align="right">
              <Button onClick={() => this.convertNoticeStatusCode(this.state.notice)} 
                      variant="outlined" 
                      >
                  <i class="zmdi zmdi-delete zmdi-hc-fw zmdi-hc-1g"></i> 삭제
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
              <br/><br/>
              <Button onClick={this.props.handleRequestClose} variant="outlined" aria-label="Close" ><i class="zmdi zmdi-close-circle zmdi-hc-1g"></i>닫기</Button>
              <br/>
        </Dialog>
      </div>
    );
  }
}

export default connect(null, { convertNoticeStatusCode })(GetNoticeDetail);