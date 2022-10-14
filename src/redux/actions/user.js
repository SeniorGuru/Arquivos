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

export const UpdateCollaborator = (
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

export const GetCollaborators = () => async dispatch => {
    try {
        let adminDocs = await getDocs(query(collection(db, 'Users'), where('position', '==', 'admin'))) ;
        let backOfficeDocs = await getDocs(query(collection(db, 'Users'), where('position', '==', 'backoffice'))) ;
        let teamLeaderDocs = await getDocs(query(collection(db, 'Users'), where('position', '==', 'teamleader'))) ;
        let coordinatorDocs = await getDocs(query(collection(db, 'Users'), where('position', '==', 'coordinator'))) ;
        let managerDocs = await getDocs(query(collection(db, 'Users'), where('position', '==', 'manager'))) ;

        await dispatch({
            type : ActionTypes.GetCollaborators,
            payload : {
                adminList: adminDocs.docs,
                backOfficeList : backOfficeDocs.docs,
                teamleaderList : teamLeaderDocs.docs,
                coordinatorList : coordinatorDocs.docs,
                managerList : managerDocs.docs
            }
        });

        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}