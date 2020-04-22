import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './styles/index.scss';
import Home from './views/Home';
import Stocks from './views/Stocks';
import Funds from './views/Funds';
import Quantify from './views/Quantify';

const App = () => (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/stocks/:id' component={Stocks} />
        <Route path='/funds' component={Funds} />
        <Route path='/quantify' component={Quantify} />
    </Switch>
);

export default App;
