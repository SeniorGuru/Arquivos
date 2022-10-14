import ActionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
    employeesList : null,
    adminsList : null,

    adminList: [],
    backOfficeList : [],
    teamleaderList : [],
    coordinatorList : [],
    managerList : []
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
            });
        
        case ActionTypes.GetCollaborators : 
            return ({
                ...state,
                adminList : action.payload.adminList,
                backOfficeList : action.payload.backOfficeList,
                teamleaderList : action.payload.teamleaderList,
                coordinatorList : action.payload.coordinatorList,
                managerList : action.payload.managerList,
            })
        default :
            return state ;
    }
}