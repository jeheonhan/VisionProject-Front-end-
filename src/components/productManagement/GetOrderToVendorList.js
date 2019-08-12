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
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Note';
import FilterListIcon from '@material-ui/icons/FilterList';
import { connect } from 'react-redux';
import { getOrderToVendorList , getOrderToVendorDetailList, updateOrderToVendorCode  } from 'actions/index.js';
import GetOrderToVendorDetailList from 'components/productManagement/GetOrderToVendorDetailList';
import {Delete} from '@material-ui/icons'
import SweetAlert from 'react-bootstrap-sweetalert'


//칼럼명 지어주는 곳
//label에 쓰는 단어가 화면에 표시
const columnData = [
  {id: 'orderToVendorNo', align: false, disablePadding: false, label: '발주서번호'},
  {id: 'totalAmount', align: true, disablePadding: false, label: '총금액'},
  {id: 'orderToVendorDate: ', align: true, disablePadding: false, label: '발주일자'},
  {id: 'orderToVenStatusCodeName', align: true, disablePadding: false, label: '발주상태'},
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
          <Typography variant="title">발주 목록조회</Typography>
        )}
      </div>
      <div className="spacer"/>
     
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};


class EnhancedTable extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'desc',
      orderBy: '',
      selected: [],
      // data에 props로 들어오는 list값 넣어주기.
      data: this.props.OrderToVendorList,
      page: 0,
      rowsPerPage: 10,
      search:{searchKeyword:null},
      flag: false,
      deleteConfirmShow:false
    };
  }
  

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
  handleClick = (event, id) => {
    const {selected} = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({selected: newSelected});
  };
  handleChangePage = (event, page) => {
    this.setState({page});
  };
  handleChangeRowsPerPage = event => {
    this.setState({rowsPerPage: event.target.value});
  };
  isSelected = id => this.state.selected.indexOf(id) !== -1;


  orderToVendorDetailList = (event, orderToVendor) => {
 
    event.preventDefault();

    if(orderToVendor !== undefined) {

      this.props.getOrderToVendorDetailList(orderToVendor);
    }
    
    this.setState({open : true});
  }
  
  handleRequestClose = () => {
    this.setState({open : false});
  }

  updateOrderToVendorList = ( orderToVendor) => {
   
 
    if(orderToVendor !== undefined){
     
      this.props.updateOrderToVendorCode(orderToVendor);
    
      this.setState({
        ...this.state , 
        data:this.props.OrderToVendorList   });
    }
  }

  handleOrderToVendorOpen =(event, row) => {
    this.setState({
      deleteConfirmShow:true,
      orderToVendor:row
      })

  }

  onConfirmDelete = () => {
    this.updateOrderToVendorList(this.state.orderToVendor)
    this.setState({
      ...this.state,
    deleteConfirmShow:false,
    orderToVendor:null
    })
}

onCancelDelete = () => {
    this.setState({
    deleteConfirmShow:false,
    orderToVendor:null
    })
}
  
  render() {

    const {data, order, orderBy, selected, rowsPerPage, page} = this.state;
    const { OrderToVendorList  } = this.props;
    
    if(this.props.OrderToVendorList !== this.state.data){
      this.setState({data:OrderToVendorList});
    }

    return (
      <div>
        <EnhancedTableToolbar numSelected={selected.length}/>  
        <div className="flex-auto">
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
                {data && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  console.log("page::"+page+" rowsPerPage :: "+rowsPerPage+" index :: "+index+" data.length ::"+data.length);
                  const isSelected = this.isSelected(page*rowsPerPage+index);
                  return (
                  
                    <TableRow
                      hover
                      onKeyDown={event => this.handleKeyDown(event, page*rowsPerPage+index)}
                     
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={page*rowsPerPage+index}
                      selected={isSelected}
                    >
                      <TableCell align="left" ><span onClick={event => this.orderToVendorDetailList(event, row)} style={{cursor:'pointer'}}>{row.orderToVendorNo}</span></TableCell>
                      <TableCell align="left">{row.totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</TableCell> 
                      <TableCell align="left">{row.orderToVendorDate}</TableCell>
                    
                      <TableCell align="left">{row.orderToVenStatusCodeName }
                      <b>
                        {row.orderToVenStatusCodeNo == '01' ?
                         <span onClick=
                         {event => {event.preventDefault(); 
                          this.handleOrderToVendorOpen(event, row)}} style={{cursor:'pointer', color:'red'}}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Delete/>발주취소</span>
                        // {event => this.updateOrderToVendorList(event, row)} style={{cursor:'pointer', color:'red'}}>                     
                        //  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        // <Delete/>발주취소 </span> 
                        : null}
                        </b>
                      </TableCell>
                     
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    count={data && data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>

            { this.props.OrderToVendorDetatilList && (<GetOrderToVendorDetailList
              open={ this.state.open }
              handleRequestClose={ this.handleRequestClose }
              OrderToVendorDetatilList={ this.props.OrderToVendorDetatilList }
            />)}
          </div>
        </div>
        <SweetAlert show={this.state.deleteConfirmShow}
                    warning
                    showCancel
                    cancelBtnText="네"
                    confirmBtnText="아니오"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title={"발주취소를 하시겠습니까?"}

                    onCancel={this.onConfirmDelete}
                    onConfirm={this.onCancelDelete}
                ></SweetAlert>
      </div>
    );
  }
}
const mapStateToProps = ({productionManagement}) => {
  const { OrderToVendorList , OrderToVendorDetatilList } = productionManagement;
  return { OrderToVendorList , OrderToVendorDetatilList };
}


export default connect(mapStateToProps, { getOrderToVendorList , getOrderToVendorDetailList, updateOrderToVendorCode})(EnhancedTable);

