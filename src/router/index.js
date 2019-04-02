import React from 'react';
import {HashRouter as Router,Route,Switch} from 'react-router-dom';
import App from '@/layout/App';
const RouterCom=()=>(
    <Router>
        <Switch>
               <Route path='/' component={App}/>
        </Switch>
    </Router>
)

export default RouterCom 