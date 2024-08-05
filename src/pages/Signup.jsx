// src/pages/Signup.jsx
import React, { useState } from 'react';
import FormInput from '../components/common/FormInput';
import Button from '../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import { toast } from 'react-toastify';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { loading, signupWithEmail, googleAuth } = useFirebaseAuth();
    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();
        if (name && email && password && confirmPassword) {
            if (password === confirmPassword) {
                await signupWithEmail(name, email, password);
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                navigate('/dashboard');
            } else {
                toast.error("Passwords do not match!");
            }
        } else {
            toast.error("All fields are required!");
        }
    };

    return (
        <div className='w-full h-[90vh] flex justify-center items-center'>
            <div className='border shadow-sm p-10 w-[80%] md:w-[70%] lg:w-[40%] rounded-lg'>
                <h2 className='text-xl my-5'>Sign Up on <span className='text-emerald-700 font-bold'>PERFIN.</span></h2>
                <form onSubmit={handleSignup}>
                    <FormInput
                        type="text"
                        label="Full Name"
                        state={name}
                        setState={setName}
                        placeholder="Duyen Pham"
                    />
                    <FormInput
                        type="email"
                        label="Email"
                        state={email}
                        setState={setEmail}
                        placeholder="duyenpham@gmail.com"
                    />
                    <FormInput
                        type="password"
                        label="Password"
                        state={password}
                        setState={setPassword}
                        placeholder="Example123"
                    />
                    <FormInput
                        type="password"
                        label="Confirm Password"
                        state={confirmPassword}
                        setState={setConfirmPassword}
                        placeholder="Example123"
                    />
                    <div>
                        <Button
                            text="Signup Using Email & Password"
                            type="submit"
                            disabled={loading}
                        />
                        <p>or</p>
                        <Button
                            onClick={() => googleAuth(navigate)}
                            text="Signup Using Gmail"
                            green
                            disabled={loading}
                        />
                        <p className='text-center'>Already have an account? <Link to="/signin"><span className='cursor-pointer text-blue-500'>Sign In</span></Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
