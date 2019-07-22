import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class GetBankInfo extends Component {

  //this.state 직접 변경은 constructor 안에서만 가능하고, 그 외에 state 값을 변경하고 싶으면 setState 메소드를 사용해야함.
  //setState 사용하면 redering 된다.


  render() {
    console.log("여기는 GetBankInfo");
    
    return (
      <div>

        <Dialog open={this.props.open} onClose={this.handleRequestClose}>
          <DialogTitle>
            {"이체정보"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div>
                계좌번호 : { this.props.vendor.vendorAccount.accountNo }
              </div>
              <div>
                예금주 : { this.props.vendor.vendorAccount.accountHolder }
              </div>
              <div>
                은행코드 : { this.props.vendor.vendorAccount.bankCodeNo }
              </div>
              <div>
                은행명 : { this.props.vendor.vendorAccount.bankCodeName }
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>

            <Button onClick={this.props.close} color="secondary">
              닫기
            </Button>

          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default GetBankInfo;