import { AiOutlineCheck } from "react-icons/ai";
import { FaEye } from "react-icons/fa";

import { useRef, useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import Button from "../../Component/button/button";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Register() {
    const userReducer = useSelector((state) => state.username.user)

    const _firstName = useRef()
    const _lastName = useRef()
    const _phoneNumber = useRef()
    const _day = useRef()
    const _month = useRef()
    const _year = useRef()
    const _email = useRef()
    const _password = useRef()
    const _confirmPassword = useRef()
    const _username = useRef()

    const onRegister = async () => {
        try {
            const firstName = _firstName.current.value
            const lastName = _lastName.current.value
            const phoneNumber = _phoneNumber.current.value
            const day = _day.current.value
            const month = _month.current.value
            const year = _year.current.value
            const email = _email.current.value
            const password = _password.current.value
            const confirmPassword = _confirmPassword.current.value
            const username = _username.current.value

            let validationEmail = await axios.get(`https://mesquite-shell-titanosaurus.glitch.me/users?email=${email}`)
            let validationUsername = await axios.get(`https://mesquite-shell-titanosaurus.glitch.me/users?username=${username}`)

            if (!(firstName && lastName && phoneNumber && day && month && year && email && password && confirmPassword)) {
                throw { message: 'Complete your registration form!' }
            } else if (password !== confirmPassword) {
                throw { message: 'your password does not match!' }
            } else if (!email.includes('@')) {
                throw { message: 'your email is invalid!' }
            } else if (validationEmail.data.length !== 0) {
                throw { message: 'Email  has been registered' }
            } else if (validationUsername.data.length !== 0) {
                throw { message: 'Username  has been registered' }
            } else {
                await axios.post('https://mesquite-shell-titanosaurus.glitch.me/users', { firstName, lastName, phoneNumber, birthdate: `${year}-${month}-${day}`, email, username, password, confirmPassword })
            }

            _firstName.current.value = ''
            _lastName.current.value = ''
            _phoneNumber.current.value = ''
            _day.current.value = ''
            _month.current.value = ''
            _year.current.value = ''
            _email.current.value = ''
            _password.current.value = ''
            _confirmPassword.current.value = ''
            _username.current.value = ''
            toast.success('Register Success!')
        } catch (error) {
            toast.error(error.message)
        }
    }

    const [showPass, setShowPass] = useState(false)
    const [showConfirmPass, setShowConfirmPass] = useState(false)

    const ShowPassword = () => {
        setShowPass(!showPass);
    }

    const ShowConfirmPassword = () => {
        setShowConfirmPass(!showConfirmPass);
    }

    if (userReducer !== '') return <Navigate to="/" />

    return (
        <div className="register flex justify-between px-24 pt-2 gap-16">
            <Toaster />
            <div className="registerL flex-1">
                <div className="uppercase text-5xl font-bold mb-4">register</div>
                <div className="uppercase font-bold text-xl mb-4">your name</div>
                <div className="flex flex-col gap-4">
                    <input className="h-12 px-3 border-black border-[1px]" type="text" ref={_firstName} placeholder="First Name *" />
                    <input className="h-12 px-3 border-black border-[1px]" type="text" ref={_lastName} placeholder="Last Name *" />
                    <input className="h-12 px-3 border-black border-[1px]" type="text" ref={_phoneNumber} placeholder="Phone Number *" />
                </div>
                <div className="uppercase font-bold text-xl mb-4 mt-4">date of birth</div>
                <div className="flex flex-wrap gap-8 w-[500px]">
                    <input className="h-12 px-3 w-[145px] border-black border-[1px]" type="text" ref={_day} placeholder="dd *" />
                    <input className="h-12 px-3 w-[145px] border-black border-[1px]" type="text" ref={_month} placeholder="mm *" />
                    <input className="h-12 px-3 w-[145px] border-black border-[1px]" type="text" ref={_year} placeholder="yyyy *" />
                </div>
                <div className="uppercase font-bold text-xl mb-4 mt-4">gender (optional)</div>
                <div className="flex gap-9">
                    <div className="flex items-center gap-3">
                        <input id="gender" className="w-6 h-6 accent-black" type="radio" />
                        <div className="font-bold">Men</div>
                    </div>
                    <div className="flex items-center gap-3">
                        <input id="gender" className="w-6 h-6 accent-black" type="radio" />
                        <div className="font-bold">Women</div>
                    </div>
                </div>
                <div className="uppercase font-bold text-xl mb-4 mt-4">login details</div>
                <div className="flex flex-col">
                    <input className="h-12 px-3 border-black border-[1px] mb-4" type="text" ref={_email} placeholder="Email" />
                    <input className="h-12 px-3 border-black border-[1px]" type="text" ref={_username} placeholder="Username" />
                    <div className="flex flex-col">
                        <div onClick={ShowPassword} className="flex items-center gap-2 my-3 justify-end hover:cursor-pointer">
                            <FaEye size={20} />
                            <div className="font-bold underline text-lg">Show</div>
                        </div>
                        <input className="h-12 px-3 border-black border-[1px]" type={showPass ? "text" : "password"} ref={_password} placeholder="Password" />
                        <div className="text-sm px-5 text-slate-500">Please use 8+ characters, with at least 1 number and a mixture of big and small letters</div>
                    </div>
                    <div onClick={ShowConfirmPassword} className="flex items-center gap-2 my-3 justify-end hover:cursor-pointer">
                        <FaEye size={20} />
                        <div className="font-bold underline text-lg">Show</div>
                    </div>
                    <input className="h-12 px-3 border-black border-[1px]" type={showConfirmPass ? "text" : "password"} ref={_confirmPassword} placeholder="Confirm Password" />
                </div>
                <div className="mb-5 mt-5">
                    <div onClick={onRegister}>
                        <Button borderColor='border-black' bgColor='bg-black' textColor='text-white' content='SUBMIT' />
                    </div>
                    <div className="text-sm text-slate-500">By clicking "SUBMIT", I am agreeing to be bound by the adidas <span className="underline text-black hover:bg-black hover:text-white hover:cursor-pointer">Terms and Conditions</span> (as may be updated from time to time), and the adidas <span className="underline text-black hover:bg-black hover:text-white hover:cursor-pointer">Privacy Notice</span></div>
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
            </div>
        </div>
    )
}