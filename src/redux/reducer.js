const initialState = {

        username: 'aisha',
        profile: 'img.url',
        userId: 0
    
}

const HANDLE_USERNAME = "HANDLE_USERNAME";
const HANDLE_PROFILE = "HANDLE_PROFILE";

//action builders
// update user information
// clear user information
export default (state=initialState, action) => {
    switch(action.type) {
        case HANDLE_USERNAME:
            return {...state, username: action.payload}
        case HANDLE_PROFILE:
            return {...state, profile: action.payload}
        default: 
            return {...state}
    }
}

export function handleUsername(username) {
    return {
        type: HANDLE_USERNAME,
        payload: username
    }
}

export function handleProfile(profile) {
    return {
        type: HANDLE_PROFILE,
        payload: profile
    }
}