import React from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import GetPostCode from 'components/accounting/GetPostCode';
import { connect } from 'react-redux';
import { getLocalList } from 'actions/index';


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
          localCodeNo: ''
        }
      };

    handleChange = (e) => {
    
        e.preventDefault();
    
        this.setState({
          ...this.state,
          branch : {
            ...this.state.branch,
          [e.target.name] : e.target.value,
          }
        });
      };

      handlePostcode = (zipCode, address) => {
        this.setState({
          ...this.state,
          zipCode:zipCode,
          address:address
        })
      };

    render() {

        const { localList } = this.props;

        if( localList === undefined){

          this.props.getLocalList();
        }

        return (

            <div  align="left">

            <AppBar className="position-relative">
            <Toolbar className="bg-secondary">
              <Typography variant="h6" color="inherit" style={{
                flex: 1,
              }}>
                지점 등록
              </Typography>
            </Toolbar>
          </AppBar>

            <div className="col-md-4 col-4" >
                <TextField
                name="branchName"
                label="지점명"
                value={this.state.branchName}
                onChange={this.handleChange}
                margin="normal"
                fullWidth
                />                
            <br />
            </div>
            <div className="col-md-4 col-4">
                <TextField
                    name="branchTel"
                    label="지점전화번호"
                />
            <br />
            </div>

                 <div className="col-md-4 col-4" >
                    <TextField
                    name="branchManagerName"
                    label="지점장명"
                    value={this.state.branchManagerName}
                    onChange={this.handleChange}
                    margin="normal"
                    fullWidth
                    />                
                 <br/>
                </div>

                <div className="col-md-4 col-4" >
                    <TextField
                        id="address"
                        label="주소"
                        value={this.state.address}
                        onChange={this.handleChange}
                        onClick={this.handleAddress}
                        margin="normal"
                        fullWidth
                    />
                </div>

                <div className="col-md-4 col-4" >
                    <TextField
                        id="zipCode"
                        label="우편번호"
                        value={this.state.zipCode}
                        margin="normal"
                        fullWidth
                    />
                    <GetPostCode getPostcode={ this.handlePostcode }/>
                </div>

                <div className="col-md-4 col-4" >
                    <TextField
                        id="localCodeNo"
                        select
                        label="지역선택"
                        SelectProps={{}}
                        value={this.state.localCodeNo}
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
        )
    }

}

const mapStateToProps = ( {businessSupport} ) => {
  const { localList } = businessSupport;
  return { localList };
}

export default connect(mapStateToProps, { getLocalList })(AddBranch);