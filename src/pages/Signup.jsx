// import React, { useState } from 'react'
// import FormInput from '../components/common/FormInput'
// import Button from '../components/common/Button';
// import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth, provider, db } from "../firebase";
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { doc, setDoc, getDoc } from "firebase/firestore";

// // for redux

// import { setLoading, setNavigation } from '../actions/authActions';
// import { useDispatch, useSelector } from 'react-redux';

// const Signup = () => {

//     // local state

//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");

//     // global state

//     const dispatch = useDispatch();
//     const loading = useSelector((state) => state.auth.loading);
//     const { navigate } = useSelector((state) => state.auth);

//     const signupWithEmail = async () => {
//         dispatch(setLoading(true));

//         console.log("Name", name);
//         console.log("Email", email);
//         console.log("Password", password);
//         console.log("Confirm Password", confirmPassword);

//         if (name && email && password && confirmPassword) {
//             if (password === confirmPassword) {
//                 try {
//                     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//                     const user = userCredential.user;
//                     console.log("User >>>>", user);
//                     await CreateUserDocument(user);
//                     toast.success("User created!");
//                     dispatch(setLoading(false));

//                     setName("");
//                     setEmail("");
//                     setPassword("");
//                     setConfirmPassword("");
//                     dispatch(setNavigation('/dashboard'));
//                 } catch (error) {
//                     toast.error(error.message);
//                     dispatch(setLoading(false));
//                 }
//             } else {
//                 toast.error("Password and confirmed password don't match!");
//                 dispatch(setLoading(false));
//             }
//         } else {
//             toast.error("All fields are mandatory!");
//             dispatch(setLoading(false));
//         }
//     };


//     // Create doc whenever new user created 

//     return (
//         <div className='w-full h-screen flex justify-center items-center'>
//             <div className='border shadow-sm p-10 w-[80%] md:w-[70%] lg:w-[40%] rounded-lg'>
//                 <h2 className='text-xl my-5'>Sign Up on <span className='text-emerald-700 font-bold'>PERFIN.</span></h2>
//                 <form>
//                     <FormInput
//                         type="text"
//                         label={"Full Name"}
//                         state={name}
//                         setState={setName}
//                         placeholder={"Duyen Pham"}
//                     />
//                     <FormInput
//                         type="email"
//                         label={"Email"}
//                         state={email}
//                         setState={setEmail}
//                         placeholder={"duyenpham@gmail.com"}
//                     />
//                     <FormInput
//                         type="password"
//                         label={"Password"}
//                         state={password}
//                         setState={setPassword}
//                         placeholder={"Example123"}
//                     />
//                     <FormInput
//                         type="password"
//                         label={"Confirm Password"}
//                         state={confirmPassword}
//                         setState={setConfirmPassword}
//                         placeholder={"Example123"}

//                     />
//                     <div>
//                         <Button disable={loading}
//                             text={loading ? "Loading..." : "Signup Using Email & Password"}
//                             onClick={signupWithEmail}
//                         />
//                         <p>or</p>
//                         <Button
//                             onClick={GoogleAuth}
//                             text={"Signup Using Gmail"} green={true} />
//                         <p className='text-center'>Had account already? <span className='cursor-pointer text-blue-500'>Sign In</span></p>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export const CreateUserDocument = async (user, name) => {
//     if (!user) return;

//     const userRef = doc(db, "users", user.uid);
//     const userData = await getDoc(userRef);

//     if (!userData.exists()) {
//         const { displayName, email, photoURL } = user;
//         const createdAt = new Date();

//         try {
//             await setDoc(userRef, {
//                 name: displayName ? displayName : name,
//                 email,
//                 photoURL: photoURL ? photoURL : "",
//                 createdAt,
//             });
//             toast.success("Account Created!");
//         } catch (error) {
//             toast.error(error.message);
//             console.error("Error creating user document: ", error);
//         }
//     }
// };

// export const GoogleAuth = () => {
//     const dispatch = useDispatch();
//     const loading = useSelector((state) => state.auth.loading);
//     const { navigate } = useSelector((state) => state.auth);

//     dispatch(setLoading(true));
//     try {
//         signInWithPopup(auth, provider)
//             .then((result) => {
//                 const credential = GoogleAuthProvider.credentialFromResult(result);
//                 const token = credential.accessToken;
//                 const user = result.user;
//                 CreateUserDocument(user)
//                 console.log("user >>>", user)
//                 toast.success("User authenticated!")
//                 dispatch(setNavigation('/dashboard'));
//             }).catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 toast.error(errorMessage)
//                 dispatch(setLoading(false));
//             })
//     } catch (e) {
//         toast.error(e.message)
//         dispatch(setLoading(false));
//     }
// }

// export default Signup


import React, { useState } from 'react';
import FormInput from '../components/common/FormInput';
import Button from '../components/common/Button';
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../firebase";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { setLoading, setNavigation } from '../actions/authActions';
import { useDispatch, useSelector } from 'react-redux';

// Create doc whenever new user is created
export const createUserDocument = async (user, name) => {
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

export const googleAuth = async (dispatch, navigate) => {
    dispatch(setLoading(true));
    try {
        const result = await signInWithPopup(auth, provider);
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        await createUserDocument(user);
        toast.success("User authenticated!");
        dispatch(setNavigation('/dashboard'));
        navigate('/dashboard');  // Navigate to dashboard
    } catch (error) {
        toast.error(error.message);
    } finally {
        dispatch(setLoading(false));
    }
};

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth.loading);
    const navigate = useNavigate();

    const signupWithEmail = async (event) => {
        event.preventDefault();
        dispatch(setLoading(true));

        if (name && email && password && confirmPassword) {
            if (password === confirmPassword) {
                try {
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    const user = userCredential.user;
                    await createUserDocument(user, name);
                    toast.success("User created!");
                    setName("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                    dispatch(setNavigation('/dashboard'));
                    navigate('/dashboard');
                } catch (error) {
                    toast.error(error.message);
                } finally {
                    dispatch(setLoading(false));
                }
            } else {
                toast.error("Password and confirmed password don't match!");
                dispatch(setLoading(false));
            }
        } else {
            toast.error("All fields are mandatory!");
            dispatch(setLoading(false));
        }
    };

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='border shadow-sm p-10 w-[80%] md:w-[70%] lg:w-[40%] rounded-lg'>
                <h2 className='text-xl my-5'>Sign Up on <span className='text-emerald-700 font-bold'>PERFIN.</span></h2>
                <form onSubmit={signupWithEmail}>
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
                            type="submit"
                            onClick={signupWithEmail}
                        />
                        <p>or</p>
                        <Button
                            onClick={() => googleAuth(dispatch, navigate)}
                            text={"Signup Using Gmail"}
                            green={true}
                        />
                        <p className='text-center'>Had account already? <Link to="/signin"><span className='cursor-pointer text-blue-500'>Sign In</span></Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
