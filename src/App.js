import React, { Component } from 'react';
import './App.css';
import Nav from './component/Nav/Nav';
import Auth from './component/Auth/Auth';
import Dashboard from './component/Dashboard/Dashboard';
import Form from './component/Form/Form';
import Post from './component/Post/Post'
import route from './route';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        {/* <Auth />
        <Dashboard />
        <Form />
        <Post /> */}
        <Post />
        { route }
      </div>
    );
  }
}

export default App;
