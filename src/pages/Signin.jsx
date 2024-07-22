import React, { useState } from 'react';
import FormInput from '../components/common/FormInput';
import Button from '../components/common/Button';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { googleAuth, createUserDocument } from './Signup'; // Import functions
import { useDispatch } from 'react-redux';
import { setLoading, setNavigation } from '../actions/authActions'; // Import actions

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginUsingEmail = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (email !== "" && password !== "") {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                toast.success("User logged In!");
                dispatch(setNavigation('/dashboard'));
                navigate('/dashboard');
            } catch (error) {
                const errorMessage = error.message;
                toast.error(errorMessage);
            } finally {
                setLoading(false);
            }
        } else {
            toast.error("All fields are mandatory!");
            setLoading(false);
        }
    }

    const handleSignInGmail = async () => {
        await googleAuth(dispatch, navigate); // Pass dispatch and navigate
    }

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='border shadow-sm p-10 w-[80%] md:w-[70%] lg:w-[40%] rounded-lg'>
                <h2 className='text-xl my-5'>Login to <span className='text-emerald-700 font-bold'>PERFIN.</span></h2>
                <form onSubmit={loginUsingEmail}>
                    <FormInput
                        type="email"
                        label={"Email"}
                        state={email}
                        setState={setEmail}
                        placeholder={"duyenpham@gmail.com"}
                    />
                    <FormInput
                        type="password"
                        label={"Password"}
                        state={password}
                        setState={setPassword}
                        placeholder={"Example123"}
                    />
                    <div>
                        <Button
                            disable={loading}
                            text={loading ? "Loading..." : "Sign In"}
                            type="submit"
                        />
                        <p>or</p>
                        <Button
                            text={"Sign In with Gmail"}
                            green={true}
                            onClick={handleSignInGmail}
                        />
                        <p className='text-center py-3'>Don't have an account? <span className='cursor-pointer text-blue-600'>Sign Up</span></p>
                        <p className='text-center'>Forget your password? <span className='cursor-pointer text-blue-600'>Click here</span></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signin;
