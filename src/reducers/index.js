import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import Settings from './Settings';
import Auth from './Auth';
import Accounting from './Accounting';
import Approval from './Approval';
import BusinessSupport from './BusinessSupport';
import Code from './Code';
import HumanResource from './HumanResource';
import ProductionManagement from './ProductionManagement';
import Notice from './Notice';


export default (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  auth: Auth,
  accounting: Accounting,
  approval: Approval,
  businessSupport: BusinessSupport,
  code: Code,
  humanResource: HumanResource,
  productionManagement: ProductionManagement,
  notice: Notice
});
