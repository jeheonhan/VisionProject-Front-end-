import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';

class GetBankInfo extends Component {

  //this.state 직접 변경은 constructor 안에서만 가능하고, 그 외에 state 값을 변경하고 싶으면 setState 메소드를 사용해야함.
  //setState 사용하면 redering 된다.


  render() {
    
    const { vendorBank } = this.props;
    
    return (
      <div>

        <Dialog open={this.props.open}>
          <DialogTitle>
            {"이체정보"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div>
                계좌번호 : { vendorBank && vendorBank.vendorAccount.accountNo }
              </div>
              <div>
                예금주 : { vendorBank && vendorBank.vendorAccount.accountHolder }
              </div>
              <div>
                은행코드 : { vendorBank && vendorBank.vendorAccount.bankCodeNo }
              </div>
              <div>
                은행명 : { vendorBank && vendorBank.vendorAccount.bankCodeName }
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

const mapStateToProps = ({ accounting }) => {
  const { vendorBank } = accounting;

  return { vendorBank };
}

export default connect(mapStateToProps)(GetBankInfo);