import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { BOARDS, SIGN_IN } from '../../routes';
import { Spinner } from '../../shared/components/Spinner';
import { AuthUserContext } from './AuthUserContext';

export const withAuthentication = (Component) =>
    (props) => {
        const [authUser, setAuthUser] = useState(null)
        useEffect(() => {
            firebase.auth().onAuthStateChanged((authUser = null) => {
                setAuthUser(authUser)
            });
        }, [])

        return (
            <AuthUserContext.Provider value={authUser}>
                <Component {...props} />
            </AuthUserContext.Provider>
        );
    };

export const withAuthorization = (authCondition) => (Component) => {
    const WithAuthorization = (props) => {
        useEffect(() => {
            firebase.auth().onAuthStateChanged((authUser) => {
                if (!authCondition(authUser)) {
                    props.history.push(SIGN_IN);
                }
            });
        }, [props.history]);
        const authUser = useContext(AuthUserContext);

        return authUser ? <Component {...props} /> : null;
    };

    return withRouter(WithAuthorization);
};

export const withLandingAuthentication = (Component) => {
    const WithLandingAuthentication = (props) => {
        const [loading, setLoading] = useState(false);

        useEffect(() => {
            setLoading(true);
            firebase.auth().onAuthStateChanged((authUser) => {
                setLoading(false);
                if (authUser) {
                    props.history.push(BOARDS);
                }
            });
        }, []);
        return loading ? <Spinner /> : <Component />;
    };

    return withRouter(WithLandingAuthentication);
};
