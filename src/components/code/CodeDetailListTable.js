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
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { connect } from 'react-redux';
import { convertCodeUsageStatus, checkDuplicateCodeName, convertCodeUsageStatusList } from 'actions';
import UpdateCode from './UpdateCode';
import SweetAlert from 'react-bootstrap-sweetalert'


let counter = 0;


//칼럼명 지어주는 곳
//label에 쓰는 단어가 화면에 표시
const columnData = [
  
  {id: 'codeNo', align: true, disablePadding: false, label: '코드번호'},
  {id: 'codeName', align: true, disablePadding: false, label: '코드명'},
  {id: 'groupCode', align: false, disablePadding: false, label: '그룹코드'},
  {id: 'groupCodeName', align: false, disablePadding: false, label: '그룹코드명'},
  {id: 'codeUsageStatus', align:false, disablePadding: false, label : '사용상태'}
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
        <TableCell padding="checkbox">
            <Checkbox color="primary"
                      indeterminate={numSelected > 0 && numSelected < rowCount}
                      checked={numSelected === rowCount}
                      onChange={onSelectAllClick}
            />
          </TableCell>
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

      <div className="title">
        {numSelected > 0 ? (
          <Typography variant="subheading">{numSelected} 선택</Typography>
        ) : (
          <Typography variant="title">코드조회</Typography>
        )}
      </div>
      <div className="spacer"/>
      <div className="actions">
      {numSelected > 0 ? (
          // 툴팁 내용
          <Tooltip title="영구삭제" onClick={props.handleDeleteCodeEver}>
            <IconButton aria-label="삭제">
              <DeleteIcon/>
            </IconButton>
          </Tooltip>
        ) : ""}
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

  handleClickUsage = (event, _row) =>{
    event.preventDefault();
    const message = _row.codeUsageStatus==='Y'? '삭제' : '복구'
    this.setState({
      row:_row,
      warning:true,
      warningText:"코드를 "+message+"하시겠습니까?"
    })
  }

  //warning에서 확인했을 때 
  deleteCode = () => {
    const _usage = this.state.row.codeUsageStatus==='Y'? 'N' : 'Y'
      this.props.convertCodeUsageStatus({ groupCode: this.state.row.groupCode,
          groupCodeName : this.state.row.groupCodeName,
          codeNo : this.state.row.codeNo,
          codeName : this.state.row.codeName,
          codeUsageStatus : _usage
        })

    this.setState({
      warning:false,
      warningText:""
    })
  }

  //warning에서 취소했을 때
  onCancelDelete = () => {
    this.setState({
      warning:false,
      warningText:"",
      deleteConfirmShow:false
    })
  }

  handleTargetCode = (event) => {
    event.preventDefault();
    this.props.checkDuplicateCodeName({...this.state.targetCode, codeName: event.target.value})
    this.setState({
      targetCode : {
        ...this.state.targetCode,
        codeName: event.target.value
      }
    })
  }

  handleCloseUpdate = () =>{
    this.setState({
      open: false
    })
  }

  //코드번호 클릭시 코드 수정창 띄우기
  handleClickCodeNo = (event, row) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      open: true,
      targetCode: row
    })
  }

  constructor(props, context) {
    super(props, context);
    
    this.state = {
      order: 'desc',
      orderBy: 'codeNo',
      selected: [],
      // data에 props로 들어오는 list값 넣어주기.
      data: this.props.codeList.sort((a, b) => (b["codeNo"] < a["codeNo"] ? -1 : 1)),
      page: 0,
      rowsPerPage: 10,
      targetCode: {
        groupCode:"",
        groupCodeName:"",
        codeNo:"",
        codeName:""
      },
      warning:false,
      deleteConfirmShow:false
    };
  }

  //영구삭제 확인창 띄우기
  handleDeleteCodeEver = () => {
    this.setState({
      deleteConfirmShow:true
    })
  }

    //영구삭제 Confirm 확인
    onConfirmDelete = () => {
      let list = [];
      this.state.selected.map((s) => {
        list.push({
          groupCode:this.state.data[0].groupCode,
          codeNo:s,
          codeUsageStatus:'D'
        })
        console.log("fffffffffffffff + ", {
          groupCode:this.state.data[0].groupCode,
          codeNo:s,
          codeUsageStatus:'D'
        })
      })
      console.log("eeeeeeeeeeeeee + ", list)
      this.props.convertCodeUsageStatusList(list)
      this.setState({
        deleteConfirmShow:false,
        selected:[]
      })
    }

  render() {
    const {data, order, orderBy, selected, rowsPerPage, page} = this.state;

    const { codeList } = this.props;

    if(codeList !== this.state.data){
      this.setState({data:codeList})
    }

    return (
      <div>
        {console.log("aaaaaaaa + ", this.state.selected)}
        <EnhancedTableToolbar numSelected={selected.length} handleDeleteCodeEver={this.handleDeleteCodeEver}/>
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
                  const isSelected = this.isSelected(row.codeNo);
                  return (
                    // <TableRow
                    //   hover
                    //   onKeyDown={event => this.handleKeyDown(event, page*rowsPerPage+index)}
                    //   role="checkbox"
                    //   aria-checked={isSelected}
                    //   tabIndex={-1}
                    //   key={page*rowsPerPage+index}
                    //   selected={isSelected}
                    // >
                    <TableRow
                      hover
                      onKeyDown={event => this.handleKeyDown(row.codeNo)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={row.codeNo}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox color="primary" checked={isSelected} 
                                  onClick={event => this.handleClick(event, row.codeNo)}/>
                      </TableCell>
                      <TableCell align="left" >
                      <Tooltip
                        title={"수정"}
                        placement={'bottom-start'}
                        enterDelay={300}
                      >
                        <span style={{cursor:'pointer'}} onClick={event => this.handleClickCodeNo(event, row)}>
                          {row.codeNo}
                        </span>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="left">
                      <Tooltip
                        title={"수정"}
                        placement={'bottom-start'}
                        enterDelay={300}
                      >
                        <span style={{cursor:'pointer'}} onClick={event => this.handleClickCodeNo(event, row)}>
                          {row.codeName}
                        </span>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="left" >{row.groupCode}</TableCell>
                      <TableCell align="left" >{row.groupCodeName}</TableCell>
                      <TableCell align="left">
                      <Tooltip
                        title={row.codeUsageStatus==='Y' ? "삭제" : "복구"}
                        placement={'bottom-start'}
                        enterDelay={300}
                      >
                        <span style={{cursor:'pointer'}} onClick={event => this.handleClickUsage(event, row)}>
                          {row.codeUsageStatus==='Y' ? "사용중" : "삭제됨"}
                        </span>
                        </Tooltip>
                      </TableCell>
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
        <UpdateCode 
          open = {this.state.open} 
          code={this.state.targetCode} 
          action={this.handleCloseUpdate} 
          handleName={this.handleTargetCode}
          codeNameBool = {this.props.CodeNameBool}
        />
        <SweetAlert show={this.state.warning}
                    warning
                    showCancel
                    confirmBtnText={"네"}
                    cancelBtnText={"아니오"}
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title={this.state.warningText}
                    onConfirm={this.deleteCode}
                    onCancel={this.onCancelDelete}
        ></SweetAlert>
        <SweetAlert show={this.state.deleteConfirmShow}
                    warning
                    showCancel
                    confirmBtnText={"네"}
                    cancelBtnText={"아니오"}
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title={"해당 코드를 삭제하시겠습니까?"}
                    onConfirm={this.onConfirmDelete}
                    onCancel={this.onCancelDelete}
        >영구삭제된 코드는 복구할 수 없습니다.</SweetAlert>
      </div>
    );
  }
}

const mapStateToProps = ({ code }) => {
  const { codeList, CodeNameBool } = code;
  return {codeList, CodeNameBool};
}

export default connect(mapStateToProps, {convertCodeUsageStatus, checkDuplicateCodeName, convertCodeUsageStatusList})(EnhancedTable);