import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button, Modal, TextInput} from 'carbon-components-react';
import { ChevronRight } from '@carbon/icons-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUp, signIn } from '../thunks/authActionCreator';
import { auth } from '../firebaseConfig';

function Home() {
    // Current auth user
    const currentUser = auth.currentUser
    // Dispatch function
    const dispatch = useDispatch();
    // Store auth data
    const storeData = useSelector(state => {
        return state
    });
    const storeAuth = useSelector(state => {
        return state.auth;
    })
    // Form states
    const [openSignUp, setOpenSignUp] = useState(false);
    const [openSignIn, setOpenSignIn] = useState(false);
    const [signUpDetails, setSignUpDetails] = useState({
        sUuserName: '',
        sUemail: '',
        sUpassword: ''
    })
    const [signInDetails, setSignInDetails] = useState({
        sIemail: '',
        sIpassword: ''
    })
    // Functions
    // Form open/close handler
    const onOpenSignUp = () => {
        setOpenSignUp(true)
    }
    const onOpenSignIn = () => {
        setOpenSignIn(true)
    }
     // Form submit handler
    const onSignUp = (username, email, password) => {
        dispatch(signUp(username, email, password))
    }
    const onSignIn = (email, password) => {
        dispatch(signIn(email, password))
    }
    // Form cancel handler
    const onSignUpCancel = () => {
        setOpenSignUp(false)
        setSignUpDetails({
            ...signUpDetails,
            sUuserName: '',
            sUemail: '',
            sUpassword: ''
        });
    }
    const onSignInCancel = () => {
        setOpenSignIn(false)
        setSignInDetails({
            ...signInDetails,
            sIemail: '',
            sIpassword: ''
        });
    }
    //Onchange handler
    const signUpValues = (e) => {
        setSignUpDetails({
            ...signUpDetails,
            [e.target.name]: e.target.value
        });
    }
    const signInValues = (e) => {
        setSignInDetails({
            ...signInDetails,
            [e.target.name]: e.target.value
        });
    }

    return (
        storeAuth.user.uid 
        ? 
            <Navigate to={`user/${storeAuth.user.uid}`} replace={true} /> 
        : 
            <section className='landingPage'>
                <div className="landingPage_logo">
                    <img src="https://i.ibb.co/r5krrdz/logo.png" alt="Netflix Logo" />
                </div>
                <div className="landingPage_content">
                    <h1>See what's next</h1>
                    <Link to='/about'>
                        <Button className="custom-class" renderIcon={ChevronRight}> WATCH FOR FREE NOW</Button>
                    </Link>

                    <Button onClick={onOpenSignIn}>SignIn</Button>
                    <Button onClick={onOpenSignUp}>SignUp</Button> 

                    {/* Auth Modals */}

                    {/* Sign-In */}
                    <Modal onRequestSubmit={() => onSignIn(signInDetails.sIemail, signInDetails.sIpassword)} secondaryButtonText='Cancel' primaryButtonText='Submit' open={openSignIn} onRequestClose={onSignInCancel}>
                        <form>
                            <TextInput onChange={(e) => signInValues(e)} value={signInDetails.sIemail} name='sIemail' id='sIemail' type="email" labelText='Email' />
                            <TextInput onChange={(e) => signInValues(e)} value={signInDetails.sIpassword}  name='sIpassword' id='sIpassword' type="password" labelText='Password' />
                            {
                                storeAuth.authErr ?
                                <p className='formErr'>{storeAuth.authErr}</p> : 
                                null
                            }
                        </form>
                    </Modal>
                    
                    {/* Sign-Up */}
                    <Modal onRequestSubmit={() => onSignUp(signUpDetails.sUuserName, signUpDetails.sUemail, signUpDetails.sUpassword)} secondaryButtonText='Cancel' primaryButtonText='Submit' open={openSignUp} onRequestClose={onSignUpCancel}>
                        <form>
                            <TextInput onChange={(e) => signUpValues(e)} value={signUpDetails.sUuserName} name='sUuserName' id='sOuserName' type="text" labelText='User Name' />
                            <TextInput onChange={(e) => signUpValues(e)} value={signUpDetails.sUemail} name='sUemail' id='sOemail' type="email" labelText='Email' />
                            <TextInput onChange={(e) => signUpValues(e)} value={signUpDetails.sUpassword}  name='sUpassword' id='sOpassword' type="password" labelText='Password' />
                            {
                                storeAuth.authErr ?
                                <p className='formErr'>{storeAuth.authErr}</p> : 
                                null
                            }
                        </form>
                    </Modal>
                </div>
            </section>
    );
}

export default Home;