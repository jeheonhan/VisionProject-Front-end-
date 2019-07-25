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
import { getApprovalFormList, deleteApprovalForm } from 'actions/Approval'
import Tooltip from '@material-ui/core/Tooltip';
import { connect } from 'react-redux';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import ApprovalFormDetail from 'components/approvalForm/ApprovalFormDetail'

//칼럼명 지어주는 곳
//label에 쓰는 단어가 화면에 표시
const columnData = [
  
  {id: 'approvalFormNo', align: true, disablePadding: false, label: '결재번호'},
  {id: 'approvalFormTitle', align: true, disablePadding: false, label: '결재서제목'},
  {id: 'registrantEmployeeName', align: false, disablePadding: false, label: '작성일자'},
  {id: 'useCount', align: false, disablePadding: false, label: '작성자'},
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
          <TableCell>삭제</TableCell>
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
          <Typography variant="title">결재함</Typography>
        )}
      </div>
      <div className="spacer"/>
      <div className="actions">
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};


class EnhancedTable extends React.Component {
  handleRequestSort = (event, property) => {
    console.log("★"+property)
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
      //this.setState({selected: this.state.data.map((row, index) => index)});
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

  //휴지통 클릭 시 삭제
  handleDelete = (event, row) => {
    event.preventDefault();
    const data = {approvalFormNo:row.approvalFormNo, approvalFormUsageStatusCodeNo:"02"}
    if(window.confirm("선택한 결재양식을 삭제하시겠습니까?")){
      this.props.deleteApprovalForm(data);
    }
  }


  //결재양식번호 클릭 시 상세조회 띄우기
  handleClickApprovalFormNo = (event, row) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      open: true,
      targetForm: row
    })
  }

  //결재양식상세창 닫기
  handleClose = (event) => {
    this.setState({
      ...this.state,
      open: false
    })
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'desc',
      orderBy: 'codeNo',
      selected: [],
      // data에 props로 들어오는 list값 넣어주기.
      data: this.props.approvalFormList,
      page: 0,
      rowsPerPage: 10,
      targetForm :{
        approvalFormNo : "",
        approvalFormTitle : "",
        approvalForm : "",
        registrantEmployeeName:"",
        registrantEmployeeNo:"",
      }
    };
  }

  render() {
    const {data, order, orderBy, selected, rowsPerPage, page} = this.state;

    const { approvalFormList } = this.props;

    if(approvalFormList !== this.state.data){
      this.setState({data:approvalFormList})
    }

    return (
      <div className="jr-card" style={{marginTop:"5px"}}> 
        {/* <EnhancedTableToolbar numSelected={selected.length}/> */}
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
                      
                      <TableCell align="left" >
                        <span style={{cursor:'pointer'}} onClick={event => this.handleClickApprovalFormNo(event, row)}>
                          {row.approvalFormNo}
                        </span>
                      </TableCell>
                      <TableCell align="left">
                        <span style={{cursor:'pointer'}} onClick={event => this.handleClickApprovalFormNo(event, row)}>
                          {row.approvalFormTitle}
                        </span>
                      </TableCell>
                      <TableCell align="left" >{row.registrantEmployeeName}</TableCell>
                      <TableCell align="left" >{row.useCount}</TableCell>
                      <TableCell><DeleteOutlinedIcon onClick={event => this.handleDelete(event, row)}/></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
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
        <ApprovalFormDetail 
          targetForm = {this.state.targetForm} 
          open={this.state.open} 
          handleClose={this.handleClose}/>
      </div>
    );
  }
}

const mapStateToProps = ({ approval }) => {
    const { approvalFormList } = approval;
    return { approvalFormList }
}

export default connect(mapStateToProps, {getApprovalFormList, deleteApprovalForm})(EnhancedTable);