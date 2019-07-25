import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import CardBox from 'components/CardBox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';




  class GetOrderToVendorDetailList extends React.Component {

    constructor(props){

      super(props);

      this.state = {
        OrderToVendorDetatilList : this.props.OrderToVendorDetatilList,
      }
  }
     
    /*handleClickOpen = () => {
      this.setState({open: true});
    }; */
  
    closeOrderTovendorDetail = (event) => {
      event.preventDefault();
      this.setState({open: false});
    };
   
    render() {

      if(this.props.OrderToVendorDetatilList !== this.state.OrderToVendorDetatilList){
        console.log("1start")
        console.log(this.props.OrderToVendorDetatilList)
        this.setState({ OrderToVendorDetatilList : this.props.OrderToVendorDetatilList});
      }

      console.log(this.state)
      
      return (
        
          <Dialog            
            open={this.props.open}
          >
          
          <DialogTitle align="center">발주 상세보기</DialogTitle>
                
          <CardBox styleName="col-lg-13" cardStyle="p-0" headerOutside> 
<div>

                 {this.state.OrderToVendorDetatilList.map((row) => {
                  // console.log("map :::::::: "+this.state.OrderToVendorDetatilList)
                   return (
                    <div>
                  발주번호 : {row.orderToVendorNo}
                  물품명 : {row.productName}
                  수량 : {row.quantity}
                  발주금액 : {row.amount}
                  입고상태 : {row.orderToVendorProductStatusCodeName}
                    </div>
                   );


                 })}
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

export default GetOrderToVendorDetailList;