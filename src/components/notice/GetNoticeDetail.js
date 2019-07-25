import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import { DialogContent } from '@material-ui/core';
import { TableRow, TableCell } from '@material-ui/core';


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


  render() {

    if(this.state.notice !== this.props.noticeDetail){
       this.setState({notice: this.props.noticeDetail});
    }
    //console.log(this.state)
    return (
      <div>
        <Dialog
          open={this.props.open}
          TransitionComponent={Transition}
        >
          <AppBar className="position-relative" >
            <Toolbar className="bg-deep-orange">
              <Typography variant="title" color="inherit" style={{
                flex: 1,
                minWidth: '800px',
                }} 
                align="center"
                >
                공지사항 상세조회
              </Typography>
            </Toolbar>
          </AppBar>

              <br/>
              <div align="center">
              <h2><strong>{this.state.notice.noticeTitle}</strong></h2>
              </div>
              <br/>
              <div  align="left">
                  <table>
                    <tr>
                        <th>작성자</th>
                        <td>{this.state.notice.employeeName} ({this.state.notice.departCodeName})</td>
                    </tr>
                    <tr>
                      <th>등록일</th>
                      <td>{this.state.notice.noticeRegDate}</td>
                      <th>조회수</th>
                      <td>{this.state.notice.viewCount}</td>
                    </tr>
                  </table>
                    {this.state.notice.content}
              </div>
              <Button onClick={this.props.handleRequestClose} aria-label="Close" >닫기</Button>
        </Dialog>
      </div>
    );
  }
}
export default GetNoticeDetail;