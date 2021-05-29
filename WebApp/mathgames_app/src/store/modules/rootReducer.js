import { combineReducers} from 'redux';

import css_vars from './css_vars/reducer';
import user from './user/reducer';
import active_matches from './matches/reducer';

export default combineReducers({
    css_vars,
    user,
    active_matches
})