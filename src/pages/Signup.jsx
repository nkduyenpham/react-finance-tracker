import React, { useState } from 'react'
import FormInput from '../components/common/FormInput'
import Button from '../components/common/Button';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, provider, db } from "../firebase";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc } from "firebase/firestore";

const Signup = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const signupWithEmail = async () => {
        setLoading(true);

        console.log("Name", name);
        console.log("Email", email);
        console.log("Password", password);
        console.log("Confirm Password", confirmPassword);

        if (name && email && password && confirmPassword) {
            if (password === confirmPassword) {
                try {
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    const user = userCredential.user;

                    console.log("User >>>>", user);

                    await createUserDocument(user);

                    toast.success("User created!");
                    setLoading(false);
                    setName("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                    navigate("/signin");
                } catch (error) {
                    toast.error(error.message);
                    setLoading(false);
                }
            } else {
                toast.error("Password and confirmed password don't match!");
                setLoading(false);
            }
        } else {
            toast.error("All fields are mandatory!");
            setLoading(false);
        }
    };


    // Create doc whenever new user created 

    const createUserDocument = async (user) => {
        setLoading(true);
        if (!user) return;

        const userRef = doc(db, "users", user.uid);
        const userData = await getDoc(userRef);

        if (!userData.exists()) {
            const { displayName, email, photoURL } = user;
            const createdAt = new Date();

            try {
                await setDoc(userRef, {
                    name: displayName ? displayName : name,
                    email,
                    photoURL: photoURL ? photoURL : "",
                    createdAt,
                });
                toast.success("Account Created!");
                setLoading(false);
            } catch (error) {
                toast.error(error.message);
                console.error("Error creating user document: ", error);
                setLoading(false);
            }
        }
    };

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='border shadow-sm p-10 w-[80%] md:w-[70%] lg:w-[40%] rounded-lg'>
                <h2 className='text-xl my-5'>Sign Up on <span className='text-emerald-700 font-bold'>PERFIN.</span></h2>
                <form>
                    <FormInput
                        type="text"
                        label={"Full Name"}
                        state={name}
                        setState={setName}
                        placeholder={"Duyen Pham"}
                    />
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
                    <FormInput
                        type="password"
                        label={"Confirm Password"}
                        state={confirmPassword}
                        setState={setConfirmPassword}
                        placeholder={"Example123"}

                    />
                    <div>
                        <Button disable={loading}
                            text={loading ? "Loading..." : "Signup Using Email & Password"}
                            onClick={signupWithEmail}
                        />
                        <p>or</p>
                        <Button text={"Signup Using Email & Password"} green={true} />
                        <p className='text-center'>Had account already? <span className='cursor-pointer text-blue-500'>Sign In</span></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup