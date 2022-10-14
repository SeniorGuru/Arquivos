import ActionTypes from "./actionTypes";

import { addDoc, collection, doc, getDocs, Timestamp } from 'firebase/firestore' ;

import { db } from "../../firebase/config";

export const GenerateReport = (
    team,
    vpp,
    objective,
    sales,
    ranking,
    pending,
    nos_cnt_year,
    nos_cnt_date,
    type_pending,
    ls,
    packet_type
) => async dispatch => {
    try {
        await addDoc(collection(db, "Reports"), {
            team,
            vpp,
            objective,
            sales,
            ranking,
            pending,
            nos_cnt_year,
            nos_cnt_date,
            type_pending,
            ls,
            packet_type,
            created_at : Timestamp.now()
        }) ;

        return true ;

    } catch(err) {
        console.log(err) ;
        return false ;
    }
}

export const GetReports = () => async dispatch => {
    try {
        let reportDocs = await getDocs(collection(db, "Reports")) ;

        await dispatch({
            type : ActionTypes.GetReports,
            payload: reportDocs.docs
        });

        return true ;

    } catch(err){
        console.log(err) ;
        return false ;
    }
}