import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import $ from 'jquery';

import Home from './components/Home';
import NotFound from './components/NotFound';

class App extends Component {
  render() {
    return (
      <Switch>
        { /* Work with data props */ }
        <Route path='/' component={ Home }/>
        { /* Work only with API */ }
        <Route path='/chaban' component={ Home }/>
        { /* Work only with API */ }
        <Route path='/chaban' component={ Home }/>
        { /* Not Found */ }
        <Route path='/*' component={ NotFound }/>
      </Switch>
    );
  }
}

export default App;
