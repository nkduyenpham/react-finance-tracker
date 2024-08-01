// src/hooks/useFirebaseAuth.js
import { useState } from 'react';
import { auth, provider, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const useFirebaseAuth = () => {
    const [loading, setLoading] = useState(false);

    const createUserDocument = async (user, name) => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
        const { displayName, email, photoURL } = user;
        const createdAt = new Date();

    try {
        await setDoc(userRef, {
            name: displayName || name,
            email,
            photoURL: photoURL || "",
            createdAt,
        });
            toast.success("Account Created!");
        } catch (error) {
            toast.error(error.message);
        }
    }
};

    const signupWithEmail = async (name, email, password) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
        await createUserDocument(user, name);
            toast.success("User created!");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const googleAuth = async (navigate) => {
        setLoading(true);
        try {
                const result = await signInWithPopup(auth, provider);
                const user = result.user;
                await createUserDocument(user);
                toast.success("User authenticated!");
                navigate('/dashboard');
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
    };

    const loginWithEmail = async (email, password, navigate) => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            toast.success('User logged in!');
            navigate('/dashboard');
            return user;
            } catch (error) {
            toast.error(error.message);
            throw error;
            } finally {
            setLoading(false);
            }
        };

    return {
        loading,
        signupWithEmail,
        googleAuth,
        loginWithEmail,
    };
};

export default useFirebaseAuth;
