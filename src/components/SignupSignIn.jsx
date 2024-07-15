import React, { useState } from 'react'
import FormInput from './common/FormInput'
import Button from './common/Button';

const SignupSignIn = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <div className='border shadow-sm p-10 w-[80%] md:w-[70%] lg:w-[50%] rounded-lg'>
            <h2 className='text-xl my-5'>Sign Up on <span className='text-emerald-700 font-bold'>PERFIN.</span></h2>
            <form>
                <FormInput
                    label={"Full Name"}
                    state={name}
                    setState={setName}
                    placeholder={"Duyen Pham"}
                />
                <FormInput
                    label={"Email"}
                    state={email}
                    setState={setEmail}
                    placeholder={"duyenpham@gmail.com"}
                />
                <FormInput
                    label={"Password"}
                    state={password}
                    setState={setPassword}
                    placeholder={"Example123"}
                />
                <FormInput
                    label={"Confirm Password"}
                    state={confirmPassword}
                    setState={setConfirmPassword}
                    placeholder={"Example123"}
                />
                <div>
                    <Button text={"Signup Using Email & Password"} />
                    <p>or</p>
                    <Button text={"Signup Using Email & Password"} green={true} />
                </div>
            </form>
        </div>
    )
}

export default SignupSignIn