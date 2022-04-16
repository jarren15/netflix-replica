import { getDocs, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const getCategories = () => {
    return async (dispatch, getState) => {
        let catArr = []
        const querySnapshot = await getDocs(collection(db, "categories"));
        querySnapshot.forEach((doc) => {
            catArr.push({
                ...doc.data(), 
                id: doc.id
            });
        });
        dispatch({
            type: 'UPDATED_CATEGORIES', 
            payload: catArr
        })
    }
}

export const watchCategories = () => {
    return (dispatch, getState) => {
        const collectionRef = collection(db, "categories");
        onSnapshot(collectionRef, (snapshot) => {
            let catArr = [];
            snapshot.forEach((doc) => {
                catArr.push({
                    ...doc.data(), 
                    id: doc.id
                });
            });
            dispatch({
                type: 'WATCHED_CATEGORIES', 
                payload: catArr
            })
        });
    }
}