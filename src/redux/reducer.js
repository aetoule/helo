const initialState = {
    user: {
    },
    postsList: []
}

const LOGGED_IN = "LOGGED_IN";
const LOGGED_OUT = "LOGGED_OUT";
const SET_POSTS_LIST = "SET_POSTS_LIST";
//action builders
// update user information
// clear user information
export default function reducer(state=initialState, action) {
    switch(action.type) {
        case LOGGED_IN:
            return {...state, user: action.payload}
        case LOGGED_OUT:
            return {...state, user: null} 
        case SET_POSTS_LIST: 
            return {...state, postsList: action.payload}  
        default: 
            return {...state}
    }
}


export function logIn(user) {
    return {
        type: LOGGED_IN,
        payload: user
    }
}

export function logOut() {
    return {
        type: LOGGED_IN
    }
}

export function setPostsList(postsList) {
    return {
        type: SET_POSTS_LIST,
        payload: postsList
    }
}