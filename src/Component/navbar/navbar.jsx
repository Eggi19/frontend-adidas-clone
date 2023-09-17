import Flag from 'react-flagkit';
import { GrShop } from "react-icons/gr";
import { AiOutlineSearch } from "react-icons/ai";
import { Dropdown } from 'flowbite-react';

import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { Logout } from '../../Features/username/usernameSlice';
import { useEffect } from 'react';
import { getCartAsync } from '../../Features/username/transactionSlice';

export default function Navbar() {
    const userReducer = useSelector((state) => state.username)
    const qty = useSelector((state) => state.transaction.qty)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCartAsync())
    }, [])

    return (
        <div className='navbar sticky top-0 z-40 bg-white'>
            <div className="navbar-top text-sm flex gap-5 justify-end pr-12 mt-2.5">
                <div>order status</div>
                <div>help</div>
                <div>newsletter signup</div>
                <div className='flag flex'><Flag country="GB" size={16} /></div>
                {
                    userReducer.user !== "" ?
                        <div className='font-bold'>
                            <Dropdown
                                label={`Hi, ${userReducer.user}`}
                                inline={true}
                            >
                                <Link to='/login'>
                                    <div className='px-2' onClick={() => dispatch(Logout())}>
                                        Logout
                                    </div>
                                </Link>
                            </Dropdown>
                        </div>
                        :
                        <Link to='/login'>
                            <div>login</div>
                        </Link>
                }
            </div>
            <div className='navbar-bottom flex justify-end gap-48 my-3 pr-12 mb-0'>
                <div className='navbar-bottomL font-semibold text-lg flex justify-center gap-5'>
                    <Link to='/product'>
                        <div className='h-[40px] hover:border-b-black hover:border-b-4 hover:cursor-pointer uppercase'>Men</div>
                    </Link>
                    <Link to='/product'>
                        <div className='h-[40px] hover:border-b-black hover:border-b-4 hover:cursor-pointer uppercase'>Women</div>
                    </Link>
                    <Link to='/product'>
                        <div className='h-[40px] hover:border-b-black hover:border-b-4 hover:cursor-pointer uppercase'>Kids</div>
                    </Link>
                    <Link to='/product'>
                        <div className='font-light h-[40px] hover:border-b-black hover:border-b-4 hover:cursor-pointer uppercase'>Sports</div>
                    </Link>
                    <Link to='/product'>
                        <div className='font-light h-[40px] hover:border-b-black hover:border-b-4 hover:cursor-pointer uppercase'>Brands</div>
                    </Link>
                    <Link to='/product'>
                        <div className='h-[40px] hover:border-b-black hover:border-b-4 hover:cursor-pointer uppercase'>Outlet</div>
                    </Link>
                </div>
                <div className='navbar-bottomR flex gap-3 relative'>
                    <input className='text-sm bg-slate-200 w-52 h-8 pl-3 pr-8' type="text" placeholder='Search' />
                    <AiOutlineSearch className='absolute right-10 top-1' size={25} />
                    <Link to='/cart'>
                        <GrShop className='mt-1' size={25} />
                        {
                            qty ?
                                <div className='absolute top-0 right-[-7px] w-4 h-4 text-sm bg-blue-600 rounded-full text-white flex justify-center items-center'>{qty}</div>
                                : null
                        }
                    </Link>
                </div>
            </div>
            <Link to='/'>
                <img className='w-20 absolute top-1 left-16' src="https://www.adidas.co.id/media/logo/adidas-logo.png" alt="" />
            </Link>
            <hr />
        </div>
    )
}