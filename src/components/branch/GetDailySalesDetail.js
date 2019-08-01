import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import CardBox from "components/CardBox";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { DialogContent } from '@material-ui/core';


function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class GetDailySalesDetail extends React.Component {
  
  constructor(props){
    
    super(props);
    
    this.state = {
      salesProduct : this.props.salesProduct,
    }
  }
     
    closeBranchDetail = (event) => {
      event.preventDefault();
      this.setState({open: false});
    };
   
    render() {

      if(this.props.salesProduct !== this.state.salesProduct){
        this.setState({ salesProduct : this.props.salesProduct});
      }

      console.log(this.state)
      
      return (
        
          <Dialog            
            open={this.props.open}
            TransitionComponent={Transition}
            maxWidth=""
            onClose={this.props.handleRequestClose}
          >
          
          <AppBar className="position-relative" >
            <Toolbar className="bg-secondary">
              <Typography variant="title" color="inherit" style={{
                flex: 1,
                minWidth: '500px',
                }} 
                align="center"
                >
                일매출 상세조회
              </Typography>
            </Toolbar>
          </AppBar>
                  
            <CardBox styleName="col-lg-13" cardStyle="p-0" headerOutside>

            <div className="table-responsive-material" >
            <Table>
                <TableHead>
                    <TableRow>
                    <TableCell align="center">No</TableCell>
                    <TableCell align="center">메뉴번호</TableCell>
                    <TableCell align="center">판매단가</TableCell>
                    <TableCell align="center">판매수량</TableCell>
                    <TableCell align="center">판매금액</TableCell>
                    <TableCell align="center">매출일자</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
            {this.state.salesProduct && this.state.salesProduct.map(row => {
                return (
                  <TableRow key={row.menuNo}>
                    <TableCell width="50px">{row.menuNo}</TableCell>
                    <TableCell align="center">{row.menuName}</TableCell>
                    <TableCell align="center">{row.salesPrice}</TableCell>
                    <TableCell align="center">{row.salesQuantity}</TableCell>
                    <TableCell align="center">{row.salesAmount}</TableCell>
                    <TableCell align="center">{row.salesDate}</TableCell>
                  </TableRow>
                    );
            })}
              <TableRow>
              </TableRow>
                </TableBody>
            </Table>
            </div>
            </CardBox>
                  <DialogActions align="centery">
                    <Button onClick={this.props.handleRequestClose} color="secondary">
                        닫기
                    </Button>
                  </DialogActions>
          </Dialog>
      );
    }
  }

export default GetDailySalesDetail;