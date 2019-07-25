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
import { getApprovalList, deleteApprovalForm, getApprovalDetail } from 'actions/Approval'
import Tooltip from '@material-ui/core/Tooltip';
import { connect } from 'react-redux';
import ApprovalDetail from 'components/approval/ApprovalDetail'
import {Clear} from '@material-ui/icons'

//칼럼명 지어주는 곳
//label에 쓰는 단어가 화면에 표시
const columnData = [
  
  {id: 'approvalNo', align: true, disablePadding: false, label: '결재번호'},
  {id: 'approvalTitle', align: true, disablePadding: false, label: '결재서제목'},
  {id: 'submitDate', align: false, disablePadding: false, label: '작성일자'},
  {id: 'percentage', align: false, disablePadding: false, label: '진행상태'},
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

  handleKeyDown = (event, id) => {
    if (keycode(event) === 'space') {
      this.handleClick(event, id);
    }
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
    if(window.confirm("선택한 결재서류를 상신 취소하시겠습니까? 취소한 결재서류는 반려결재함으로 이동됩니다.")){
      //this.props.deleteApprovalForm(data);
    }
  }


  //결재번호 클릭 시 상세조회 띄우기
  handleClickApprovalFormNo = (event, row) => {
    event.preventDefault();
    this.props.getApprovalDetail(row.approvalNo);
    this.setState({
      ...this.state,
      open: true,
      // targetForm: "",
      // targetApproval:this.props.approvalDetail
    })
  }

  //결재상세창 닫기
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
      orderBy: 'approvalNo',
      selected: [],
      // data에 props로 들어오는 list값 넣어주기.
      data: this.props.approvalList,
      page: 0,
      rowsPerPage: 10,
      targetApproval : {
           approvalTitle:""
          ,approvalContent:""
          ,firstApprover:{
                      approverNumbering:null
                  ,approvalNo:null
                  ,employeeNo:null
                  ,signatureImage:""
                  ,rankCodeName:""
                  ,employeeName:""
                  ,ordinal:0
                  ,approvalStatus:1
              }
          ,secondApprover:{
                  approverNumbering:null
                      ,approvalNo:null
                      ,employeeNo:null
                      ,signatureImage:""
                      ,rankCodeName:""
                      ,ordinal:1
                      ,approvalStatus:0
                      }
          ,thirdApprover:{
                      approverNumbering:null
                        ,approvalNo:null
                        ,employeeNo:null
                        ,signatureImage:""
                        ,rankCodeName:""
                        ,ordinal:2
                        ,approvalStatus:0
                    }
          ,fourthApprover:{
                          approverNumbering:null
                          ,approvalNo:null
                          ,employeeNo:null
                          ,signatureImage:""
                          ,rankCodeName:""
                          ,ordinal:3
                          ,approvalStatus:0
                      }
          ,fifthApprover:{
                          approverNumbering:null
                          ,approvalNo:null
                          ,employeeNo:null
                          ,signatureImage:""
                          ,rankCodeName:""
                          ,ordinal:4
                          ,approvalStatus:0
                      }
          ,totalApproverCount:""
        }
    };
  }

  render() {
    const {data, order, orderBy, selected, rowsPerPage, page} = this.state;

    const { approvalList, approvalDetail } = this.props;

    if(approvalList !== this.state.data){
      this.setState({data:approvalList})
    }else{
    }
    if(approvalDetail !== this.state.targetApproval){
      if(approvalDetail!==undefined){
        this.setState({targetApproval : approvalDetail})
      }else{
      }
    }

    return (
      <div className="jr-card" style={{marginTop:"5px"}}> 
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
                  const percentage = Math.floor((row.approverCount/row.totalApproverCount)*100)+"%";
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
                          {row.approvalNo}
                        </span>
                      </TableCell>
                      <TableCell align="left">
                        <span style={{cursor:'pointer'}} onClick={event => this.handleClickApprovalFormNo(event, row)}>
                          {row.approvalTitle}
                        </span>
                      </TableCell>
                      <TableCell align="left" >{row.submitDate}</TableCell>
                      <TableCell align="left" >{percentage}</TableCell>
                      
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
        <ApprovalDetail 
          approvalDetail = {this.state.targetApproval}
          open={this.state.open} 
          handleClose={this.handleClose}/>
          
      </div>
    );
  }
}

const mapStateToProps = ({ approval }) => {
    const { approvalList , approvalDetail} = approval;
    return { approvalList, approvalDetail }
}

export default connect(mapStateToProps, {getApprovalList, deleteApprovalForm, getApprovalDetail})(EnhancedTable);