import React, { useEffect } from 'react'
import { auth } from "../../firebase"
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signOut } from "firebase/auth";

const HeaderAfterLogin = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate()
    const location = useLocation();


    useEffect(() => {
        if (user) {
            navigate("/dashboard")
        }
    }, [user, navigate])

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
            <p className='hidden sm:block'>Control your spending!! 🥲</p>
            {/* Conditional rendering of Link */}
            {location.pathname === '/dashboard' ? (
                <p className='block sm:hidden'>Home</p>
            ) : (
                <Link to="/dashboard" className='block sm:hidden cursor-pointer'>
                    Home
                </Link>
            )}

            {user && (
                <p className='hover:cursor-pointer' onClick={logout}>Logout</p>
            )}
        </div>
    );
}

export default HeaderAfterLogin
