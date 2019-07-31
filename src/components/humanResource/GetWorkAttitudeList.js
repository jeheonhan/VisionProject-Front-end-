import React from 'react';
import { connect } from 'react-redux';
import { getWorkAttitudeList
        ,checkedWorkAttitude
        ,getSimpleHRCardByEmployeeNo
        ,convertWorkAttitudeUseStatus } from 'actions';
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
import SimpleHRCard from 'components/humanResource/SimpleHRCard';
import SweetAlert from 'react-bootstrap-sweetalert'



//칼럼명 지어주는 곳
//label에 쓰는 단어가 화면에 표시
const columnData = [
  {id: 'workAttitudeNo', align: false, disablePadding: false, label: '근태번호'},
  {id: 'employeeNo', align: false, disablePadding: false, label: '사원번호'},
  {id: 'employeeName', align: true, disablePadding: false, label: '사원명'},
  {id: 'workAttitudeCodeNo', align: true, disablePadding: false, label: '근태코드'},
  {id: 'workAttitudeCodeName', align: true, disablePadding: false, label: '근태명칭'},
  {id: 'workAttitudeTime', align: true, disablePadding: false, label: '시간(분)'},
  {id: 'workAttitudeDate', align: true, disablePadding: false, label: '기준일'},
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
        {/* 상단 툴바
            체크가 되면 selected로 변경됨 */}
      <div className="title">
        {numSelected > 0 ? (
          <Typography variant="subheading">{numSelected} 선택</Typography>
        ) : (
          <Typography variant="title">근태 목록조회</Typography>
        )}
      </div>
      <div className="spacer"/>
      <div className="actions">
        {numSelected > 0 ? (
          // 툴팁 내용
          <Tooltip title="삭제">
            <IconButton aria-label="삭제" onClick={props.handleDeleteWorkAttitude}>
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

  //근태코드 수정
  handleModifyWorkAttitude = (event, row) => {
    event.preventDefault();
    this.props.checkedWorkAttitude(row);
    this.props.handleModifyOpen();
  }

  //사원번호 클릭시 사원 프로필 보기
  handleClickEmployeeNo = (event, employeeNo) => {
    event.preventDefault();
    this.props.getSimpleHRCardByEmployeeNo(employeeNo);
    this.handleSimpleHRCardOpen();
  }

  //사원 프로필 화면 열기
  handleSimpleHRCardOpen = () => {
    this.setState({
      simpleCardOpen:true
    })
  }

  //사원 프로필 화면 닫기
  handleSimpleHRCardClose = () => {
    this.setState({
      simpleCardOpen:false
    })
  }

  //근태 삭제 Confirm 열기
  handleDeleteWorkAttitude = () => {
    this.setState({
      deleteConfirmShow:true
    })
    //this.props.convertWorkAttitudeUseStatus(this.state.selected);
  }

  //근태 삭제 Confirm 확인
  onConfirmDelete = () => {
    this.props.convertWorkAttitudeUseStatus(this.state.selected);
    this.setState({
      deleteConfirmShow:false,
      selected:[]
    })
  }

  //근태 삭제 Confirm 취소
  onCancelDelete = () => {
    this.setState({
      deleteConfirmShow:false
    })
  }


  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'asc',
      orderBy: '',
      selected: [],
      // data에 props로 들어오는 list값 넣어주기.
      data: this.props.workAttitudeList,
      page: 0,
      rowsPerPage: 10,
      search:{searchKeyword:null},
      flag: false,
      composeMail:false,
      simpleCardOpen:false,
      deleteConfirmShow:false
    };
  }

  render() {
    console.log(this.state.selected);
   
    const {data, order, orderBy, selected, rowsPerPage, page} = this.state;

    const { workAttitudeList } = this.props;

    if(workAttitudeList == undefined){
      this.props.getWorkAttitudeList(this.state.search)
    }

    if(workAttitudeList !== this.state.data){
      this.setState({data:workAttitudeList});
    }


    return (
      <div>
        <EnhancedTableToolbar
         numSelected={selected.length}
         handleDeleteWorkAttitude={this.handleDeleteWorkAttitude}
        />
        <div className="flex-auto">
          <div className="table-responsive-material">
            <Table>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={data && data.length}
              />
              <TableBody>
                
                {/* props로 받은 list값을 페이지에 맞게 잘라서 map()을 사용함 */}
                {data && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  // const isSelected = this.isSelected(page*rowsPerPage+index);
                  const isSelected = this.isSelected(row.workAttitudeNo);
                  return (
                    <TableRow
                      hover
                      //onKeyDown={event => this.handleKeyDown(event, page*rowsPerPage+index)}
                      onKeyDown={event => this.handleKeyDown(event, row.workAttitudeNo)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      //key={page*rowsPerPage+index}
                      key={row.workAttitudeNo}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox color="primary" checked={isSelected} 
                                  onClick={event => this.handleClick(event, row.workAttitudeNo)}/>
                      </TableCell>
                      <TableCell align="left" onClick={event => {this.handleModifyWorkAttitude(event, row)}} style={{cursor:'pointer'}}>
                        <span  >
                          {row.workAttitudeNo}
                        </span>
                      </TableCell>
                      <TableCell align="left">
                        <span style={{cursor:'pointer'}} onClick={event => this.handleClickEmployeeNo(event, row.employeeNo)}>
                          {row.employeeNo}
                        </span></TableCell>
                      <TableCell align="left">
                        <span style={{cursor:'pointer'}} onClick={event => this.handleClickEmployeeNo(event, row.employeeNo)}>
                          {row.employeeName}
                        </span></TableCell>
                      <TableCell align="left">{row.workAttitudeCodeNo}</TableCell>
                      <TableCell align="left">{row.workAttitudeCodeName}</TableCell>
                      <TableCell align="left">{row.workAttitudeTime}</TableCell>
                      <TableCell align="left">{row.workAttitudeDate}</TableCell>
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
          </div>
        </div>
        <SimpleHRCard open={this.state.simpleCardOpen} handleSimpleHRCardClose={this.handleSimpleHRCardClose}/>
        <SweetAlert show={this.state.deleteConfirmShow}
                    warning
                    showCancel
                    confirmBtnText={"Yes"}
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title={"해당 근태정보를 삭제하시겠습니까?"}
                    onConfirm={this.onConfirmDelete}
                    onCancel={this.onCancelDelete}
        ></SweetAlert>
      </div>
    );
  }
}
const mapStateToProps = ({ humanResource }) => {
  const { workAttitudeList } = humanResource;
  return { workAttitudeList };
}

export default connect(mapStateToProps, { getWorkAttitudeList, checkedWorkAttitude, getSimpleHRCardByEmployeeNo, convertWorkAttitudeUseStatus })(EnhancedTable);