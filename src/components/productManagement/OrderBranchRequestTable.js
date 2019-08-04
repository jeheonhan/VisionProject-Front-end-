import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Note';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconMailOutline from '@material-ui/icons/MailOutline';
import { connect } from 'react-redux';
import { getProductList, getInfoAccount, addOrderBranch, getOrderBranchList } from 'actions/index';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import CardBox from 'components/CardBox/index';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import Done from '@material-ui/icons/Done';

import OrderFromBranchCartArr from 'components/productManagement/OrderFromBranchCartArr';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Iamport from 'react-iamport';
import {Redirect} from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert'
import moment from 'moment';


let counter = 0;


//칼럼명 지어주는 곳
//label에 쓰는 단어가 화면에 표시
const columnData = [
  {id: 'productNo', align: true, disablePadding: false, label: '물품번호'},
  {id: 'productName', align: true, disablePadding: false, label: '물품명'},
  {id: 'salesPrice', align: true, disablePadding: false, label: '주문단가'},
  {id: 'quantity', align: true, disablePadding: false, label: '재고'},
];

class EnhancedTableHead extends React.Component {
  static propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    
    const {onSelectAllClick, order, orderBy, numSelected, rowCount} = this.props;

    return (
      <TableHead>
        <TableRow>
          {/* <TableCell padding="checkbox">
            <Checkbox color="primary"
                      indeterminate={numSelected > 0 && numSelected < rowCount}
                      checked={numSelected === rowCount}
                      onChange={onSelectAllClick}
            />
          </TableCell> */}
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {/* 칼럼명 나타나는 영역 */}
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
          <TableCell>
            구매 수량
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }
}


let EnhancedTableToolbar = props => {
  const {numSelected} = props;

  return (
    <Toolbar
      className="table-header">
        {/* 상단 툴바
            체크가 되면 selected로 변경됨 */}
      <div className="title">
        {numSelected > 0 ? (
          <Typography variant="subheading">{numSelected} 선택</Typography>
        ) : (
          <Typography variant="title">물품 목록조회</Typography>
        )}
      </div>
      <div className="spacer"/>
      <div className="actions">
        {numSelected > 0 ? (
          // 툴팁 내용
          <Tooltip title="수정">
            <IconButton aria-label="수정">
              <DeleteIcon/>
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon/>
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};


class EnhancedTable extends React.Component {
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    if(property==='salesPrice'||property==='productNo'){
        order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] - a[orderBy] ))
        : this.state.data.sort((a, b) => (a[orderBy] - b[orderBy] ));
    }

    this.setState({data, order, orderBy});
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({selected: this.state.data.map((row, index) => index)});
      return;
    }
    this.setState({selected: []});
  };
  handleKeyDown = (event, id) => {
    if (keycode(event) === 'space') {
      this.handleClick(event, id);
    }
  };
  handleClick = (event, _productNo) => {
    //어딨는지 찾기
    const thisIndex = this.state.data.findIndex(prod => prod.productNo===_productNo);
    const result = parseInt(thisIndex/this.state.rowsPerPage, 10); 
    const remainder = (thisIndex%this.state.rowsPerPage);

    let newSelected = [(result*this.state.rowsPerPage)+remainder];
    this.setState({selected: newSelected, page:result});
    setTimeout(() => {this.handleClickEmptySelected()}, 2000);
    return;      
  };
  handleClickEmptySelected = () => {
    this.setState({selected: []});
  }
  handleChangePage = (event, page) => {
    this.setState({page});
  };
  handleChangeRowsPerPage = event => {
    this.setState({rowsPerPage: event.target.value});
  };
  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleNumberInputChange = (key, row, index) => event => {
    let _quantity = event.target.value.replace(/(^0+)/, "");
    _quantity = parseInt(_quantity, 10);
    if(isNaN(_quantity)){
      _quantity = 0
    }
    if(_quantity>row.quantity){
      _quantity = row.quantity;
    }
    if(row.quantity==0){
      return this.onLackQuantity();
    }
    if(_quantity<=0){
      if(key==-1){
        return;
      }
      let list = this.state.orderBranch.orderFromBranchProductList;
      list.splice(key,1)
      this.setState({
        orderBranch:{
          ...this.state.orderBranch,
          orderFromBranchProductList : list
        }
      })
      return;
    }

    if(key==-1){
      this.setState({
        orderBranch:{
          ...this.state.orderBranch,
          orderFromBranchProductList : 
            this.state.orderBranch.orderFromBranchProductList.concat(
            {productNo:row.productNo
             ,productName:row.productName
             ,price:row.salesPrice
             ,orderFromBranchProductQuantity:_quantity
             ,orderFromBranchProductAmount:row.salesPrice*_quantity
             })
        }
      })
    }else{
      let list = this.state.orderBranch.orderFromBranchProductList;
      let updatedProd = {productNo:row.productNo
        ,productName:row.productName
        ,price:row.salesPrice
        ,orderFromBranchProductQuantity:_quantity
        ,orderFromBranchProductAmount:row.salesPrice*_quantity
        };
      list.splice(key,1,updatedProd)

      this.setState({
        orderBranch:{
          ...this.state.orderBranch,
          orderFromBranchProductList : list
        }
      })

    }
  };
  

    handleRequestDeleteList = data => () => {
      const chipData = this.state.orderBranch.orderFromBranchProductList;
      const chipToDelete = chipData.indexOf(data);
      chipData.splice(chipToDelete, 1);
      this.setState({
        ...this.state,
        orderBranch:{...this.state.orderBranch, orderFromBranchProductList : chipData}
      });
    };

    onSuccessIamport = () => {
      this.props.addOrderBranch(this.state.orderBranch);
      setTimeout(() => {this.props.getOrderBranchList({searchKeyword:JSON.parse(localStorage.getItem("user")).branchNo})}, 2000);
      this.setState({
        success:true
      })
      
    }

    onFailIamport = () => {
      let _warningText = "결제가 취소되었습니다.";
      if(this.state.orderBranch.orderFromBranchProductList.length==0){
        _warningText = "상품을 먼저 담아주세요."
      }
      this.setState({
        warning:true,
        warningText: _warningText
      })
    }

    onLackQuantity = () => {
      this.setState({
        warning:true,
        warningText:"현재 재고가 없는 상품입니다."
      })
    }

    warningOk = () => {
      this.setState({
          warning:false
      })
  }

  onConfirm = () => {
    this.setState({
        success:false,
        redirect:true,
    })
}

