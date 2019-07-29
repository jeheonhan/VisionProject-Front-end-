import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import CardBox from 'components/CardBox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import OrderToVendor from 'app/routes/productionManagement/routes/OrderToVendor';
import { connect } from 'react-redux';
import { updateOrderToVenItemCode   } from 'actions/index.js';

let counter = 0;

const columnData = [
  {id: 'orderToVendorNo', align: false, disablePadding: false, label: '발주번호'},
  {id: 'productName', align: true, disablePadding: false, label: '물품명'},
  {id: 'quantity', align: true, disablePadding: false, label: '양념수량'},
  {id: 'purchasePrice: ', align: true, disablePadding: false, label: '발주금액'},
  {id: 'orderToVendorProductStatusCodeName', align: true, disablePadding: false, label: '입고상태'},
];

  class GetOrderToVendorDetailList extends React.Component {

    constructor(props){

      super(props);

      this.state = {
        OrderToVendorDetatilList : this.props.OrderToVendorDetatilList,
        OrderToVendorList : this.props.OrderToVendorList//추가해줌
      }
  }
  //한번만 호출했는데 여러번호출됨
  //잘 모르겠지만 새로고침을 해줘야함
  //스택이 쌓이나봄
  updateOrderToVenItem = (event,orderToVendorProduct) => {
   event.preventDefault();
    console.log(orderToVendorProduct);
    if(orderToVendorProduct !== undefined){
     
      this.props.updateOrderToVenItemCode(orderToVendorProduct);
      this.setState({
        ...this.state , 
        data:this.props.orderToVendorProduct   });
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

  
      console.log(this.props.OrderToVendorDetatilList)

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
                  <table  className='table'>
                        <tr>
                           <th>발주번호</th>
                          <th>물품명</th>
                          <th>수량</th>
                          <th>발주금액</th>
                          <th>입고상태</th>  
                        </tr> 
                 {this.state.OrderToVendorDetatilList.map((row) => {
                   
                   return (
                     
                    <tr>
                      <td>{row.orderToVendorNo}</td>
                      <td>{row.productName}</td>
                      <td>{row.quantity}</td>
                      <td>{row.amount}</td>
                    
                      
                      {row.orderToVendorProductStatusCodeName =='입고대기'?
                      <td onClick={event => this.updateOrderToVenItem(event,row) } style={{cursor:'pointer', color:'red'}} >
                      {row.orderToVendorProductStatusCodeName }
                      </td>
                    :
                      <td style={{ color:'blue'}} >
                      {row.orderToVendorProductStatusCodeName }
                      </td>
                      }
                    
                    </tr>
                    
                    


                     
                  //   <div class='orderDiv'>
                  // <span>발주번호 : {row.orderToVendorNo}</span>
                  // <span>물품명 : {row.productName}</span>
                  // <span>수량 : {row.quantity}</span>
                  // <span>발주금액 : {row.amount}</span>
                  // <span>입고상태 : {row.orderToVendorProductStatusCodeName}</span>
                  //   </div>
                   );


                 })}
                 </table>
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

  const mapStateToProps = ({productionManagement}) => {
    const { OrderToVendorList  } = productionManagement;
    return { OrderToVendorList  };
  }
  


export default connect(mapStateToProps,{updateOrderToVenItemCode})(GetOrderToVendorDetailList);
