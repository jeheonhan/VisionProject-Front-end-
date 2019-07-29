import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import Widget from "components/Widget";

class GetBankInfo extends Component {

  //this.state 직접 변경은 constructor 안에서만 가능하고, 그 외에 state 값을 변경하고 싶으면 setState 메소드를 사용해야함.
  //setState 사용하면 redering 된다.
  render() {
    
    const { vendorBank } = this.props;
    
    return (
      <div>

        <Dialog open={this.props.open} onClose={this.props.close}>
          <DialogTitle>
            {"이체정보"}
          </DialogTitle>
            <DialogContent style={{maxWidth:"360px", minWidth:"360px", maxHeight:"180px", minHeight:"180px"}}>
                <div className="media align-items-center flex-nowrap jr-pro-contact-list">
                  <div className="mr-3">
                    <i className={`zmdi zmdi-view-web jr-fs-xxl text-grey`}/>
                  </div>
                  <div className="media-body">
                    <span className="mb-0 text-grey jr-fs-sm">계좌번호</span>
                    <p className="mb-0">{vendorBank && vendorBank.vendorAccount.accountNo}</p>
                  </div>
                </div>
                <div className="media align-items-center flex-nowrap jr-pro-contact-list">
                  <div className="mr-3">
                    <i className={`zmdi zmdi-account-box jr-fs-xxl text-grey`}/>
                  </div>
                  <div className="media-body">
                    <span className="mb-0 text-grey jr-fs-sm">예금주</span>
                    <p className="mb-0">{vendorBank && vendorBank.vendorAccount.accountHolder}</p>
                  </div>
                </div>
                <div className="media align-items-center flex-nowrap jr-pro-contact-list">
                  <div className="mr-3">
                    <i className={`zmdi zmdi-money jr-fs-xxl text-grey`}/>
                  </div>
                  <div className="media-body">
                    <span className="mb-0 text-grey jr-fs-sm">은행명</span>
                    <p className="mb-0">{vendorBank && vendorBank.vendorAccount.bankCodeName}</p>
                  </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.props.close} color="primary">
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