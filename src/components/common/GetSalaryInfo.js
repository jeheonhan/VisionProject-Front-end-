import React from "react";
import Widget from "components/Widget";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';


const GetSalaryInfo = (props) => {


const { salaryList } = props;

  return (
    <Widget styleName="jr-card-profile">
      <div className="mb-3">
        <h3 className="card-title mb-2 mb-md-3">급여정보</h3>
        <p className="text-grey jr-fs-sm mb-0">현재 나의 급여정보를 조회합니다.</p>
      </div>
      <div className="table-responsive-material">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>급여월</TableCell>
            <TableCell align="left">소정근로시간</TableCell>
            <TableCell align="left">연장근로시간</TableCell>
            <TableCell align="left">시급</TableCell>
            <TableCell align="left">급여상태</TableCell>
            <TableCell align="left">개인지급총액</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {salaryList && salaryList.map(n => {
            return (
              <TableRow key={n.salaryNumbering}>
                <TableCell>{n.salaryDate}</TableCell>
                <TableCell align="left">{n.totalRegularWorkTime} 분</TableCell>
                <TableCell align="left">{n.totalExtendWorkTime} 분</TableCell>
                <TableCell align="left">{n.wage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</TableCell>
                <TableCell align="left">{n.salaryStatusCodeName}</TableCell>
                <TableCell align="left">{n.individualTotalSalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>

    </Widget>
  )
}




const columnData = [
  {id: 'salaryDate', align: false, disablePadding: true, label: '급여월'},
  {id: 'totalRegularWorkTime', align: true, disablePadding: false, label: '소정근로시간'},
  {id: 'totalExtendWorkTime', align: true, disablePadding: false, label: '연장근로시간'},
  {id: 'wage', align: true, disablePadding: false, label: '시급'},
  {id: 'salaryStatusCodeName', align: true, disablePadding: false, label: '급여상태'},
  {id: 'individualTotalSalary', align: true, disablePadding: false, label: '개인지급총액'},
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
  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({selected: this.state.data.map(n => n.id)});
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

  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'asc',
      orderBy: 'calories',
      selected: [],
      data: this.props.salaryList.sort((a, b) => (a.calories < b.calories ? -1 : 1)),
      page: 0,
      rowsPerPage: 5,
    };
  }

  render() {
    const {data, order, orderBy, selected, rowsPerPage, page} = this.state;

    return (
      <Widget styleName="jr-card-profile">
       <div className="mb-3">
        <h3 className="card-title mb-2 mb-md-3">급여정보</h3>
        <p className="text-grey jr-fs-sm mb-0">현재 나의 급여정보를 조회합니다.</p>
      </div>
      <div className="table-responsive-material">
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
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                  const isSelected = this.isSelected(n.salaryNumbering);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.salaryNumbering)}
                      onKeyDown={event => this.handleKeyDown(event, n.salaryNumbering)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.salaryNumbering}
                      selected={isSelected}
                    >

                    <TableCell align="left">{n.salaryDate}</TableCell>
                    <TableCell align="left">{n.totalRegularWorkTime} 분</TableCell>
                    <TableCell align="left">{n.totalExtendWorkTime} 분</TableCell>
                    <TableCell align="left">{n.wage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</TableCell>
                    <TableCell align="left">{n.salaryStatusCodeName}</TableCell>
                    <TableCell align="left">{n.individualTotalSalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</TableCell>
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
      </div>
      </Widget>
    );
  }
}

export default EnhancedTable;