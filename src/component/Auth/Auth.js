import React, { Component } from 'react';
import {handleUsername} from '../../redux/reducer';
import axios from 'axios';
import {connect} from 'react-redux';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // username from reducer
            password: ''
        }
    }

    // handleUpdate(id, imgUrl, productName, price) {
    //     axios.put(`/api/inventory/${id}`, {imgUrl, productName, price} ).then(res => {
    //         this.props.history.push('/');
    //     })
    // }

    handleRegister(username, password) {
        axios.post('/api/register-user', {username, password}).then(res => {
            this.props.history.push('/dashboard')
        })
    }

    handlePassword(input) {
        this.setState ({
            password: input
        });
    }

    render() { 
        const {username} = this.props;
        return (  
            <div>
                <div>Auth</div>
                <h3>Username</h3>
                <input type="text" value={username} onChange={(e) => handleUsername(e.target.value)} />
                <h3>Password</h3>
                <input type="text" value={this.handlePassword} onChange={(e) => this.handlePassword(e.target.value)} />
                <button>Login</button>
                <button onClick={() => this.handleRegister(username, this.state.password)}
                >Register</button>

            </div>
        );
    }
}
 
export default Auth;