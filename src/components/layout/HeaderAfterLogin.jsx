import React, { useEffect } from 'react'
import { auth } from "../../firebase"
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAuth, signOut } from "firebase/auth";

const HeaderAfterLogin = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate("/dashboard")
        }
    }, [user, loading])

    const logout = () => {
        try {
            signOut(auth).then(() => {
                // Sign-out successful.
                toast.success("Logged out successful!")
                navigate("/signin")
            }).catch((error) => {
                toast.error(error.message)
            });
        } catch (e) {
            toast.error(e)
        }
    }

    return (
        <div className='flex p-5 border shadow-sm justify-between px-10 bg-primary font-bold text-white text-[20px]'>
            <p>Control your spending!! 🥲</p>
            {user && (
                <p className='hover:cursor-pointer' onClick={logout}>Logout</p>
            )}
        </div>
    )
}

export default HeaderAfterLogin
