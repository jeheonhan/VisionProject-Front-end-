import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
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

// const StyledTableCell = withStyles(theme => ({
//     head: {
//       backgroundColor: theme.palette.common.black,
//       color: theme.palette.common.white,
//     },
//     body: {
//       fontSize: 14,
//     },
//   }))(TableCell);

//   const StyledTableRow = withStyles(theme => ({
//     root: {
//       '&:nth-of-type(odd)': {
//         backgroundColor: theme.palette.background.default,
//       },
//     },
//   }))(TableRow);

//   const useStyles = makeStyles(theme => ({
//     root: {
//       width: '100%',
//       marginTop: theme.spacing(3),
//       overflowX: 'auto',
//     },
//     table: {
//       minWidth: 700,
//     },
//   }));

//   const classes = useStyles();

class GetDailySalesDetail extends React.Component {
  
  constructor(props){
    
    super(props);
    
    this.state = {
      salesProduct : this.props.salesProduct,
    }
  }
     
    /*handleClickOpen = () => {
      this.setState({open: true});
    }; */
  
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
            //onClose={this.props.handleRequestClose}
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
                  <div>
                        {/* <Paper className={classes.root}>
                        <Table className={classes.table}>
                          <TableHead>
                            <TableRow>
                              <StyledTableCell align="right">No</StyledTableCell>
                              <StyledTableCell align="right">메뉴번호</StyledTableCell>
                              <StyledTableCell align="right">메뉴이름</StyledTableCell>
                              <StyledTableCell align="right">판매단가</StyledTableCell>
                              <StyledTableCell align="right">판매수량</StyledTableCell>
                              <StyledTableCell align="right">판매금액</StyledTableCell>
                              <StyledTableCell align="right">판매일자</StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            
                  {this.state.salesProduct.map((row) => {
                              <StyledTableRow key={row.salesNumbering}>
                                <StyledTableCell component="th" scope="row">
                                  {row.salesNumbering}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.menuNo}</StyledTableCell>
                                <StyledTableCell align="right">{row.menuName}</StyledTableCell>
                                <StyledTableCell align="right">{row.salesPrice}</StyledTableCell>
                                <StyledTableCell align="right">{row.salesQuantity}</StyledTableCell>
                                <StyledTableCell align="right">{row.salesAmount}</StyledTableCell>
                                <StyledTableCell align="right">{row.salesDate}</StyledTableCell>
                              </StyledTableRow>
                        })}
                          </TableBody>
                        </Table>
                      </Paper> */}
                  </div>
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