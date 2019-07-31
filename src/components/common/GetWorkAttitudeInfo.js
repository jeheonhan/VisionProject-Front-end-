import React from "react";
import Widget from "components/Widget";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const GetWorkAttitudeInfo = (props) => {


const { workAttitudeList } = props;

  return (
    <Widget styleName="jr-card-profile">
      <div className="mb-3">
        <h3 className="card-title mb-2 mb-md-3">근태정보</h3>
        <p className="text-grey jr-fs-sm mb-0">현재 나의 근태정보를 조회합니다.</p>
      </div>
      <div className="table-responsive-material">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>근태번호</TableCell>
            <TableCell align="left">근태코드</TableCell>
            <TableCell align="left">근태명</TableCell>
            <TableCell align="left">시간(분)</TableCell>
            <TableCell align="left">기준일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workAttitudeList && workAttitudeList.map(n => {
            return (
              <TableRow key={n.workAttitudeNo}>
                <TableCell>{n.workAttitudeNo}</TableCell>
                <TableCell align="left">{n.workAttitudeCodeNo}</TableCell>
                <TableCell align="left">{n.workAttitudeCodeName}</TableCell>
                <TableCell align="left">{n.workAttitudeTime}</TableCell>
                <TableCell align="left">{n.workAttitudeDate}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>

    </Widget>
  )
}


export default GetWorkAttitudeInfo;
