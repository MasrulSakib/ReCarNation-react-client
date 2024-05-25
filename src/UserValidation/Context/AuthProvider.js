import React, { createContext, useEffect, useState } from 'react';
import app from '../../firebase/firebase.config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext()
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([])
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('user observing')
            setUser(currentUser);
            setLoader(false)

        });
        return () => unsubscribe()
    }, [])

    const authInfo = {
        user,
        loader,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;