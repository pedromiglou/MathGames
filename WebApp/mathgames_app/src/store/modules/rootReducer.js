import { combineReducers} from 'redux';

import css_vars from './css_vars/reducer';
import user from './user/reducer';
import matchApp from './matches/reducer';

export default combineReducers({
    css_vars,
    user,
    matchApp
})