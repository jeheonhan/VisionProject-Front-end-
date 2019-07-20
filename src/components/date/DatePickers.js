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
    //DatePicker에 props로 labe="" 으로 값을 줘야함 (재사용성)
    return (
      <div key="basic_day" className="picker" >
        <DatePicker
          label={this.props.label}
          margin="normal"
          format={'YYYY/MM/DD'}
          value={selectedDate}
          onChange={this.handleDateChange}
          animateYearScrolling={false}
          leftArrowIcon={<i className="zmdi zmdi-arrow-back"/>}
          rightArrowIcon={<i className="zmdi zmdi-arrow-forward"/>}
        />
      </div>
    )

  }
}