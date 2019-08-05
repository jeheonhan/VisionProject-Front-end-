import React from 'react';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NoticeCKEditor from 'components/notice/NoticeCKEditor';
import CardBox from 'components/CardBox';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import {getNoticeHeaderList, addNotice} from 'actions/index';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';


function Transition(props) {
    return <Slide direction="down" {...props} />;
  }



class AddNotice extends React.Component {

    state = {
        open: false,
        snackBar:false,
        snackBarContents:'',
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

      openSnackBar  = (valueName) => {
    this.setState({ ...this.state, snackBar: true, snackBarContents : valueName });
    };

     closeSnackBar = () => {
        this.setState({ ...this.state, snackBar: false });
      };

      submitFn = () => {

        if(this.state.notice.noticeTitle == ''){
            this.openSnackBar('공지사항 제목')
        }else if(this.state.notice.noticeHeaderCodeNo == '') {
            this.openSnackBar('공지대상')
        }else{
        
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
      }

      

      

      render(){

        console.log(this.state.notice);
        //console.log(this.state.notice.noticeHeaderCodeNo)
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
                    <Button className="text-white" onClick={this.handleRequestClose} color="inherit">
                        닫기
                    </Button>
                    </Toolbar>
                </AppBar>

                <CardBox styleName="col-lg-13" cardStyle="p-0" headerOutside>
                    <div>

                <div class="row">
                <div className="col-md-1"/>
                <div className="col-md-2 col-1" >
                    <TextField
                    name="employeeName"
                    label="작성자"
                    value={this.state.notice.employeeName}
                    margin="normal"
                    fullWidth
                    />
                </div>
                </div>

                <div class="row">

                <div className="col-md-1"/>

                <div className="col-md-3 col-3" style={{display:"inline"}}>
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
                </div>

                <div className="col-md-6 col-6" >
                    <TextField
                    name="noticeTitle"
                    label="공지사항 제목"
                    value={this.state.noticeTitle}
                    onChange={this.handleChange}
                    helperText="*필수입력란"
                    margin="normal"
                    fullWidth
                    />                
                    <br/>
                </div>
                </div>
                <br/>
                <NoticeCKEditor 
                handleForm={this.handleForm} 
                content={this.state.notice.content}
                >
                </NoticeCKEditor>
                </div>

                </CardBox>

                <div align="center">
                    <Button className="btn-block text-white  bg-deep-orange col-md-4 col-4" 
                            color="default" size="medium" 
                            onClick={() => {this.submitFn()}}
                            
                            >
                                등록하기
                    </Button>

                    <br/><br/><br/>
                </div>
                    <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    open={this.state.snackBar}
                    onClose={this.closeSnackBar}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.snackBarContents} 항목을 입력하지 않으셨습니다</span>}
                    autoHideDuration={1500}
                    />
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