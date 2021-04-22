/* React */
import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';

/* Css */
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

/* Pages */
import Menu from './Components/Menu';
import SwitchComponent from './Components/SwitchComponent';

/* Redux */
import { Provider } from 'react-redux';
import store from './store';

function App(){
    return( 
        <Provider store={store}>
            <Router>
                <div className="container-fluid">
                    <Menu/>
                    <SwitchComponent/>
                </div> 
            </Router>
        </Provider>
    )
}

export default App;
