import React from 'react';
import TextField from '@material-ui/core/TextField';
import ApprovalFormCKEditor from 'components/approvalForm/ApprovalFormCKEditor'
import Approver from './approver'
import FindEmployeeForApprovalLine from './FindEmployeeForApprovalLine'

class AddApproval extends React.Component{
    constructor(props){
        super(props);
        this.state={
            approvalTitle:""
            ,approvalContent:""
            ,firstApprover:{
                        approverNumbering:null
                    ,approvalNo:null
                    ,employeeNo:null
                    ,signatureImage:null
                    ,rankCodeName:null
                    ,ordinal:0
                    ,approvalStatus:null
                }
            ,secondApprover:{
                    approverNumbering:null
                        ,approvalNo:null
                        ,employeeNo:null
                        ,signatureImage:null
                        ,rankCodeName:null
                        ,ordinal:1
                        ,approvalStatus:null
                        }
            ,thirdApprover:{
                        approverNumbering:null
                           ,approvalNo:null
                           ,employeeNo:null
                           ,signatureImage:null
                           ,rankCodeName:null
                           ,ordinal:2
                           ,approvalStatus:null
                      }
            ,fourthApprover:{
                            approverNumbering:null
                            ,approvalNo:null
                            ,employeeNo:null
                            ,signatureImage:null
                            ,rankCodeName:null
                            ,ordinal:3
                            ,approvalStatus:null
                        }
            ,fifthApprover:{
                            approverNumbering:null
                            ,approvalNo:null
                            ,employeeNo:null
                            ,signatureImage:null
                            ,rankCodeName:null
                            ,ordinal:4
                            ,approvalStatus:null
                        }
            ,approvalFormNo:this.props.formNo
            ,totalApproverCount:""
            ,open:false
            ,test:"111"
        }
        this.handleClickOk = this.handleClickOk.bind(this);
    }

    handleOpen = () => {
        this.setState({
            ...this.state,
            open:true
        })
    }

    handleClose = () =>{
        this.setState({
            ...this.state,
            open:false
        })
    }

    handleClickOk = (data) => {
        const size = data.length;
        let second = null;
        let third = null;
        let fourth = null;
        let fifth = null;
        if(size==4){
            console.log("4")
            fifth = data[3]
        }
        if(size>=3){
            console.log("3")
            fourth = data[2]
        }
        if(size>=2){
            console.log("2")
            third = data[1]
        }
        if(size>=1){
            console.log("1")
            second = data[0]
        }
        alert(second.rankCodeName);
        console.log(second);
        this.setState({
            secondApprover:{...this.state.secondApprover, second},
            thirdApprover:{...this.state.thirdApprover, third},
            fourthApprover:{...this.state.fourthApprover, fourth},
            fifthApprover:{...this.state.fifthApprover, fifth},
            open:false,
            test:"test"
        })
    }

    render(){
        console.log(this.state)
        return(
            <div>
            <div>
                <span style={{float:"left", paddingLeft:"20px"}}>
                <TextField 
                    margin="normal"
                    id="registrantEmployeeName"
                    label="등록자"
                    value={this.state.registrantEmployeeName}
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
                    label="결재양식명"
                    value={this.state.approvalFormTitle}
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleTitle}
                />
            </div>
            <div>
            <ApprovalFormCKEditor 
                handleForm={this.handleForm} 
                content={this.state.approvalForm}
                >
            </ApprovalFormCKEditor>
            </div>
            </div>
        );
    }
}

export default AddApproval;