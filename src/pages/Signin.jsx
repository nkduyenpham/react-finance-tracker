// src/pages/Signin.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import FormInput from '../components/common/FormInput';
import Button from '../components/common/Button';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import { toast } from 'react-toastify';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loading, loginWithEmail, googleAuth } = useFirebaseAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginUsingEmail = async (event) => {
        event.preventDefault();
        dispatch(signInStart());
        if (email !== '' && password !== '') {
            try {
                const user = await loginWithEmail(email, password, navigate);
                dispatch(signInSuccess(user));
            } catch (error) {
                dispatch(signInFailure(error.message));
            }
        } else {
            toast.error('Email and password cannot be empty');
        }
    };

    const handleSignInGmail = async () => {
        try {
            await googleAuth(navigate);
        } catch (error) {
            toast.error('Failed to sign in with Gmail');
        }
    };

    return (
        <div className='w-full h-[90vh] my-10 flex justify-center items-center'>
            <div className='border shadow-sm p-10 w-[80%] md:w-[70%] lg:w-[40%] rounded-lg'>
                <h2 className='text-xl my-5'>Login to <span className='text-emerald-700 font-bold'>PERFIN.</span></h2>
                <form onSubmit={loginUsingEmail}>
                    <FormInput
                        type='email'
                        label={'Email'}
                        state={email}
                        setState={setEmail}
                        placeholder={'duyenpham@gmail.com'}
                    />
                    <FormInput
                        type='password'
                        label={'Password'}
                        state={password}
                        setState={setPassword}
                        placeholder={'Example123'}
                    />
                    <div>
                        <Button
                            type="submit"
                            text="Signin Using Email"
                            disabled={loading}
                        />
                        <p>or</p>
                        <Button
                            text={'Sign In with Gmail'}
                            green={true}
                            onClick={handleSignInGmail}
                            disabled={loading}
                        />
                        <Link to='/'><p className='text-center py-3'>Don't have an account? <span className='cursor-pointer text-blue-600'>Sign Up</span></p></Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signin;
