import ActionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
    employeesList : null,
    adminsList : null
}

export default function user(state=INITIAL_STATE, action) {
    switch(action.type){
        case ActionTypes.GetEmployees:
            return ({
                ...state,
                employeesList : action.payload
            });
        case ActionTypes.GetAdministrators:
            return ({
                ...state,
                adminsList : action.payload
            })
        default :
            return state ;
    }
}