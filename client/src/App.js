import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MovieList from './containers/MovieList';
import Detail from './containers/detail';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={MovieList} />
        <Route exact path='/movie/:id' component={Detail} />
      </Switch>
    </div>
  );
}

export default App;
