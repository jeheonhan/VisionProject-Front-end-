import React from 'react';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ApprovalFormCKEditor from 'components/approvalForm/ApprovalFormCKEditor';
import TextField from '@material-ui/core/TextField';
import {getNoticeHeaderList, addNotice} from 'actions/index';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';


function Transition(props) {
    return <Slide direction="down" {...props} />;
  }

class AddNotice extends React.Component {

    state = {
        open: false,
        notice : {
            noticeTitle : '',
            content : '',
            employeeName : JSON.parse(localStorage.getItem("user")).employeeName,
            employeeNo : JSON.parse(localStorage.getItem("user")).employeeNo,
            noticeHeaderCodeNo : '',
            noticeHeaderCodeName : '',
        }
      };
    
      handleClickOpen = () => {
        this.setState({open: true});
      };
    
      handleRequestClose = () => {
        this.setState({open: false});
      };

      handleForm = (event) => {
        this.setState({
            ...this.state,
            notice : {
                ...this.state.notice,
                content : event.editor.getData()
            }
        })
        
    }

      handleChange = (e) => {

         e.preventDefault();
         var _noticeHeaderCodeName;

    //selectBar는 한개의 값을 전달해 줄 수 있는데 selectBar로 두가지의 값을 setState하려 할 경우 한개의 값을 먼저 받고
    //handleChange부분에서 if문과 map()로 나머지 값을 setState 해준다. 
        if(e.target.name == 'noticeHeaderCodeNo'){
            if(this.props.noticeHeaderList !== null){
                this.props.noticeHeaderList.map(element => {
                    if(element.noticeHeaderCodeNo == e.target.value){
                        _noticeHeaderCodeName = element.noticeHeaderCodeName;
                    }
                })
            }
            this.setState({
            ...this.state,
            notice : {
                ...this.state.notice,
            noticeHeaderCodeNo:e.target.value,
            noticeHeaderCodeName:_noticeHeaderCodeName
            }
            });
        }
        else{
            //alert("아님")
        this.setState({
          ...this.state,
          notice : {
            ...this.state.notice,
            [e.target.name] : e.target.value,
          }
        });
    }
      };



      submitFn = () => {
        this.props.addNotice(this.state.notice);
        this.setState({
            open: false,
            notice : {
                noticeTitle : '',
                content : '',
                employeeName : JSON.parse(localStorage.getItem("user")).employeeName,
                employeeNo : JSON.parse(localStorage.getItem("user")).employeeNo,
                noticeHeaderCodeNo : '',
                noticeHeaderCodeName : '',
            }
          })
        this.handleRequestClose();
      }

      render(){

        console.log(this.state.notice);
        console.log(this.state.notice.noticeHeaderCodeNo)
        const { noticeHeaderList } = this.props;

        if(noticeHeaderList == undefined ){
            this.props.getNoticeHeaderList();
        }

        //console.log("noticHeaderList ::::::: "+noticeHeaderList);

          return(

            <div>

                <Button variant="contained" className="jr-btn bg-deep-orange text-white" onClick={this.handleClickOpen}>
                    등록
                </Button>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleRequestClose}
                    TransitionComponent={Transition}
                    maxWidth=""
                    >

                <AppBar className="position-relative">
                    <Toolbar className="bg-secondary">
                    <Typography variant="title" color="inherit" style={{
                        flex: 1,
                        minWidth: '800px',
                    }}>
                        공지사항 등록
                    </Typography>
                    <Button onClick={this.handleRequestClose} color="inherit">
                        닫기
                    </Button>
                    </Toolbar>
                </AppBar>

                <div className="col-md-4 col-4" >
                    <TextField
                    name="noticeTitle"
                    label="공지사항 제목"
                    value={this.state.name}
                    onChange={this.handleChange}
                    helperText="*필수입력란"
                    margin="normal"
                    fullWidth
                    />                
                    <br/>
                </div>

                <div className="col-md-4 col-4" >
                    <TextField
                    name="employeeName"
                    label="작성자"
                    value={this.state.notice.employeeName}
                    onChange={this.handleChange}
                    margin="normal"
                    fullWidth
                    />
                </div>
                <div className="col-md-4 col-4" style={{display:"inline"}}>
                    <TextField
                        name="noticeHeaderCodeNo"
                        select
                        label="공지대상 선택"
                        value={this.state.notice.noticeHeaderCodeNo && this.state.notice.noticeHeaderCodeNo}
                        onChange={this.handleChange}
                        helperText="공지할 대상을 선택하세요"
                        margin="normal"
                        fullWidth
                    >
                      {noticeHeaderList && noticeHeaderList.map( option => (
                          <MenuItem value={option.noticeHeaderCodeNo}>
                          {option.noticeHeaderCodeName}
                          </MenuItem>
                      ))}

                    </TextField>
                    {/* <br/><br/><br/> */}
                </div>

                <ApprovalFormCKEditor 
                handleForm={this.handleForm} 
                content={this.state.notice.content}
                >
                </ApprovalFormCKEditor>

                <div align="center">
                    <Button className="btn-block text-white  bg-deep-orange col-md-4 col-4" 
                            color="default" size="medium" 
                            onClick={() => {this.submitFn()}}
                            
                            >
                                등록하기
                    </Button>

                    <br/><br/><br/>
                </div>

                </Dialog>

            </div>

          )
          
      }

}

const mapStateToProps = ({notice}) => {
    const {noticeHeaderList} = notice;
    return {noticeHeaderList};
}

export default connect(mapStateToProps, { getNoticeHeaderList, addNotice })(AddNotice);