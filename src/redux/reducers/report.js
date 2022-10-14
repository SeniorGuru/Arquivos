import ActionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
    reportList : null
}

export default function report(state=INITIAL_STATE, action) {
    switch(action.type){
        case ActionTypes.GetReports:
            return ({
                ...state,
                reportList : action.payload
            });
        default :
            return state;
    }
}