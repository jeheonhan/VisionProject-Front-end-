import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import BoxProceed from './BoxProceed';
import BoxWaiting from './BoxWaiting';
import BoxReject from './BoxReject';
import BoxComplete from './BoxComplete';
import { getApprovalList } from 'actions/Approval'
import { connect } from 'react-redux';

function TabContainer({children, dir}) {
  return (
    <div dir={dir} style={{padding:"1px"}}>
      {children}
    </div>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

class FullWidthTabs extends Component {
  state = {
    value: 0,
    searchCondition : "1"
  };

  handleChange = (event, value) => {
    this.setState({value});
  };

  handleChangeIndex = index => {
    this.setState({value: index});
  };

  handleSearch = (_searchCondition) => {
    this.props.getApprovalList({
      searchCondition:_searchCondition,
      searchKeyword:JSON.parse(localStorage.getItem("user")).employeeNo
    });
  }

  render() {
    const {theme} = this.props;
    return (
      <div className="w-100">
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            scrollButtons="on"
          >
            <Tab className="tab" onClick={() => this.handleSearch("2")} label="진행결재함" />
            <Tab className="tab" onClick={() => this.handleSearch("1")} label="대기결재함" />
            <Tab className="tab" onClick={() => this.handleSearch("3")} label="반려결재함" />
            <Tab className="tab" onClick={() => this.handleSearch("4")} label="완료결재함" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}><BoxProceed></BoxProceed></TabContainer>
          <TabContainer dir={theme.direction}><BoxWaiting></BoxWaiting></TabContainer>
          <TabContainer dir={theme.direction}><BoxReject></BoxReject></TabContainer>
          <TabContainer dir={theme.direction}><BoxComplete></BoxComplete></TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

FullWidthTabs.propTypes = {
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = ({ approval }) => {
  const { approvalList } = approval;
  return { approvalList }
}

export default connect(mapStateToProps, {getApprovalList})(withStyles(null, {withTheme: true}) (FullWidthTabs));