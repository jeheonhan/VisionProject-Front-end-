import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Pie, PieChart, ResponsiveContainer, Tooltip} from 'recharts';
import Paper from '@material-ui/core/Paper';


class AlertDialog extends Component {
  state = {
    open: false,
  };

  handleRequestClose = () => {
    this.setState({open: false});
  };

  render() {
    
    const prod = this.props.targetOB.orderFromBranchProductList;
    
    let data001 = [];
    

    const forChart = () => {
      this.props.targetOB.orderFromBranchProductList.map(n => {
        data001.push({name: n.productName, value: Number(n.orderFromBranchProductAmount)});
      });
      data001 = data001.sort((a, b) => (b['value'] - a['value']));
    }

    const CustomTooltip = ({ active, payload, label }) => {
      if (active) {
        return (
          <Paper elevation={8} style={{padding:"7px", backgroundColor:"#fbd2cb"}}>
            <p className="label">{`${payload[0].name} : ₩${String(payload[0].value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`}</p>
            {getIntroOfPage(payload[0].name)}
          </Paper>
        );
      }
    
      return null;
    };

    //설명 가져오기
    const getIntroOfPage = (name) => {
      const arr = this.props.targetOB.orderFromBranchProductList;
      return(
        <div>
        <div>단가 : ₩{arr[arr.findIndex(prod => prod.productName===name)].price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</div>
        <div>수량 : {arr[arr.findIndex(prod => prod.productName===name)].orderFromBranchProductQuantity}개</div>
        <div>주문총액의 {Math.floor(100*(arr[arr.findIndex(prod => prod.productName===name)].orderFromBranchProductAmount)/(this.props.targetOB.orderFromBranchTotalAmount))}%를 차지합니다.</div>
        </div>
      );
    };

    return (
      <div>
        {forChart()}
        <Dialog maxWidth='md' open={this.props.open} onClose={this.props.handleClose}>
        <AppBar className="position-relative" style={{backgroundColor:"#CC4F3A"}}>
            <Toolbar>
              <IconButton onClick={this.props.handleClose} aria-label="Close">
                <CloseIcon/>
              </IconButton>
              <Typography color="inherit" style={{
                flex: 1,
              }}>
                주문상세조회
              </Typography>
            </Toolbar>
          </AppBar>
          <DialogTitle>
          {"주문번호 : "+this.props.targetOB.orderFromBranchNo + " ("+this.props.targetOB.orderDate+")"}
              <div className="jr-card" style={{margin:"0px", backgroundColor:"#fbd2cb", float:"right", padding:"0px", paddingLeft:"5px", paddingRight:"5px", paddingTop:"11px"}}><h4>주문총액 &nbsp;&nbsp;&nbsp;₩ {(this.props.targetOB.orderFromBranchTotalAmount).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</h4></div>
          </DialogTitle>
          <DialogContent >

    <div className="table-responsive-material jr-card" style={{float:"left", width:"50%"}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell size="small">물품명</TableCell>
            <TableCell size="small" align="left">단가(원)</TableCell>
            <TableCell size="small" align="left">수량(개)</TableCell>
            <TableCell size="small" align="left">금액(원)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prod.map(n => {
            return (
              <TableRow key={n.numbering}>
                <TableCell>{n.productName}</TableCell>
                <TableCell align="left">{n.price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</TableCell>
                <TableCell align="left">{n.orderFromBranchProductQuantity}</TableCell>
                <TableCell align="left">{n.orderFromBranchProductAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
    <div style={{float:"left", width:"50%"}}>
    <ResponsiveContainer width="100%" height={300}>
    <PieChart style={{marginLeft:"20px"}}>
      <Pie dataKey="value" isAnimationActive={false} data={data001} cx="35%" cy="50%" outerRadius={80}
           fill="#CC4F3A" label/>
      <Tooltip content={CustomTooltip}/>
    </PieChart>
  </ResponsiveContainer>
  </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;