import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {connect} from 'react-redux'
import {sendShipping} from 'actions/index'
import Paper from '@material-ui/core/Paper';
import {Done} from '@material-ui/icons';

class AlertDialogSlide extends Component {
  state = {
    open: false,
  };

  handleRequestClose = () => {
    this.setState({open: false});
  };

  sendShipping = (event, prod) => {
    event.preventDefault();
    prod.orderFromBranchProductStatusCodeNo = "02";
    this.props.sendShipping(prod);
  }

  render() {
      const prodList = this.props.productList;
      let notYet = [];
      let already = [];
      const divideProd = () => {
          prodList.map((prod) => {
            if(prod.orderFromBranchProductStatusCodeNo==="01"){
                notYet.push(prod);
            }else if(prod.orderFromBranchProductStatusCodeNo==="02"){
                already.push(prod);
            }
          })
      }
    return (
      <div>
          {divideProd()}
        <Dialog open={this.props.open} TransitionComponent={Slide} onClose={this.props.cancel}>
          <DialogTitle style={{backgroundColor:"#CC4F3A", height:"60px"}}>
          <h1 className="font-weight-bold" style={{color:"white"}}>출하현황조회</h1>
          </DialogTitle>
          <DialogContent style={{maxWidth:"363pz", minWidth:"363px"}}>
          {(this.props.status==="01" || this.props.status==="03") && <div><h3 className="font-weight-semibold" style={{marginTop:"10px"}}><i class="zmdi zmdi-truck zmdi-hc-2"></i>&nbsp;미출하상품</h3>
          <Table className="jr-card">
        <TableHead>
          <TableRow>
            <TableCell size="small">물품명</TableCell>
            <TableCell size="small" align="left">수량(개)</TableCell>
            <TableCell size="small" align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notYet.map(n => {
            return (
              <TableRow key={n.numbering}>
                <TableCell>{n.productName}</TableCell>
                <TableCell align="left">{n.orderFromBranchProductQuantity}</TableCell>
                <TableCell align="left">
                <Button variant="contained" className="jr-btn bg-white text-black" style={{cursor:'pointer'}}  onClick={(event) => this.sendShipping(event, n)}>
                            출하
                            </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table></div>}
      {(this.props.status==="02" || this.props.status==="03") && <div><h3 className="font-weight-semibold"><i class="zmdi zmdi-check-square zmdi-hc-2"></i>&nbsp;출하완료상품</h3>
      <Table className="jr-card">
        <TableHead>
          <TableRow>
            <TableCell size="small">물품명</TableCell>
            <TableCell size="small" align="left">수량(개)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {already.map(n => {
            return (
              <TableRow key={n.numbering}>
                <TableCell>{n.productName}</TableCell>
                <TableCell align="left">{n.orderFromBranchProductQuantity}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table></div>}
      {(this.props.status==="04" || this.props.status==="05") && <div><i style={{paddingLeft:"40%", paddingRight:"40%"}} class="zmdi zmdi-alert-triangle zmdi-hc-5x"></i>
      <DialogContentText>취소된 주문서입니다.<br/>물품목록은 주문상세조회를 참고해주세요.</DialogContentText>
      </div>}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default connect(null, {sendShipping})(AlertDialogSlide);