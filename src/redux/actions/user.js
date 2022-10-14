import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { UploadPhotoImage } from '../../firebase/upload';
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

export const UpdateAdministrator = (
    updated_id,
    photo,
    position,
    cav,
    name,
    phone_number,
    house_hold,
    inform_email,
) => async dispatch => {
    try {
        await updateDoc(doc(db, "Users", updated_id), {
            position,
            cav,
            name,
            phone_number,
            house_hold,
            inform_email
        }) ;

        await UploadPhotoImage(photo, updated_id) ;

        return true ;
        
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}