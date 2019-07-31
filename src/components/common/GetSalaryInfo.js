import React from "react";
import Widget from "components/Widget";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


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
                <TableCell align="left">{n.totalRegularWorkTime}</TableCell>
                <TableCell align="left">{n.totalExtendWorkTime}</TableCell>
                <TableCell align="left">{n.wage}</TableCell>
                <TableCell align="left">{n.salaryStatusCodeName}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>

    </Widget>
  )
}


export default GetSalaryInfo;
