import React, { Component } from 'react';
//import {handleUsername} from '../../redux/reducer';
import axios from 'axios';
import {connect} from 'react-redux';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // username from reducer
            password: ''
        }
        this.login = this.login.bind(this);
    }

    login() {
        const redirectUri = encodeURIComponent(`${window.location.origin}/callback`);
      
        window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
      }



    // handleRegister(username, password) {
    //     axios.post('/api/register-user', {username, password}).then(res => {
    //         this.props.history.push('/dashboard')
    //     })
    // }

    // handlePassword(input) {
    //     this.setState ({
    //         password: input
    //     });
    // }

    render() { 
        const {user} = this.props;
        return (  
            <div>
                <div>Auth</div>
                <h3>Username</h3>
                {/* <input type="text" value={user.username} onChange={(e) => handleUsername(e.target.value)} /> */}
                <h3>Password</h3>
                {/* <input type="text" value={this.handlePassword} onChange={(e) => this.handlePassword(e.target.value)} />
                <button>Login</button>
                <button onClick={() => this.handleRegister(user.username, this.state.password)}
                >Register</button> */}

            </div>
        );
    }
}
 
export default Auth;