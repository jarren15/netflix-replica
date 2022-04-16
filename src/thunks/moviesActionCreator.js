import { getDocs, collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

// export const getMovies = () => {
//     return async (dispatch, getState) => {
//         let movieArr = []
//         const querySnapshot = await getDocs(collection(db, "movies"));
//         querySnapshot.forEach((doc) => {
//             movieArr.push({
//                 ...doc.data(), 
//                 id: doc.id
//             });
//         });
//         dispatch({
//             type: 'UPDATED_MOVIES', 
//             payload: movieArr
//         })
//     }
// }

// export const watchMovies = () => {
//     return (dispatch, getState) => {
//         const collectionRef = collection(db, "movies");
//         onSnapshot(collectionRef, (snapshot) => {
//             let movieArr = [];
//             snapshot.forEach((doc) => {
//                 movieArr.push({
//                     ...doc.data(), 
//                     id: doc.id
//                 });
//             });
//             dispatch({
//                 type: 'WATCHED_MOVIES', 
//                 payload: movieArr
//             })
//         });
//     }
// }





// export const hoveredMovie = (id, hovered) => {
//     return async (dispatch, getState) => {
//         const docRef = doc(db, "movies", id);
//         await updateDoc(docRef, {
//             hovered: true
//         });
//         dispatch({
//             type: 'HOVERED_MOVIE',
//             payload: {id, hovered}
//         })
//     }
// }

// export const unhoveredMovie = (id, hovered) => {
//     return async (dispatch, getState) => {
//         const docRef = doc(db, "movies", id);
//         await updateDoc(docRef, {
//             hovered: false
//         });
//         dispatch({
//             type: 'UNHOVERED_MOVIE',
//             payload: {id, hovered}
//         })
//     }
// }