import React, { useState } from 'react'
import FormInput from '../components/common/FormInput'
import Button from '../components/common/Button'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Signin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const loginUsingEmail = () => {
        console.log("login using email")
        if (email !== "" && password !== "") {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Sign in 
                    const user = userCredential.user
                    setLoading(true)
                    toast.success("User logged In !")
                    navigate("/dashboard")
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setLoading(false)
                    toast.error(errorMessage)
                })
        } else {
            toast.error("All fields are mandatory!")
        }
    }


    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='border shadow-sm p-10 w-[80%] md:w-[70%] lg:w-[40%] rounded-lg'>
                <h2 className='text-xl my-5'>Login to <span className='text-emerald-700 font-bold'>PERFIN.</span></h2>
                <form>
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
                        <Button disable={loading}
                            text={loading ? "Loading..." : "Sign In"}
                            onClick={loginUsingEmail}
                        />
                        <p>or</p>
                        <Button text={"Using Email & Password"} green={true} />
                        <p className='text-center py-3'>Don't have an account? <span className='cursor-pointer text-blue-600'>Sign Up</span></p>
                        <p className='text-center'>Forget your password? <span className='cursor-pointer text-blue-600'>Click here</span></p>
                    </div>
                </form>
            </div>
        </div>)
}

export default Signin