import ActionTypes from "./actionTypes";

import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword,
    signInWithPhoneNumber, sendPasswordResetEmail,
   onAuthStateChanged, getAuth, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { doc, setDoc, getDoc, updateDoc, query, where, collection, getDocs, Timestamp, deleteDoc } from 'firebase/firestore' ;

import { db, auth, storage, firebaseApp } from '../../firebase/config';

import md5 from 'md5' ;

import { UploadDocFile, UploadPhotoImage } from "../../firebase/upload";

import { checkCookie, getCookie, setCookie } from "../../utils/Helper";

export const SignUpUser = (
    photo,
    position,
    cav,
    name,
    phone_number,
    house_hold,
    inform_email,
    password,
    doc_file
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
                password : md5(password)
            });

            await UploadDocFile(doc_file, userCredential.user.uid) ;
            await UploadPhotoImage(photo, userCredential.user.uid) ;

            return userCredential.user.uid ;
        }
    } catch(err) {
        console.log(err) ;

        return false ;
    }
}

export const UserProfile = () => async dispatch => {
    try {
        if(!checkCookie('user_id')) return false ;

        let userDoc = await getDoc(doc(db, "Users", getCookie('user_id'))) ;

        await dispatch({
            type : ActionTypes.UserProfile,
            payload : {...userDoc.data()}
        });

        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}

export const SignInUser = (email, password) => async dispatch => {
    try {
        
        let userCredential = await signInWithEmailAndPassword(auth, email, password) ;

        if(auth.currentUser.emailVerified) {
           
            setCookie('user_id', userCredential.user.uid ) ;

            let userDoc = await getDoc(doc(db, "Users", userCredential.user.uid)) ;

            await dispatch({
                type : ActionTypes.SignInUser,
                payload : {...userDoc.data()}
            });

            return 200 ;
        } else {
            await sendEmailVerification(auth.currentUser) ;
                
            return 201;
        }
    } catch(err) {

        console.log(err) ;
        
        if(err.message) {
            if(err.message.indexOf('too-many-requests') >= 0) {
                return 'too-many-requests' ;
            }
            if(err.message.indexOf('wrong-password') >= 0) {
                return 'wrong-password';
            }
            if(err.message.indexOf('user-not-found') >= 0) {
                return 'user-not-found';
            }
        }

        return 401 ;
    }
}

export const AddCollaborator = (
    photo,
    position,
    cav,
    name,
    phone_number,
    house_hold,
    inform_email,
    password,
    doc_file
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
                creator_admin : getCookie('user_id')
            });

            await UploadDocFile(doc_file, userCredential.user.uid) ;
            await UploadPhotoImage(photo, userCredential.user.uid) ;

            return userCredential.user.uid ;
        }
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}
