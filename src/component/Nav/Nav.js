import React from 'react';
// import Dashboard from '../Dashboard/Dashboard';
import { Link, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {handleUsername} from '../../redux/reducer';
import {handleProfile} from '../../redux/reducer';

function Nav(props) {
    console.log(props.location);
    const {username, profile} = props;
    console.log('hi this is props from nav', props);
    return (
        
        <div>
            <div>Nav</div>
            
            <div>
                {props.location.pathname === '/'
                ?
                <div></div>
                :
                <div>
                <Link to='/dashboard'><button>Home</button></Link>
                <Link to='/post/:postid'><button>New Post</button></Link>
                <Link to='/'><button>Logout</button></Link>
                </div>
                }
            </div>
            <img src={profile}/>
            <p>{username}</p>
        </div>
    );
    
}

function mapStateToProps(state) {
    const {username, profile} = state;
    return {
        username,
        profile
    }
}

const mapDispatchToProps = {
    handleUsername,
    handleProfile
}

export default connect (mapStateToProps, mapDispatchToProps)(withRouter(Nav));