import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import GetPostCode from 'components/accounting/GetPostCode';
import { connect } from 'react-redux';
import { getLocalList, addBranch } from 'actions/index';
import MaskedInput from 'react-text-mask';
import {Redirect} from 'react-router-dom';

class SsnMaskCustom extends React.Component {
  render() {
    return (
      <MaskedInput
        {...this.props}
        mask={[ /\d/, /\d/, /\d/, /\d/,  /\d/,  /\d/, '-', /\d/, /\d/, /\d/, /\d/,  /\d/,  /\d/,  /\d/]}
        placeholderChar={'\u2000'}
        //showMask
      />
    );
  }
}


class AddBranch extends React.Component{


    state = {
        branch:{
          branchName : '',
          zipCode : '',
          address : '',
          detailAddress : '',
          businessLicenseNo : '',
          branchTel: '',
          branchManagerName: '',
          branchManagerPhone: '',
          localCodeNo: '',
          localCodeName:'',
        }
        
      };
  
    handleChange =  name => e => {
    
        this.setState({
          ...this.state,
          branch : {
            ...this.state.branch,
          [name] : e.target.value,
          }
        });
      };

      handlePostcode = (zipCode, address) => {
        this.setState({
          branch : {...this.state.branch, address:address, zipCode:zipCode}
        })
      };

      submitFn = () => {
        this.props.addBranch(this.state.branch);
        this.setState({
          redirect : true,
        })
      }

      renderRedirect = () => {
        if(this.state.redirect){
          this.setState({
            ...this.state,
            redirect : false,
          })

          return <Redirect to={{
            pathname: "/app/businessSupport/branch",
          }}/>
        }
      }

    render() {

      // 페이지 처음 들어오거나 리로드할 때 모든 render()를 읽음,
      // reder()가 실행되는 경우는 2가지 -> 1.setState할 때, 2. reducer가 store 값을 setting할 때 
      console.log(this.state.branch)

        const { localList } = this.props;

        if( localList == undefined ){
          this.props.getLocalList();
        }

        return (

          <div>
            {this.renderRedirect()}
            <AppBar className="position-relative">
            <Toolbar className="bg-secondary">
              <Typography variant="h6" color="inherit" style={{
                flex: 1,
              }}>
                지점정보 입력
              </Typography>
            </Toolbar>
          </AppBar>

          <div align="center">

            <div className="col-md-4 col-4" >
                <TextField
                name="branchName"
                label="지점명"
                value={this.state.branchName}
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
                    value={this.state.branchTel}
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
              value={this.state.branchManagerName}
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
                    value={this.state.branchManagerPhone}
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
                  value={this.state.businessLicenseNo}
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
                        value={this.state.branch.zipCode}
                        margin="normal"
                        fullWidth
                    />
                    <GetPostCode getPostcode={ this.handlePostcode }/>
                </div>

                <div className="col-md-4 col-4" >
                    <TextField
                        id="address"
                        label="주소"
                        value={this.state.branch.address}
                        margin="normal"
                        fullWidth
                    />
                </div>

                <div className="col-md-4 col-4" >
                    <TextField
                        id="detailAddress"
                        label="상세주소"
                        value={this.state.branch.detailAddress}
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
                        value={this.state.branch.localCodeNo}
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
                <div align="center">
                <Button className="btn-block text-white  bg-deep-orange col-md-4 col-4" 
                        color="default" size="medium" onClick={() => {this.submitFn()}}>
                  등록하기
                </Button>
                </div>
            
            </div>


        )
    }

}

const mapStateToProps = ( {businessSupport} ) => {
  const { localList } = businessSupport;
  return { localList };
}

export default connect(mapStateToProps, { getLocalList, addBranch })(AddBranch);