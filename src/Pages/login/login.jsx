import { useReducer, useRef, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import { useDispatch, useSelector } from "react-redux";
import Button from "../../Component/button/button";
import { loginAsync } from "../../Features/username/usernameSlice";

//firebase setup
import {auth} from "./../../firebase"
import {GoogleAuthProvider, signInWithPopup, onAuthStateChanged} from 'firebase/auth'
import axios from "axios";
import UrlAPI from "../../Features/API";
const provider = new GoogleAuthProvider()

export default function Login() {
    const _login = useRef();
    const _password = useRef();

    const dispatch = useDispatch()
    const userReducer = useSelector((state) => state.username.user)

    const onLoginWithGoogle = async() => {
        try {
            let response = await signInWithPopup(auth, provider)
            const signInWithGoogle = await axios.get(`${UrlAPI}/users?google=true&email=${response?._tokenResponse?.email}`)
            if(signInWithGoogle.data.length === 0){
                await axios.post(`${UrlAPI}/users`, {firstName: response?._tokenResponse?.firstName, lastName: response?._tokenResponse?.lastName, email: response?._tokenResponse?.email, username: response?._tokenResponse?.firstName, google: true})
            }

            setTimeout(() => {
                dispatch(loginAsync(response?._tokenResponse?.email, 'loginWithGoogle', true))
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    }

    const [showPass, setShowPass] = useState(false)
    const ShowPassword = () => {
        setShowPass(!showPass)
    }

    if (userReducer !== '') return <Navigate to="/" />

    return (
        <div className="register flex justify-between px-24 pt-2 gap-16">
            {userReducer ? null : <Toaster />}
            <div className="registerL flex-1">
                <div className="uppercase text-4xl font-bold mb-4">login</div>
                <div className="underline mb-4"><span className="hover:bg-black hover:text-white hover:cursor-pointer">Forgotten Your Password?</span></div>
                <div className="flex flex-col">
                    <input className="h-12 px-3 border-black border-[1px]" type="text" placeholder="Email or Username *" ref={_login} />
                    <div onClick={ShowPassword} className="flex items-center gap-2 my-3 justify-end hover:cursor-pointer">
                        <FaEye size={20} />
                        <div className="font-bold underline text-lg">Show</div>
                    </div>
                    <input className="h-12 px-3 border-black border-[1px]" type={showPass ? "text" : "password"} placeholder="Password *" ref={_password} />
                </div>
                <div className="mb-5 mt-5">
                    <div onClick={() => dispatch(loginAsync(_login.current.value, _password.current.value, false))}>
                        <Button borderColor='border-black' bgColor='bg-black' textColor='text-white' content='LOGIN' />
                    </div>
                    <div onClick={() => onLoginWithGoogle()}>
                        <Button borderColor='border-red-600' bgColor='bg-red-600' textColor='text-white' content='LOGIN WITH GOOGLE' />
                    </div>
                    <div className="text-md text-slate-500">By clicking "LOGIN", I am agreeing to be bound by the adidas <span className="underline text-black hover:bg-black hover:text-white hover:cursor-pointer">Terms and Conditions</span> (as may be updated from time to time), and the adidas <span className="underline text-black hover:bg-black hover:text-white hover:cursor-pointer">Privacy Notice</span></div>
                </div>
            </div>
            <div className="registerR flex-1">
                <div className="uppercase text-4xl font-bold mb-4">create an account</div>
                <div className="text-slate-900 pr-10">It's easy. Enter your email address, fill in the form on the left and enjoy the benefits of getting an account, like:</div>
                <div className="pl-3 mt-3.5">
                    <div className="flex items-center gap-3 mb-3">
                        <AiOutlineCheck size={20} color="rgb(15 23 42)" />
                        <div className="text-slate-900">Special priced products all year, every day</div>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                        <AiOutlineCheck size={20} color="rgb(15 23 42)" />
                        <div className="text-slate-900">Early access to SALE</div>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                        <AiOutlineCheck size={20} color="rgb(15 23 42)" />
                        <div className="text-slate-900">An overview of your personal information</div>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                        <AiOutlineCheck size={20} color="rgb(15 23 42)" />
                        <div className="text-slate-900">Track & trace of your order</div>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                        <AiOutlineCheck size={20} color="rgb(15 23 42)" />
                        <div className="text-slate-900">Manage Wishlist</div>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                        <AiOutlineCheck size={20} color="rgb(15 23 42)" />
                        <div className="text-slate-900">Faster Checkout</div>
                    </div>
                </div>
                <Link to='/register'>
                    <Button borderColor='border-black' bgColor='bg-black' textColor='text-white' content='REGISTER' />
                </Link>
            </div>
        </div>
    )
}