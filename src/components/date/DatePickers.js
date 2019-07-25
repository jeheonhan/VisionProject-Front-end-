import React, {Component} from 'react';
import moment from 'moment';
import {DatePicker} from 'material-ui-pickers';

export default class DatePickers extends Component {
  state = {
    selectedDate: moment().format('YYYY/MM/DD'),
  };

  handleDateChange = (date) => {
    this.setState({selectedDate: date.format('YYYY/MM/DD')});
    this.props.callBackDateChange(date.format('YYYY/MM/DD'));
  };


  render() {
    const {selectedDate} = this.state;
    const { disabled } = this.props;

    //props로 전달되는 date값이 있을 경우 전달된 date를 나타내고, 만약 없으면 현재 날짜로 처리됨
    if(this.props.value && this.props.value !== this.state.selectedDate){
      console.log("date :: "+this.props.value)
      this.setState({selectedDate:this.props.value})
    }

    //DatePicker에 props로 labe="" 으로 값을 줘야함 (재사용성)
    //read only를 사용하고 싶으면 props로 disabled로 boolean값을 true로 보내줘야함
    return (
      // <div key="basic_day" className="picker" >
        <DatePicker
          fullWidth
          label={this.props.label}
          margin="normal"
          format={'YYYY/MM/DD'}
          value={selectedDate}
          onChange={this.handleDateChange}
          animateYearScrolling={false}
          leftArrowIcon={<i className="zmdi zmdi-arrow-back"/>}
          rightArrowIcon={<i className="zmdi zmdi-arrow-forward"/>}
          disabled={disabled}
        />
      // </div>
    )

  }
}