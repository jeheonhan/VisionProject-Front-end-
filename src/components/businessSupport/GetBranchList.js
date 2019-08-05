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
import { connect } from 'react-redux';
import { getBranchList, getBranchDetail, cleanStoreState } from 'actions/index';
import GetBranchDetail from './GetBranchDetail';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import UpdateBranch from 'components/businessSupport/UpdateBranch';


const columnData = [
    {id: 'branchName', align: true, disablePadding: false, label: '지점명'},
    {id: 'localCodeName', align: true, disablePadding: false, label: '지역'},
    {id: 'address', align: true, disablePadding: false, label: '주소'},
    //{id: 'branchTel', align: true, disablePadding: false, label: '전화번호'},
    {id: 'branchRegDate', align: true, disablePadding: false, label: '등록일자'}, 
    {id: 'branchStatus', align: true, disablePadding: false, label: '영업상태'}, 
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
              <Checkbox color="secondary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount!==0 && numSelected === rowCount}
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
            <Typography variant="title">지점 목록조회</Typography>
          )}
        </div>
        <div className="spacer"/>
        {/* <div className="actions">
          {numSelected > 0 ? (
            // 툴팁 내용
            <Tooltip title="수정">
              <IconButton aria-label="수정">
                <DeleteIcon/>
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list" onClick={props.handleClick}>
                <FilterListIcon/>
              </IconButton>
            </Tooltip>
          )}
        </div> */}
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

    getBranch = (event, branchNo) => {
      event.preventDefault();
      if(branchNo !== undefined) {
        this.props.getBranchDetail(branchNo);
      }
      this.setState({open : true});
    }

    handleRequestClose = () => {
      this.setState({open : false});
    }

    updateBranchOpen = () => {
      this.setState({updateOpen : true});
      this.handleRequestClose();
    }

    updateBranchClose = () => {
      this.props.cleanStoreState('branch');
      this.setState({updateOpen : false});
    }

    updateBranch = ( branch ) => {
      this.props.updateBranch(branch);
      this.setState({updateOpen : false});
    }
  
    constructor(props, context) {
      super(props, context);
  
      this.state = {
        order: 'asc',
        orderBy: '',
        selected: [],
        // data에 props로 들어오는 list값 넣어주기.
        data: this.props.branchList.sort((a, b) => (a.calories < b.calories ? -1 : 1)),
        page: 0,
        rowsPerPage: 10,
        anchorEl: undefined,
        open: false,
        updateOpen: false,
      };
    }

    handleClickFilter = event => {
      this.setState({filteropen: true, anchorEl: event.currentTarget});
    };
  
    handleRequestCloseFilter = (event, option) => {
      event.preventDefault();
      if(option!=="backdropClick")  {option!=="전체" ? this.props.getBranchList({searchCondition:"2", searchKeyword:option.localCodeNo}) 
                                            : this.props.getBranchList({searchCondition:null})}
      this.setState({filteropen: false});
    };

    options = this.props.localList;
  
    render() {
      const {data, order, orderBy, selected, rowsPerPage, page} = this.state;

      if(this.props.branchList!==this.state.data){
        this.setState({
          data: this.props.branchList
        })
      }
  
      return (
        <div>

          <Menu
          id="long-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.filteropen}
          onClose={this.handleRequestCloseFilter}
          MenuListProps={{
            style: {
              width: 200,
            },
          }}
        >
          <MenuItem onClick={(event) => this.handleRequestCloseFilter(event, "전체")}>
              전체
            </MenuItem>,
          {this.options.map(option =>
            <MenuItem key={option.localCodeNo} onClick={(event) => this.handleRequestCloseFilter(event, option)}>
              {option.localCodeName}
            </MenuItem>,
          )}
        </Menu>

          <EnhancedTableToolbar numSelected={selected.length} handleClick={this.handleClickFilter}/>
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
                    //console.log("page::"+page+" rowsPerPage :: "+rowsPerPage+" index :: "+index+" data.length ::"+data.length);
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
                        //className={row.branchStatusCodeNo == '01' ? "" : "bg-grey"}
                      >
                        {/* <TableCell padding="checkbox">
                          <Checkbox color="secondary" checked={isSelected} 
                                    onClick={event => this.handleClick(event, page*rowsPerPage+index)}/>
                        </TableCell> */}
                        <TableCell align="left" ><span onClick={ event => this.getBranch(event, row.branchNo)} style={{cursor:'pointer'}}>{row.branchName}</span></TableCell>
                        <TableCell align="left">{row.localCodeName}</TableCell>
                        <TableCell align="left">{row.address}</TableCell>
                        {/* <TableCell align="left">{row.branchTel}</TableCell> */}
                        <TableCell align="left">{row.branchRegDate}</TableCell>
                        <TableCell align="left">{row.branchStatusCodeNo == '01' ? <i class="zmdi zmdi-check zmdi-hc-2x"></i> : <i class="zmdi zmdi-close zmdi-hc-2x"></i>}</TableCell>
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

              { this.props.branch && (<GetBranchDetail
              open={ this.state.open }
              handleRequestClose={ this.handleRequestClose }
              updateBranchOpen={this.updateBranchOpen}
              branch={ this.props.branch }
            />)}

              <UpdateBranch
                open={this.state.updateOpen}
                updateBranchClose={this.updateBranchClose}
                _branch={this.props.branch}
                localList={this.props.localList}
                />

            </div>
          </div>
        </div>
      );
    }
  }
  
  const mapStateToProps = ({ businessSupport }) => {
    const { branchList, branch, localList } = businessSupport;
    return { branchList, branch, localList };
}

export default connect(mapStateToProps, { getBranchList, getBranchDetail, cleanStoreState })(EnhancedTable);