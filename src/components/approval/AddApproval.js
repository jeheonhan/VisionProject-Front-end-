import React from 'react';
import TextField from '@material-ui/core/TextField';
import ApprovalFormCKEditor from 'components/approvalForm/ApprovalFormCKEditor';
import Approver from './approver';
import FindEmployeeForApprovalLine from './FindEmployeeForApprovalLine';
import Button from '@material-ui/core/Button';
import {CallMade} from '@material-ui/icons';
import {connect} from 'react-redux';
import {addApproval, getApprovalList} from 'actions/index';
import {Redirect} from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert'

class AddApproval extends React.Component{
    constructor(props){
        super(props);
        this.state={
            approvalTitle:JSON.parse(localStorage.getItem("user")).employeeName+"_"+this.props.formName
            ,approvalContent:this.props.form
            ,firstApprover:{
                        approverNumbering:null
                    ,approvalNo:null
                    ,employeeNo:JSON.parse(localStorage.getItem("user")).employeeNo
                    ,signatureImage:JSON.parse(localStorage.getItem("user")).signatureImage
                    ,rankCodeName:"담당"
                    ,ordinal:0
                    ,approvalStatus:1
                }
            ,secondApprover:{
                    approverNumbering:null
                        ,approvalNo:null
                        ,employeeNo:null
                        ,signatureImage:"https://papermilkdesign.com/images/line-clipart-transparent-5.png"
                        ,rankCodeName:""
                        ,ordinal:1
                        ,approvalStatus:0
                        }
            ,thirdApprover:{
                        approverNumbering:null
                           ,approvalNo:null
                           ,employeeNo:null
                           ,signatureImage:"https://papermilkdesign.com/images/line-clipart-transparent-5.png"
                           ,rankCodeName:""
                           ,ordinal:2
                           ,approvalStatus:0
                      }
            ,fourthApprover:{
                            approverNumbering:null
                            ,approvalNo:null
                            ,employeeNo:null
                            ,signatureImage:"https://papermilkdesign.com/images/line-clipart-transparent-5.png"
                            ,rankCodeName:""
                            ,ordinal:3
                            ,approvalStatus:0
                        }
            ,fifthApprover:{
                            approverNumbering:null
                            ,approvalNo:null
                            ,employeeNo:null
                            ,signatureImage:"https://papermilkdesign.com/images/line-clipart-transparent-5.png"
                            ,rankCodeName:""
                            ,ordinal:4
                            ,approvalStatus:0
                        }
            ,approvalFormNo:this.props.formNo
            ,totalApproverCount:""
            ,open:false
            ,redirect:false
            ,warning:false
            ,success:false
        }
    }

    handleOpen = () => {
        this.setState({
            ...this.state,
            open:true
        })
    }

    handleSend = (event) =>{
        event.preventDefault();
        if(this.state.secondApprover.employeeNo===null){
            this.setState({
                warning:true,
                warningText:"결재라인을 등록해주세요"
            })
            return;
        }else{
            this.props.addApproval(this.state);
            this.setState({
                success:true,
            })
        }
    }

    onConfirm = () => {
        this.setState({
            success:false,
            redirect:true,
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          this.props.getApprovalList({searchCondition:"2", searchKeyword:this.state.firstApprover.employeeNo});
          this.setState({
            ...this.state,
            redirect:false
          })
    
          return <Redirect to={{
            pathname: "/app/approval/approvalBox",
          }}/>
        }
      }

    handleClose = () =>{
        this.setState({
            ...this.state,
            open:false
        })
    }

    handleTitle = (event) => {
        this.setState({
          ...this.state,
          approvalTitle : event.target.value
        })
    }

    handleForm = (event) => {
        this.setState({
            ...this.state,
            approvalContent : event.editor.getData()
        })
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
      };

    warningOk = () => {
        this.setState({
            warning:false
        })
    }

    handleClickOk = (data) => {
        for(const aprvr in data){
            if(data[aprvr].employeeNo===this.state.firstApprover.employeeNo){
                this.setState({
                    warning:true,
                    warningText:<div dangerouslySetInnerHTML={ {__html: "작성자는 '담당'으로 결재라인에 포함되며, <br> 추가할 수 없습니다."} }/>
                })
                return;
            }
        }
        const size = data.length;
        let defaultValue = {approverNumbering:null
                ,approvalNo:null
                ,employeeNo:null
                ,signatureImage:"https://papermilkdesign.com/images/line-clipart-transparent-5.png"
                ,rankCodeName:""
                ,ordinal:1
                ,approvalStatus:null
                }
        let second = defaultValue;
        let third = defaultValue;
        let fourth = defaultValue;
        let fifth = defaultValue;
        if(size==4){
            fifth = data[3]
        }
        if(size>=3){
            fourth = data[2]
        }
        if(size>=2){
            third = data[1]
        }
        if(size>=1){
            second = data[0]
        }
        this.setState({
            secondApprover:{
                    ...this.state.secondApprover
                    ,employeeNo:second.employeeNo
                    ,signatureImage:second.signatureImage
                    ,rankCodeName:second.rankCodeName
                    },
            thirdApprover:{
                ...this.state.thirdApprover
                ,employeeNo:third.employeeNo
                ,signatureImage:third.signatureImage
                ,rankCodeName:third.rankCodeName
                },
            fourthApprover:{
                ...this.state.fourthApprover
                ,employeeNo:fourth.employeeNo
                ,signatureImage:fourth.signatureImage
                ,rankCodeName:fourth.rankCodeName
                },
            fifthApprover:{
                ...this.state.fifthApprover
                ,employeeNo:fifth.employeeNo
                ,signatureImage:fifth.signatureImage
                ,rankCodeName:fifth.rankCodeName
                },
            open:false,
            totalApproverCount:(size+1)
        })
    }


    render(){
        console.log(this.state);
        return(
            <div className="jr-card" style={{paddingBottom:"60px"}}>
                {this.renderRedirect()}
                <span style={{float:"left", paddingLeft:"10px"}}>
                <TextField 
                    margin="normal"
                    id="registrantEmployeeName"
                    label="등록자"
                    value={JSON.parse(localStorage.getItem("user")).employeeName}
                />
                </span>
                
                <span style={{float:"right"}}>
                <FindEmployeeForApprovalLine 
                    open={this.state.open} 
                    handleOpen={this.handleOpen} 
                    handleClose={this.handleClose}
                    handleOk={this.handleClickOk}/>
                <Approver arr={[this.state.firstApprover, this.state.secondApprover, this.state.thirdApprover, this.state.fourthApprover, this.state.fifthApprover]}/>
                </span>
                <TextField
                    error
                    fullWidth
                    id="outlined-required"
                    label="결재서제목"
                    value={this.state.approvalTitle}
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleTitle}
                />
            <ApprovalFormCKEditor 
                handleForm={this.handleForm} 
                content={this.state.approvalContent}
                >
            </ApprovalFormCKEditor>
            
            <Button style={{float:"right"}} variant="contained" color="primary" className="jr-btn jr-btn-lg" onClick={this.handleSend}>
                <CallMade/>상신
            </Button>
            <SweetAlert show={this.state.warning}
                    warning
                    confirmBtnText="확인"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title=""
                    onConfirm={this.warningOk}
            >
                {this.state.warningText}
            </SweetAlert>
            <SweetAlert show={this.state.success} success title=""
                    onConfirm={this.onConfirm}>
                        작성하신 결재서류가 상신되었습니다. <br/>결재함으로 이동합니다.
            </SweetAlert>
            </div>
        );
    }
}

export default connect(null, {addApproval, getApprovalList})(AddApproval);