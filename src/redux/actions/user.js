import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { getCookie } from '../../utils/Helper';
import ActionTypes from './actionTypes' ;

export const GetEmployees = () => async dispatch => {
    try {
        let employees = await getDocs(
            query(
                collection(db, 'Users'), 
                where('creator_admin', '==', getCookie('user_id')),
                where('position', 'in' , ['backoffice', 'admin', 'teamleader'])
        )) ;

        await dispatch({
            type : ActionTypes.GetEmployees,
            payload : employees.docs
        }) ;

        return true ;

    } catch(err) {
        console.log(err) ;
        return false ;
    }
}

export const GetAdministrators = () => async dispatch => {
    try {
        let employees = await getDocs(
            query(
                collection(db, 'Users'), 
                where('creator_admin', '==', getCookie('user_id')),
                where('position', '==' , 'admin')
        )) ;

        await dispatch({
            type : ActionTypes.GetAdministrators,
            payload : employees.docs
        }) ;

        return true ;

    } catch(err) {
        console.log(err) ;
        return false ;
    }
}