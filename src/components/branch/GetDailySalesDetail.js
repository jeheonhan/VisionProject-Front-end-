import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
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

            <DialogContent style={{minWidth: '500px', maxWidth: '500px', minHeight:'400px', maxHeight:'400px'}}>
                    <div>
                        {this.state.salesProduct.map((row) => {
                            
                            return(
                                <div>
                                    <div>지점번호 : {row.branchNo}</div>
                                    <div>매출일자 : {row.salesDate}</div>
                                    <div>메뉴번호 : {row.menuNo}</div>
                                    <div>메뉴 : {row.menuName}</div>
                                    <div>메뉴가격 : {row.salesPrice}</div>
                                    <div>판매수량 : {row.salesQuantity}</div>
                                    <div>판매금액 : {row.salesAmount}</div>
                                </div>
                            );
                            })}
                    </div>
            </DialogContent>
                    
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