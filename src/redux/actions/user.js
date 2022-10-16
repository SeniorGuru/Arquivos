import { collection, doc, getDocs, query, updateDoc, where, setDoc } from 'firebase/firestore';
import { UploadPhotoImage, UploadDocFile } from '../../firebase/upload';
import ActionTypes from './actionTypes' ;

import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { db, auth } from '../../firebase/config';

import md5 from 'md5';

import {getExtension} from '../../utils/Helper' ;

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
    enabled_role
) => async dispatch => {
    try {
        await updateDoc(doc(db, "Users", updated_id), {
            position,
            cav,
            name,
            phone_number,
            house_hold,
            inform_email,
            enabled_role
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

export const AddCollaborator = (
    photo,
    photo_name,
    position,
    cav,
    name,
    phone_number,
    house_hold,
    inform_email,
    password,
    doc_file,
    doc_file_name,
) => async dispatch => {
    try {
        let userDocs = await getDocs(query(collection(db, "Users"), where('email', '==', inform_email)));

        if(!userDocs.size) {
            let userCredential = await createUserWithEmailAndPassword(auth, inform_email, password) ;

            await sendEmailVerification(auth.currentUser) ;

            await setDoc(doc(db, "Users", userCredential.user.uid), {
                position,
                cav,
                name,
                phone_number,
                house_hold,
                inform_email,
                password : md5(password),
                enabled_role : ['admin', 'backoffice', 'teamleader'].includes(position) ? true : false
            });

            await UploadDocFile(doc_file , getExtension(doc_file_name) , userCredential.user.uid) ;
            await UploadPhotoImage(photo, getExtension(photo_name) ,userCredential.user.uid) ;

            return userCredential.user.uid ;
        }
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}

export const UpdateAccessRole = (updated_id, enabled_role) => async dispatch => {
    try {
        await updateDoc(doc(db, "Users", updated_id), {
            enabled_role
        }) ;

        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}