renderRedirect = () => {
  if (this.state.redirect) {
    //this.props.getApprovalList({searchCondition:"2", searchKeyword:this.state.firstApprover.employeeNo});
    this.setState({
      ...this.state,
      redirect:false
    })

    return <Redirect to={{
      pathname: "/app/branch/orderManage",
    }}/>
  }
}

  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'asc',
      orderBy: 'productNo',
      selected: [],
      // data에 props로 들어오는 list값 넣어주기.
      data: this.props.ProductList.sort((a, b) => (a["productNo"] - b["productNo"] )),
      page: 0,
      rowsPerPage: 5,
      search:{searchKeyword:null},
      flag: false,
      positionLeft:0,
      orderBranch : {
        orderFromBranchTotalAmount:""
        ,branchName:JSON.parse(localStorage.getItem("user")).branchName
        ,branchNo:JSON.parse(localStorage.getItem("user")).branchNo
        ,orderDate:moment().format("YYYY/MM/DD")
        ,accountNo:"138294382947"
        ,orderFromBranchProductList:[
             
           ]
     },
     warning:false,
     success:false
    };

  }


  render() {
    const {data, order, orderBy, selected, rowsPerPage, page} = this.state;

    const { ProductList } = this.props;

    const reverseArr = this.state.orderBranch.orderFromBranchProductList.slice();
    reverseArr.reverse()
    if(ProductList !== this.state.data){
      this.setState({data:ProductList});
    }

    let total = 0;

    if(this.state.orderBranch.orderFromBranchProductList.length!=0){
    this.state.orderBranch.orderFromBranchProductList.map((prod) => {
      return total += prod.orderFromBranchProductAmount
    })}
    
    return (
      <div className="jr-card">
        {this.renderRedirect()}
          {/* 총주문금액 */}
        <div style={{position:"fixed", width:"300px", height:"50px", display:"inline-block", right:"3%", /* 창에서 오른쪽 길이 */ top:"85%", /* 창에서 위에서 부터의 높이 */ backgroundColor: "transparent", margin:0}}><Paper className="text-white" style={{backgroundColor:"#f15b41", padding:"20px", float:"right"}}elevation={16}>총 주문금액: {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Paper></div>
          {/* 장바구니 */}
          <div>
            <div className="jr-card shadow border-0 bg-secondary text-white"  style={{padding:"5px", width:"80%", float:"left"}}>
                <OrderFromBranchCartArr 
                  cart={reverseArr} 
                  handleDelete={this.handleRequestDeleteList}
                  handleClick={this.handleClick}/>
            </div>


            <Iamport
            identificationCode="imp36066914"
            params={{
              pg: 'inicis',
              pay_method: 'card',
              merchant_uid: 'merchant_' + new Date().getTime(),
              name:  this.state.orderBranch.orderFromBranchProductList.length==0 ? "":(this.state.orderBranch.orderFromBranchProductList[0].productName + (this.state.orderBranch.orderFromBranchProductList.length>1 ? (" 외 "+(this.state.orderBranch.orderFromBranchProductList.length-1)+"개") : "")),
              amount: 100, //total,
              buyer_email: '',
              buyer_tel: '',
              buyer_addr: '',
              buyer_postcode: '',
              buyer_name: this.state.orderBranch.branchName,
              m_redirect_url: 'http://localhost:3000/app/branch/orderManage',
            }}
            jqueryLoaded={false}
            onFailed={this.onFailIamport}
            onSuccess={this.onSuccessIamport}
            render={(renderProps) => (
              <Button onClick={renderProps.onClick} className="text-white" size="large" style={{backgroundColor:"#f15b41", width:"15%", float:"right", marginLeft:"1%", marginTop:"0.5%", paddingTop:"1.5%"}}>
            <h2 className="font-weight-semibold">주문하기</h2>
            </Button>
            )}
          />
            



          </div>
            
          {/* 물품목록 */}
        {/* <EnhancedTableToolbar numSelected={selected.length}/> */}
        <div className="flex-auto" style={{clear:"left"}}>
          <div className="table-responsive-material">
            <Table>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              
              <TableBody>
                
                {/* props로 받은 list값을 페이지에 맞게 잘라서 map()을 사용함 */}
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  console.log("page::"+page+" rowsPerPage :: "+rowsPerPage+" index :: "+index+" data.length ::"+data.length);
                  const isSelected = this.isSelected(page*rowsPerPage+index);
                  return (
                    <TableRow
                      hover
                      onKeyDown={event => this.handleKeyDown(event, page*rowsPerPage+index)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={page*rowsPerPage+index}
                      selected={isSelected}
                    >
                      {/* <TableCell padding="checkbox">
                        <Checkbox color="primary" checked={isSelected} 
                                  onClick={event => this.handleClick(event, page*rowsPerPage+index)}/>
                      </TableCell> */}
                      <TableCell align="left" ><span style={{cursor:'pointer'}}>{row.productNo}</span></TableCell>
                      <TableCell align="left">{row.productName}</TableCell>
                      <TableCell align="left">{row.salesPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</TableCell>
                      <TableCell align="left">{row.quantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</TableCell>
                      <TableCell align="left"><FormControl style={{width:"70px"}}>
                                                <Input
                                                    id={row.productNo}
                                                    type="number"
                                                    value={ (this.state.orderBranch.orderFromBranchProductList.findIndex(prod => prod.productNo===row.productNo)!=-1 ? this.state.orderBranch.orderFromBranchProductList[this.state.orderBranch.orderFromBranchProductList.findIndex(prod => prod.productNo===row.productNo)].orderFromBranchProductQuantity : 0).toString().replace(/(^0+)/, "")}
                                                    onChange={this.handleNumberInputChange(this.state.orderBranch.orderFromBranchProductList.findIndex(prod => prod.productNo===row.productNo), row, index)}
                                                />
                                                </FormControl>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
             
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 8, 10, 20]}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
              
            </Table>
           
          </div>
         
        </div>
        <SweetAlert show={this.state.warning}
                    warning
                    confirmBtnText="확인"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title=""
                    onConfirm={this.warningOk}
            >
                {this.state.warningText}
            </SweetAlert>
            <SweetAlert show={this.state.success} success title=""
                    onConfirm={this.onConfirm}>
                        주문이 완료되었습니다. <br/>내주문관리로 이동합니다.
            </SweetAlert>
      </div>
    );
  }
}

const mapStateToProps = ({productionManagement}) => {
 
  const { ProductList } = productionManagement;
  return { ProductList};
}



                   
export default connect(mapStateToProps,  {addOrderBranch, getOrderBranchList} )(EnhancedTable);
