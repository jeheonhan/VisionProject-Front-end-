import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import IntlMessages from 'util/IntlMessages';
import CustomScrollbars from 'util/CustomScrollbars';


class SidenavContent extends Component {
  componentDidMount() {
    const {history} = this.props;
    const that = this;
    const pathname = `${history.location.pathname}`;// get current path

    const menuLi = document.getElementsByClassName('menu');
    for (let i = 0; i < menuLi.length; i++) {
      menuLi[i].onclick = function (event) {

        const parentLiEle = that.closest(this, 'li');
        if(menuLi[i].classList.contains('menu') && parentLiEle !== null) {
          event.stopPropagation();

          if(menuLi[i].classList.contains('open')) {
            menuLi[i].classList.remove('open', 'active');
          } else {
            menuLi[i].classList.add('open', 'active');
          }
        } else {
          for (let j = 0; j < menuLi.length; j++) {
            const parentLi = that.closest(this, 'li');
            if (menuLi[j] !== this && (parentLi === null || !parentLi.classList.contains('open'))) {
              menuLi[j].classList.remove('open');
            } else {
              if(menuLi[j].classList.contains('open')) {
                menuLi[j].classList.remove('open');
              } else {
                menuLi[j].classList.add('open');
              }
            }
          }
        }
      }//end of function
    }//end of for

    const activeLi = document.querySelector('a[href="' + pathname + '"]');// select current a element
    try {
      const activeNav = this.closest(activeLi, 'ul'); // select closest ul
      if (activeNav.classList.contains('sub-menu')) {
        this.closest(activeNav, 'li').classList.add('open');
      } else {
        this.closest(activeLi, 'li').classList.add('open');
      }
    } catch (error) {

    }
  }

  componentWillReceiveProps(nextProps) {

    const {history} = nextProps;
    const pathname = `${history.location.pathname}`;// get current path

    const activeLi = document.querySelector('a[href="' + pathname + '"]');// select current a element
    try {
      const activeNav = this.closest(activeLi, 'ul'); // select closest ul
      if (activeNav.classList.contains('sub-menu')) {
        this.closest(activeNav, 'li').classList.add('open');
      } else {
        this.closest(activeLi, 'li').classList.add('open');
      }
    } catch (error) {

    }
  }

  closest(el, selector) {
    try {
      let matchesFn;
      // find vendor prefix
      ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function (fn) {
        if (typeof document.body[fn] === 'function') {
          matchesFn = fn;
          return true;
        }
        return false;
      });

      let parent;

      // traverse parents
      while (el) {
        parent = el.parentElement;
        if (parent && parent[matchesFn](selector)) {
          return parent;
        }
        el = parent;
      }
    } catch (e) {

    }

    return null;
  }

  render() {
    return (
      <CustomScrollbars className=" scrollbar">
        <ul className="nav-menu">

          <li className="nav-header">
            <IntlMessages id="sidebar.main"/>
          </li>

          <li className="menu no-arrow">
            <NavLink className="prepend-icon" to="/app/notice">
              <i className="zmdi zmdi-check-square zmdi-hc-fw"/>
              <span className="nav-text">공지사항</span>
            </NavLink>
          </li>

          <li className="menu collapse-box">
            <Button>
              <i className="zmdi zmdi-view-dashboard zmdi-hc-fw"/>
                <span className="nav-text">인사관리</span>
            </Button>
            <ul className="sub-menu">
              <li>
                <NavLink className="prepend-icon" to="/app/humanResource/humanResourceCard">
                  <span className="nav-text">인사카드관리</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/humanResource/appointment">
                  <span className="nav-text">인사발령관리</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/humanResource/department">
                  <span className="nav-text">부서관리</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/humanResource/workAttitude">
                  <span className="nav-text">근태관리</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/humanResource/workAttitudeCode">
                  <span className="nav-text">근태코드관리</span>
                </NavLink>
              </li>
            </ul>
          </li>

          <li className="menu collapse-box">
            <Button>
              <i className="zmdi zmdi-view-dashboard zmdi-hc-fw"/>
                <span className="nav-text">회계관리</span>
            </Button>
            <ul className="sub-menu">
              <li>
                <NavLink className="prepend-icon" to="/app/accounting/vendor">
                  <span className="nav-text">거래처관리</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/accounting/card">
                  <span className="nav-text">카드관리</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/accounting/account">
                  <span className="nav-text">계좌관리</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/accounting/statement">
                  <span className="nav-text">전표관리</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/accounting/salary">
                  <span className="nav-text">급여관리</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/accounting/salaryBook">
                  <span className="nav-text">급여대장관리</span>
                </NavLink>
              </li>
            </ul>
          </li>

          <li className="menu collapse-box">
            <Button>
              <i className="zmdi zmdi-view-dashboard zmdi-hc-fw"/>
                <span className="nav-text">생산관리</span>
            </Button>
            <ul className="sub-menu">
              <li>
                <NavLink className="prepend-icon" to="/app/productionManagement/product">
                  <span className="nav-text">물품관리</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/productionManagement/orderToVendor">
                  <span className="nav-text">발주관리</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/productionManagement/orderFromBranch">
                  <span className="nav-text">주문관리</span>
                </NavLink>
              </li>
            </ul>
          </li>

          <li className="menu collapse-box">
            <Button>
              <i className="zmdi zmdi-view-dashboard zmdi-hc-fw"/>
                <span className="nav-text">경영관리</span>
            </Button>
            <ul className="sub-menu">
              <li>
                <NavLink className="prepend-icon" to="/app/businessSupport/addBranch">
                  <span className="nav-text">신규가맹등록</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/businessSupport/branch">
                  <span className="nav-text">지점관리</span>
                </NavLink>
              </li>
            </ul>
          </li>

          <li className="menu no-arrow">
            <NavLink className="prepend-icon" to="/app/code">
              <i className="zmdi zmdi-key zmdi-hc-fw"/>
              <span className="nav-text">코드관리</span>
            </NavLink>
          </li>

          <li className="menu collapse-box">
            <Button>
              <i className="zmdi zmdi-collection-item-8 zmdi-hc-fw" />
                <span className="nav-text">결재관리</span>
            </Button>
            <ul className="sub-menu">
              <li>
                <NavLink className="prepend-icon" to="/app/approval/approvalForm">
                  <span className="nav-text">결재양식관리</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/approval/approvalRequest">
                  <span className="nav-text">결재요청</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/approval/approvalBox">
                  <span className="nav-text">결재함</span>
                </NavLink>
              </li>
            </ul>
          </li>

          <li className="menu no-arrow">
            <NavLink className="prepend-icon" to="/app/dailySales">
              <i className="zmdi zmdi-calendar zmdi-hc-fw"/>
              <span className="nav-text">일매출조회</span>
            </NavLink>
          </li>

          <li className="menu collapse-box">
            <Button>
              <i className="zmdi zmdi-shopping-cart zmdi-hc-fw"/>
                <span className="nav-text">주문관리</span>
            </Button>
            <ul className="sub-menu">
              <li>
                <NavLink className="prepend-icon" to="/app/branch/orderRequest">
                  <span className="nav-text">주문요청</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/branch/orderManage">
                  <span className="nav-text">내주문관리</span>
                </NavLink>
              </li>
            </ul>
          </li>
          
        </ul>
      </CustomScrollbars>
    );
  }
}

export default withRouter(SidenavContent);
