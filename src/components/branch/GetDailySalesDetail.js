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
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import Paper from '@material-ui/core/Paper';
import { DialogContent } from '@material-ui/core';


function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class GetDailySalesDetail extends React.Component {
  
  constructor(props){
    
    super(props);
    
    this.state = {
      salesProductList : this.props.salesProduct,
    }
  }
     
    closeBranchDetail = (event) => {
      event.preventDefault();
      this.setState({open: false});
    };

    handleInputChange = (key, row) => event => {
      let _quantity = parseInt(event.target.value, 10);
      if(isNaN(_quantity)){
        _quantity = 0
      }
      if(_quantity <= 0){
        if(key == -1){
          return;
        }
        _quantity=0;
      }

      let _menuPrice = parseInt(row.salesPrice, 10);

      let _salesAmount = _menuPrice * _quantity;


      let list = this.state.salesProductList;
      let updateProd = {
            salesNumbering: row.salesNumbering,
            branchNo: row.branchNo,
            menuNo: row.menuNo,
            menuName: row.menuName,
            menuPrice:row.salesPrice,
            salesPrice:row.salesPrice,
            salesDate: row.salesDate,
            salesQuantity: _quantity,
            salesAmount: _salesAmount,
      };
      list.splice(key, 1, updateProd);

      this.setState({
        ...this.state,
        salesProductList : list
      })
      
    
  }
  
   
    render() {

      if(this.props.salesProduct !== this.state.salesProductList){
        this.setState({ salesProductList : this.props.salesProduct});
       
      }

      let forLegend = [{"후라이드 치킨": 0, "양념 치킨": 0}]

      let chartQuantity = [
        {menuName: '수량', "후라이드 치킨": 4000, "양념 치킨": 2400},
      ];

      let chartAmount = [
        {menuName: '판매금액', "후라이드 치킨": 4000, "양념 치킨": 2400},
      ];
      
      const makeDataForChart = () => {
        this.state.salesProductList.map( (sales) =>{
          const _menuName = sales.menuName;
          delete forLegend[0][_menuName];
          delete chartQuantity[0][_menuName];
          delete chartAmount[0][_menuName];
          forLegend[0][_menuName] = "#"+(Math.round(Math.random()*0xffffff)).toString(16);
          chartQuantity[0][_menuName] = sales.salesQuantity;
          chartAmount[0][_menuName] = sales.salesAmount;
        })
      }

      const makeBar = () => {
        Object.keys(chartAmount[0]).map((key)=>{
          if(key==="menuName"){
            return;
          }
          return (<Bar dataKey={key} fill={forLegend[0][key]}/>)
        })
      }
      
      return (
        
          <Dialog            
            open={this.props.open}
            TransitionComponent={Transition}
            maxWidth=""
            onClose={this.props.handleRequestClose}
          >
            {console.log(forLegend)}
            {this.state.salesProductList && makeDataForChart()}
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

            <div className="table-responsive-material" style={{overflow:"hidden"}} >
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
            {this.state.salesProductList && this.state.salesProductList.map(row => {
                return (
                  <TableRow key={row.menuNo}>
                    <TableCell width="50px">{row.menuNo}</TableCell>
                    <TableCell align="center">{row.menuName}</TableCell>
                    <TableCell align="center">{row.salesPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</TableCell>
                    {this.props.updateDetail ? 
                                  <TableCell align="center"><FormControl style={{width:"70px"}}>
                                  <Input
                                      id={row.menuNo}
                                      type="number"
                                      value= {this.state.salesProductList[this.state.salesProductList.findIndex(prod => prod.menuNo===row.menuNo)].salesQuantity}
                                      onChange={this.handleInputChange(this.state.salesProductList.findIndex(prod => prod.menuNo===row.menuNo), row)}
                                  />
                                  </FormControl></TableCell>
                                  : <TableCell align="center">{row.salesQuantity}</TableCell>
                                }
                    <TableCell align="center">{row.salesAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</TableCell>
                    <TableCell align="center">{row.salesDate}</TableCell>
                  </TableRow>
                    );
            })}
              <TableRow>
              </TableRow>
                </TableBody>
            </Table>
            {this.props.updateDetail ? null :
  <div className="row" style={{paddingLeft:"2%", paddingTop:"5%"}}>
    
  <ResponsiveContainer width="34%" height={200}>
    <BarChart data={chartQuantity}
              margin={{top: 10, right: 0, left: 0, bottom: 0}}>
      <XAxis dataKey="menuName"/>
      <YAxis/>
      <CartesianGrid strokeDasharray="3 3"/>
      {Object.keys(chartQuantity[0]).map((key)=>{
          if(key==="menuName"){
            return;
          }
          return (<Bar dataKey={key} fill={forLegend[0][key]}/>)
        })}
    </BarChart>
  </ResponsiveContainer>

  <ResponsiveContainer width="33%" height={200}>
    <BarChart data={chartAmount}
              margin={{top: 10, right: 0, left: 0, bottom: 0}}>
      <XAxis dataKey="menuName"/>
      <YAxis/>
      <CartesianGrid strokeDasharray="3 3"/>
      {Object.keys(chartAmount[0]).map((key)=>{
          if(key==="menuName"){
            return;
          }
          return (<Bar dataKey={key} fill={forLegend[0][key]}/>)
        })}
    </BarChart>
  </ResponsiveContainer>

  <ResponsiveContainer width="31%" height={200} >
    <BarChart data={forLegend}
              margin={{top: 10, right: 0, left: 0, bottom: 50}}>
     <Legend layout="vertical"/>
     {Object.keys(chartAmount[0]).map((key)=>{
          if(key==="menuName"){
            return;
          }
          return (<Bar dataKey={key} fill={forLegend[0][key]}/>)
        })}
    </BarChart>
  </ResponsiveContainer>
  </div>}
            </div>
            </CardBox>
                  <DialogActions align="centery">
                    {this.props.updateDetail ? 
                    //수정 반영하는 버튼
                    <Button onClick={() => this.props.updateDetailRequest(this.state.salesProductList)} color="primary">
                        반영
                    </Button>
                    :
                    //수정 요청하는 버튼
                    <Button onClick={this.props.handleUpdate} color="primary">
                        수정
                    </Button>}
                    <Button onClick={this.props.handleRequestClose} color="secondary">
                        닫기
                    </Button>
                  </DialogActions>
          </Dialog>
      );
    }
  }

export default GetDailySalesDetail;