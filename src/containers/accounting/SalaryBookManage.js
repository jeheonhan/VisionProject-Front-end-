import React from 'react';
import { connect } from 'react-redux';
import { getAnalyzeSalaryBookList } from "actions/index";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import {Pie, PieChart, ResponsiveContainer, Tooltip} from 'recharts';
import Avatar from '@material-ui/core/Avatar';

class SalaryBookManage extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      analizeOpen : false
    }
  }

  //급여대장 분석창 열기
  analizeDialogOpen = () => {
    this.setState({
      analizeOpen : true
    })
  }

  //급여대장 분석창 닫기
  analizeDialogClose = () => {
    this.setState({
      analizeOpen : false
    })
  }

  //급여대장 분석창 클릭시 이벤트
  analize(event, getSalaryDate){
    event.preventDefault();
    var findText = getSalaryDate.indexOf("/");
    var pureSalaryDate = getSalaryDate.substring(0,findText) + getSalaryDate.substring(findText+1, getSalaryDate.length);
    this.props.getAnalyzeSalaryBookList(pureSalaryDate);
    this.analizeDialogOpen();
  }
  
  render(){

  //급여대장 분석창 Tooltip
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const { styleName, salaryBook } = this.props;
  const {salaryDate, salaryBookName, totalSalary, totalEmpolyeeNumber, totalRegularWorkTime, totalExtendWorkTime, avgWage } = salaryBook;
  
  let reviseDepartSalary = [];
  let reviseRankSalary = [];

  if(this.props.analyzeSalaryBookList !== undefined){
    this.props.analyzeSalaryBookList[0].map((data) => {
      reviseDepartSalary.push({name: data.departCodeName, value:Number(data.totalSalary)})
    })
  }

  if(this.props.analyzeSalaryBookList !== undefined){
    this.props.analyzeSalaryBookList[1].map((data) => {
      reviseRankSalary.push({name: data.rankCodeName, value:Number(data.totalSalary)})
    })
  }
  
    return (

      <div className={`timeline-item ${styleName}`}>
        <div className="timeline-badge timeline-img">
          <span onClick={ event => this.analize(event, salaryDate) } style={{cursor:'pointer'}}>
            <img className="size-60" src={require("assets/images/moneybag.png")} alt="Pentagon" title="급여분석"/>
          </span>
        </div>

        <div className="timeline-panel">
          <div className="timeline-panel-scroll">

            <div className="timeline-panel-header">
              <div className="timeline-header-img timeline-left">
              <Avatar alt='...' className="user-avatar" style={{backgroundColor:'#cc4f3a'}}>
                {Number(salaryDate.substring(5,7))}월
              </Avatar>
              </div>
              <div className="timeline-heading">
                <h3 className="timeline-title">{salaryBookName}</h3>
              </div>
            </div>
            {/* end of header */}
            <div className="timeline-body">
              <span className="timeline-left" style={{paddingLeft:"200"}}>
                <div>
                  <p className="card-text">직원수 : {totalEmpolyeeNumber} 명 </p>
                </div>
                <div>
                  <p className="card-text">평균 시급 : {avgWage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원 </p>
                </div>
              </span>
              <span>
                <div>
                  <p className="card-text">총 소정근로시간(분) : {totalRegularWorkTime}</p>
                </div>
                <div>
                  <p className="card-text">총 연장근로시간(분) : {totalExtendWorkTime}</p>
                </div>
                <p/>
              </span>
              <div>
                <p className="card-text">총 급여지출 : {totalSalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원 </p>
              </div>
            </div>
            {/* end of body */}
          </div>
        </div>
        {/* end of timeline panel */}

      <Dialog open={this.state.analizeOpen} onClose={this.analizeDialogClose}>
        <DialogTitle>
          {salaryBookName} 분석
        </DialogTitle>
        <DialogContent style={{maxWidth:"400px", minWidth:"400px", maxHeight:"350px", minHeight:"350px"}}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={reviseDepartSalary} 
                   outerRadius={60} 
                   fill="#3367d6"
                   labelLine={false}
                   label={renderCustomizedLabel}
              />
              <Pie data={reviseRankSalary} 
                   innerRadius={70} 
                   outerRadius={90} 
                   fill="#ffc658"
                   label
              />
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        </DialogContent>
        
      </Dialog>
      </div>
      

    )
  }
};

SalaryBookManage.propTypes = {
  dataKey: PropTypes.node,
};

const mapStateToProps = ({ accounting }) => {
  const { analyzeSalaryBookList } = accounting;
  return { analyzeSalaryBookList }
}

export default connect(mapStateToProps, { getAnalyzeSalaryBookList })(SalaryBookManage);