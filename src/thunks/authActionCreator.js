import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut as signOutWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { getDoc, doc, setDoc, onSnapshot, updateDoc, addDoc, collection, getDocs, arrayUnion, arrayRemove } from "firebase/firestore";

export const signUp = (username, email, password) => {
    return async (dispatch, getState) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const {uid, email} = userCredential.user;
            let moviesCloneArr = []
            const moviesClone = await getDocs(collection(db, "movies"));
            moviesClone.forEach((doc) => {
                moviesCloneArr.push({
                    id: doc.id,
                    ...doc.data()
                })
            });
            setDoc(doc(db, "users", uid), {
                id: uid,
                uid,
                email,
                userName: username,
                myList: [],
                continueWatching: {},
                movies: [...moviesCloneArr]
            }).then(() => {
                dispatch({
                    type: 'SIGNUP',
                    payload: {
                        authErr: null
                    }
                })
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            dispatch({
                type: 'SIGNUP',
                payload: {
                    authErr: error.message
                }
            })
        });
    }
}

export const signIn = (email, password) => {
    return async (dispatch, getState) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            dispatch({
                type: 'SIGNIN',
                payload: {
                    authErr: null
                }
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            dispatch({
                type: 'SIGNIN',
                payload: {
                    authErr: error.message
                }
            })
        });
    }
}

export const signOut = () => {
    return async (dispatch, getState) => {
        signOutWithEmailAndPassword(auth).then(() => {
            dispatch({
                type: 'SIGNOUT',
                payload: {}
            })
            console.log('signed out')
        }).catch((error) => {
            console.log(error)
        });
    }
}

// onAuthStateChanged(auth, (user) => {
//     if (!user) {
//         updateDoc(doc(db, "user", currentUserID), {
//             email: null,
//             uid: null,
//             userName: null
//         });
//     }
// });

// export const readAuth = () => {
//     return async (dispatch, getState) => {
//         try {
//             const querySnapshot = await getDocs(collection(db, "users"));
//             const usersArr = querySnapshot.docs.map(user => {
//                 return {
//                     id: user.id,
//                     ...user.data()
//                 }
//             });
//             const currentUser = usersArr.find(user => {
//                 return user.uid == auth.currentUser.uid
//             })
//             dispatch({
//                 type: 'UPDATED_USERS',
//                 payload: {...currentUser}
//             })
//         } catch(err) {
//             dispatch({
//                 type: 'UPDATED_USERS',
//                 payload: {}
//             })
//         }
//     }
    
// }

//Watcher for auth state
export const watchAuth = () => {
    return async (dispatch, getState) => {
        onAuthStateChanged(auth, async (activeUser) => {
            if(activeUser) {
                const querySnapshot = await getDocs(collection(db, "users"));
                const usersArr = querySnapshot.docs.map(user => {
                    return {
                        id: user.id,
                        ...user.data()
                    }
                });
                const currentUser = usersArr.find(user => {
                    return user.uid == activeUser.uid
                })
                dispatch({
                    type: 'WATCHED_USER',
                    payload: {...currentUser}
                })
            } else {
                dispatch({
                    type: 'WATCHED_USER',
                    payload: {}
                })
            }
        });
    }
}



export const addMovieToMyList = (movieID, authID) => {
    return async (dispatch, getState) => {
        updateDoc(doc(db, "users", authID), {
            myList: arrayUnion(movieID)
        });
    }
}

export const removeMovieToMyList = (movieID, authID) => {
    return async (dispatch, getState) => {
        updateDoc(doc(db, "users", authID), {
            myList: arrayRemove(movieID)
        });
    }
}

// Watcher for any updates on the user object props
export const watchUserProps = () => {
    return (dispatch, getState) => {
        const collectionRef = collection(db, "users");
        onSnapshot(collectionRef, (snapshot) => {
            const activeUser = auth.currentUser;
            const usersArr = snapshot.docs.map(user => {
                return {
                    id: user.id,
                    ...user.data()
                }
            });
            const currentUser = activeUser ? usersArr.find(user => {
                return user.uid == activeUser.uid
            }) : {}
            dispatch({
                type: 'WATCHED_USER_PROPS',
                payload: {...currentUser}
            })
        });
    }
}

export const updateMovieDuration = (movieID, authID, duration) => {
    return async (dispatch, getState) => {
        updateDoc(doc(db, "users", authID), {
            continueWatching: {
                ...getState().auth.user.continueWatching,
                [movieID]: {
                    ...getState().auth.user.continueWatching[movieID],
                    duration: duration,
                }
            }
        });
    }
}

export const updateMovieStartedProps = (movieID, authID, index) => {
    return async (dispatch, getState) => {
        updateDoc(doc(db, "users", authID), {
            continueWatching: {
                ...getState().auth.user.continueWatching,
                [movieID]: {
                    ...getState().auth.user.continueWatching[movieID],
                    started: true,
                }
            }
        });
    }
}

export const updateMovieProgress = (movieID, authID, progress) => {
    return async (dispatch, getState) => {
        updateDoc(doc(db, "users", authID), {
            continueWatching: {
                ...getState().auth.user.continueWatching,
                [movieID]: {
                    ...getState().auth.user.continueWatching[movieID],
                    progress
                }

            }
        });
    }
}

export const updateMovieEnded = (movieID, authID, progress) => {
    return async (dispatch, getState) => {
        updateDoc(doc(db, "users", authID), {
            continueWatching: {
                ...getState().auth.user.continueWatching,
                [movieID]: {
                    ...getState().auth.user.continueWatching[movieID],
                    ended: true,
                    progress
                }

            }
        });
    }
}