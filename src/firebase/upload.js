import { uuidv4 } from "@firebase/util";

import { doc, updateDoc } from 'firebase/firestore' ;

import { ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject } from 'firebase/storage' ;

import { db, storage } from './config';

export const UploadPhotoImage = async (raw, user_id) => {
    try {
        if(!raw) return ;

        let file_name = uuidv4() ;

        let storageRef = ref(storage, 'profile_images/' + user_id + "/");

        let result = await listAll(storageRef)

        console.log(result.items) ;

        result.items.forEach( (file) => {
            deleteObject(file) ;
        });
        
        storageRef = ref(storage, 'profile_images/' + user_id + "/" + file_name );
        const uploadTask = await uploadBytesResumable(storageRef, raw);

        let downloadURL = await getDownloadURL(uploadTask.ref);

        await updateDoc(doc(db, "Users", user_id), {
            profile_photo_url : downloadURL,
            profile_photo_name : file_name,
        }) ;
        
    } catch(err) {
        console.log(err) ;
    }
}

export const UploadDocFile = async (raw, user_id) => {
    try {
        if(!raw) return ;

        let file_name = uuidv4() ;
        
        const storageRef = ref(storage, 'doc_files/' + user_id + "/" + file_name );
        const uploadTask = uploadBytesResumable(storageRef, raw);

        uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            }, 
            (error) => {
                // Handle unsuccessful uploads
            }, 
            async () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    await updateDoc(doc(db, "Users", user_id), {
                        doc_file_url : downloadURL,
                        doc_file_name : file_name,
                    }) ;
                });
            }
        );
    } catch(err) {
        console.log(err) ;
    }
}