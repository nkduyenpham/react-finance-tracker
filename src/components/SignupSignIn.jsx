// import React, { useState } from 'react'
// import FormInput from './common/FormInput'
// import Button from './common/Button';
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";
// import { toast } from 'react-toastify';

// const SignupSignin = () => {

//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [loading, setLoading] = useState(false);

//     const signupWithEmail = () => {
//         setLoading(true)
//         console.log("Name", name)
//         console.log("email", email)
//         console.log("password", password)
//         console.log("confirmPassword", confirmPassword)
//         // authenticate the user, or create a new account using email and password
//         if (name !== "" && email !== "" && password !== "" && confirmPassword !== "") {
//             if (confirmPassword === password) {
//                 createUserWithEmailAndPassword(auth, email, password)
//                     .then((userCredential) => {
//                         // Signed up 
//                         const user = userCredential.user;
//                         console.log("user >>>>", user)
//                         toast.success("User created!")
//                         setLoading(false)
//                         setName("")
//                         setEmail("")
//                         setPassword("")
//                         setConfirmPassword("")
//                         createDoc(user)
//                         // Create a document with the user id as the following ids
//                     })
//                     .catch((error) => {
//                         const errorCode = error.code;
//                         const errorMessage = error.message;
//                         toast.error(errorMessage)
//                         setLoading(false)
//                         // ..
//                     });
//             } else {
//                 toast.error("Password and confirmed Password don't match!")
//                 setLoading(false)
//             }
//         } else {
//             toast.error("All fields are mandatory!")
//             setLoading(false)
//         }
//     }

//     const createDoc = (user) => {
//         // Make sure that the doc with the  uid doesn't exist
//         // Create a doc
//     }

//     const loginUsingEmail = () => {
//         console.log("login using email")
//     }

//     return (
//         <div className='border shadow-sm p-10 w-[80%] md:w-[70%] lg:w-[50%] rounded-lg'>
//             <h2 className='text-xl my-5'>Sign Up on <span className='text-emerald-700 font-bold'>PERFIN.</span></h2>
//             <form>
//                 <FormInput
//                     type="text"
//                     label={"Full Name"}
//                     state={name}
//                     setState={setName}
//                     placeholder={"Duyen Pham"}
//                 />
//                 <FormInput
//                     type="email"
//                     label={"Email"}
//                     state={email}
//                     setState={setEmail}
//                     placeholder={"duyenpham@gmail.com"}
//                 />
//                 <FormInput
//                     type="password"
//                     label={"Password"}
//                     state={password}
//                     setState={setPassword}
//                     placeholder={"Example123"}
//                 />
//                 <FormInput
//                     type="password"
//                     label={"Confirm Password"}
//                     state={confirmPassword}
//                     setState={setConfirmPassword}
//                     placeholder={"Example123"}

//                 />
//                 <div>
//                     <Button disable={loading}
//                         text={loading ? "Loading..." : "Signup Using Email & Password"}
//                         onClick={signupWithEmail}
//                     />
//                     <p>or</p>
//                     <Button text={"Signup Using Email & Password"} green={true} />
//                     <p className='text-center'>Had account already? <span className='cursor-pointer text-blue-500' onClick={() => setLoginForm(!loginForm)}>Sign In</span></p>
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default SignupSignin

import React from 'react'

const SignupSignIn = () => {
    return (
        <div>SignupSignIn</div>
    )
}

export default SignupSignIn