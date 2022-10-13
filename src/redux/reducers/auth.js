import ActionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
    profile : null
}

export default function auth(state=INITIAL_STATE, action) {
    switch(action.type) {
        case ActionTypes.SignInUser:
            return ({ ...state, profile : action.payload})
        case ActionTypes.UserProfile:
            return ({...state, profile : action.payload})
        default :
            return state ;
    }
}