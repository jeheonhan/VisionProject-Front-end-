import React from 'react';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import GetPostCode from 'components/accounting/GetPostCode';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import { updateBranch, cleanStoreState } from 'actions/index';





function Transition(props) {
    return <Slide direction="down" {...props} />;
  }

class UpdateBranch extends React.Component {

    state = {

        success : false,
        updateFlag : false,
    }

    handleChange = name => event => {
        this.setState({
            branch : { ...this.state.branch, [name] : event.target.value}
        })
    }

    handlePostcode = (zipCode, address) => {
        this.setState({
          branch : {...this.state.branch, address:address, zipCode:zipCode}
        })
      };

      submitBranch = () => {
        this.props.updateBranch(this.state.branch);
        this.setState({ updateFlag : false});
        this.props.cleanStoreState('branch');
        this.props.updateBranchClose();
      }

      closeUpdateBranch = () => {
        this.setState({ updateFlag : false});
        this.props.cleanStoreState('branch');
        this.props.updateBranchClose();
      }

    render() {

        console.log(this.state.branch)

        const {_branch, localList} = this.props;

        if( !this.state.updateFlag ) {
            if(this.state.branch !== _branch && _branch !== null) {
                this.setState({
                    updateFlag : true,
                    branch : _branch
                })
            }
        }

        return(

        <div>

            <Dialog            
            open={this.props.open}
            TransitionComponent={Transition}
            maxWidth=""
            onClose={this.closeUpdateBranch}
          >
            <AppBar className="position-relative" >
            <Toolbar className="bg-secondary">
              <Typography variant="title" color="inherit" style={{
                flex: 1,
                minWidth: '800px',
                }} 
                align="center"
                >
                지점정보 수정
              </Typography>
            </Toolbar>
          </AppBar>

          <div align="center">

            <div className="col-md-4 col-4" >
                <TextField
                name="branchName"
                label="지점명"
                value={this.state.branch && this.state.branch.branchName}
                onChange={this.handleChange('branchName')}
                helperText="*필수입력란"
                margin="normal"
                fullWidth
                />                
            <br />
            </div>
            <div className="col-md-4 col-4">
                <TextField
                    name="branchTel"
                    label="지점전화번호"
                    value={this.state.branch && this.state.branch.branchTel}
                    onChange={this.handleChange('branchTel')}
                    margin="normal"
                    fullWidth
                />
            <br />
            </div>

            <div className="col-md-4 col-4" >
              <TextField
              name="branchManagerName"
              label="지점장명"
              value={this.state.branch && this.state.branch.branchManagerName}
              onChange={this.handleChange('branchManagerName')}
              helperText="*필수입력란"
              margin="normal"
              fullWidth
              />                
            <br/>
          </div>

            <div className="col-md-4 col-4">
                <TextField
                    name="branchManagerPhone"
                    label="지점장 휴대폰 번호"
                    value={this.state.branch && this.state.branch.branchManagerPhone}
                    onChange={this.handleChange('branchManagerPhone')}
                    helperText="*필수입력란"
                    margin="normal"
                    fullWidth
                />
            <br />
            </div>


          <div className="col-md-4 col-4">
              <TextField
                  name="businessLicenseNo"
                  label="사업자등록번호"
                  value={this.state.branch && this.state.branch.businessLicenseNo}
                  onChange={this.handleChange('businessLicenseNo')}
                  helperText="*필수입력란"
                  margin="normal"
                  fullWidth
              />
             <br />
            </div>


                <div className="col-md-4 col-4" >
                    <TextField
                        id="zipCode"
                        label="우편번호"
                        value={this.state.branch && this.state.branch.zipCode}
                        margin="normal"
                        fullWidth
                    />
                    <GetPostCode getPostcode={ this.handlePostcode }/>
                </div>

                <div className="col-md-4 col-4" >
                    <TextField
                        id="address"
                        label="주소"
                        value={this.state.branch && this.state.branch.address}
                        margin="normal"
                        fullWidth
                    />
                </div>

                <div className="col-md-4 col-4" >
                    <TextField
                        id="detailAddress"
                        label="상세주소"
                        value={this.state.branch && this.state.branch.detailAddress}
                        onChange={this.handleChange('detailAddress')}
                        margin="normal"
                        fullWidth
                    />
                </div>

                <div className="col-md-4 col-4" >
                    <TextField
                        id="localCodeNo"
                        select
                        label="지역선택"
                        SelectProps={{}}
                        value={this.state.branch && this.state.branch.localCodeNo}
                        onChange={this.handleChange('localCodeNo')}
                        helperText="지역을 선택하세요"
                        margin="normal"
                        fullWidth
                    >
                      {localList && localList.map( option => (

                          <MenuItem key={option.localCodeNo} value={option.localCodeNo}>
                          {option.localCodeName}
                          </MenuItem>

                      ))}

                    </TextField>

                </div>

              </div>
              <br/><br/>

              <div align="right">
              <Button onClick={this.submitBranch} variant="outlined" aria-label="Close" ><i class="zmdi zmdi-close-circle zmdi-hc-1g"></i>수정하기</Button>
              </div>
              <br/><br/>

              <Button onClick={this.closeUpdateBranch} variant="outlined" aria-label="Close" ><i class="zmdi zmdi-close-circle zmdi-hc-1g"></i>닫기</Button>
              <br/>
            </Dialog>

          </div>

        );
    }

}

export default connect(null, { updateBranch, cleanStoreState })(UpdateBranch);