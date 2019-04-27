import React from 'react'

import DelayedRedirect from '../../components/DelayedRedirect/DelayedRedirect'

import './SignOut.css'

const signOut = (props) => {
    return (
        <div className="sign-out">
            <div className="sign-out-floating-dialog">
                <h1>Successfully Signed Out.</h1>
                <br/>
                <h4>You will be redirected to the home page in 2 seconds. </h4>
                <DelayedRedirect to={'/'} delay={2000} func={props.signOut} />
            </div>
        </div>
    );
}

export default signOut;