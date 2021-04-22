/* React */
import React, { useState, useEffect } from 'react';
import {Switch, Route, withRouter } from 'react-router-dom';

/* Css */
import './SwitchComponent.css';

/* Pages */
import Welcome from '../Pages/Welcome/Welcome';
import ChooseGame from '../Pages/ChooseGame/ChooseGame';
import Game from '../Pages/Game/Game';
import Login from '../Pages/Login/Login';
import GamePage from '../Pages/GamePage/GamePage';
import Profile from '../Pages/Profile/Profile';

export const MemoComponent = React.memo(() => {
    return(
        <Switch>
            <Route exact path='/' component={withRouter(Welcome)} />
            <Route exact path='/gamesDashboard' component={withRouter(ChooseGame)} />
            <Route exact path='/game' component={withRouter(Game)} />
            <Route exact path='/login' component={withRouter(Login)} />
            <Route exact path='/gamePage' component={withRouter(GamePage)}/>
            <Route exact path='/profile' component={withRouter(Profile)}/>
        </Switch>
    )
})

export default MemoComponent;