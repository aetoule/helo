import React, { Component } from 'react';
import './App.css';
import Nav from './component/Nav/Nav';
import Auth from './component/Auth/Auth';
import Dashboard from './component/Dashboard/Dashboard';
import Form from './component/Form/Form';
import Post from './component/Post/Post'
import route from './route';
import { withRouter } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div className="App">
      {this.props.location.pathname !== '/' && <Nav /> }
        {/* <Auth />
        <Dashboard />
        <Form />
        <Post /> */}
        {/* <Post /> */}
        { route }
      </div>
    );
  }
}

export default withRouter(App);
