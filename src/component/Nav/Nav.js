import React from 'react';
// import Dashboard from '../Dashboard/Dashboard';
import { Link, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn, logOut} from '../../redux/reducer';
import powerButton from '../../media/noun_power button_145212.svg';
import '../Nav/nav.css';

function Nav(props) {
    // console.log(props.location);
    const {username, profile} = props;
    console.log('hi this is props from nav', props);
    const { user, logIn, logOut } = props;

    return (
        <div>
            <div>Nav</div>
            <div>
                <div>
                <Link to='/dashboard'><button>Home</button></Link>
                <Link to='/post/:postid'><button>New Post</button></Link>
                <Link to='/'><button>Logout</button></Link>
                <button img={powerButton}>
                        Log out
                </button>
                



                </div>
                
            </div>
            <img className='user-profile-pic' src={user.profile}/>
            <p>{user.username}</p>

            <div> <img className='power-button' src={powerButton} onClick={logOut}/> <div>Log out </div> </div>

        </div>
    );
    
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