const initialState = {
    user: {
        username: 'aisha',
        profile: 'img.url',
        userId: 0
    }
}

// const HANDLE_USERNAME = "HANDLE_USERNAME";
// const HANDLE_PROFILE = "HANDLE_PROFILE";

const LOGGED_IN = "LOGGED_IN";
const LOGGED_OUT = "LOGGED_OUT";

//action builders
// update user information
// clear user information
export default function reducer(state=initialState, action) {
    switch(action.type) {
        case LOGGED_IN:
            return {...state, user: action.payload}
        case LOGGED_OUT:
            return {...state, user: null}   
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