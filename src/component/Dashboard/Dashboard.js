import React, { Component } from 'react';
import {setPostsList} from '../../redux/reducer';
import axios from 'axios';
// dashboard functionality: 
// see all posts created on helo
// choose if their own posts are included in the feed
// A user should be able to search through the posts by title.
// They should be able to click the 'Reset' button to clear the search term.
// A user should be able to click any of the posts to be taken to new page showing the post details.

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount() {
        axios.get('/api/posts').then(res => {
            this.props.setPostsList(res.data)
        }).catch(err => console.log('err', err));

        
    }

    render() { 
        const {postsList} = this.props;
        // const mappedPosts = postsList.map(post => {
        //     return 
        // })
        return ( 
            <div>Dashboard</div>
         );
    }
}
 
export default Dashboard;