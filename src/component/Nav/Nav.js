import React, { Component } from 'react';
// import Dashboard from '../Dashboard/Dashboard';
import { Link, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn, logOut} from '../../redux/reducer';
import powerButton from '../../media/noun_power button_145212.svg';
import axios from 'axios';
import '../Nav/nav.css';

class Nav extends Component {
    // console.log(props.location);
    componentDidMount() {
        axios.get('/api/user-data').then(response => {
            const user = response.data;
            console.log(user);
            this.props.logIn(user);
        })
    }

    testLogOut() {
        console.log('fired');
        
        axios.post('/api/logout')
            .then(res => {
                window.location.href = '/'
            })
            .catch(err => console.log('Err in testLogout', err))
    }
render(){
    const {username, profile} = this.props;
    console.log('hi this is props from nav', this.props);
    const { user, logIn, logOut } = this.props;
    return (
        <div className='nav-content'>
           
            <img className='user-profile-pic' src={user.picture}/>
            <p>{user.name}</p>
            <Link to='/dashboard'><button>Home</button></Link>
                <Link to='/post/:postid'><button>New Post</button></Link>
            <div> <img className='power-button' src={powerButton} onClick={this.testLogOut}/> <div>Log out </div> </div>

        </div>
    );
}
    
}

function mapStateToProps(state) {
    const {user} = state;
    return {
        user
    }
}

const mapDispatchToProps = {
    logIn,
    logOut
}

export default connect (mapStateToProps, mapDispatchToProps)(withRouter(Nav));


