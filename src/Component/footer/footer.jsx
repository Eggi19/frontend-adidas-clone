import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { BsChatLeftText } from "react-icons/bs";
import Flag from "react-flagkit";

export default function Footer(){
    return(
        <div className="footer">
            <div className="footerTop bg-black flex justify-between h-[150px] items-center px-56 mb-8">
                <div className="uppercase text-white text-3xl font-bold w-[440px]">register your email for news and special offers</div>
                <div className="flex items-center gap-2">
                    <input className="h-12 pl-3 w-[300px]" type="text" placeholder="Your Email Address *" />
                    <HiOutlineArrowLongRight size={35} color="white" />
                </div>
            </div>
            <div className="footerCenter flex justify-between px-64">
                <div>
                    <div className="uppercase text-lg font-bold mb-3">products</div>
                    <div className="flex flex-col gap-1 text-slate-800">
                        <div className="text-sm hover:underline hover:cursor-pointer">Shoes</div>
                        <div className="text-sm hover:underline hover:cursor-pointer">Apparels</div>
                    </div>
                    <div className="uppercase text-lg font-bold mb-3 mt-3">featured</div>
                    <div className="flex flex-col gap-1 text-slate-800">
                        <div className="text-sm hover:underline hover:cursor-pointer">New Apparels</div>
                        <div className="text-sm hover:underline hover:cursor-pointer">Impossible is Nothing</div>
                        <div className="text-sm hover:underline hover:cursor-pointer">Sale</div>
                        <div className="text-sm hover:underline hover:cursor-pointer">Last Chance</div>
                    </div>
                </div>
                <div>
                    <div className="uppercase text-lg font-bold mb-3">sport</div>
                    <div className="flex flex-col gap-1 text-slate-800">
                        <div className="text-sm hover:underline hover:cursor-pointer">Predator Football Boots</div>
                        <div className="text-sm hover:underline hover:cursor-pointer">X Football Boots</div>
                        <div className="text-sm hover:underline hover:cursor-pointer">Copa Football Boots</div>
                        <div className="text-sm hover:underline hover:cursor-pointer">Manchester United</div>
                        <div className="text-sm hover:underline hover:cursor-pointer">Real Madrid</div>
                        <div className="text-sm hover:underline hover:cursor-pointer">Arsenal</div>
                        <div className="text-sm hover:underline hover:cursor-pointer">Bayern Munchen</div>
                        <div className="text-sm hover:underline hover:cursor-pointer">Boost Shoes</div>
                        <div className="text-sm hover:underline hover:cursor-pointer">Ultraboost</div>
                    </div>
                </div>
                <div>
                    <div className="uppercase text-lg font-bold mb-3">collections</div>
                    <div className="flex flex-col gap-1 text-slate-800">
                        <div className="text-sm hover:underline hover:cursor-pointer">Stan Smith</div>
                        <div className="text-sm hover:underline hover:cursor-pointer">Superstar</div>
                        <div className="text-sm hover:underline hover:cursor-pointer">Ultraboost</div>
                        <div className="text-sm hover:underline hover:cursor-pointer">NMD</div>
                        <div className="text-sm hover:underline hover:cursor-pointer">adidas Exclusive</div>
                    </div>
                </div>
                <div>
                    <div className="uppercase text-lg font-bold mb-3">legal</div>
                    <div className="flex flex-col gap-1 text-slate-800">
                        <div className="text-sm hover:underline hover:cursor-pointer">Privacy Policy</div>
                        <div className="text-sm hover:underline hover:cursor-pointer">Terms and Conditions</div>
                        <div className="text-sm hover:underline hover:cursor-pointer">Delivery Terms</div>
                    </div>
                    <div className="uppercase text-lg font-bold mb-3 mt-3">support</div>
                    <div className="flex flex-col gap-1 text-slate-800">
                        <div className="text-sm hover:underline hover:cursor-pointer">Contact Us</div>
                        <div className="text-sm hover:underline hover:cursor-pointer">Ordering</div>
                        <div className="text-sm hover:underline hover:cursor-pointer">Size Charts</div>
                        <div className="text-sm hover:underline hover:cursor-pointer">Promotions & Vouchers</div>
                        <div className="text-sm hover:underline hover:cursor-pointer">Payment</div>
                        <div className="text-sm hover:underline hover:cursor-pointer">Delivery</div>
                        <div className="text-sm hover:underline hover:cursor-pointer">Returns and Refunds</div>
                        <div className="text-sm hover:underline hover:cursor-pointer">About adidas Products</div>
                        <div className="text-sm hover:underline hover:cursor-pointer">Using Our Site</div>
                        <div className="text-sm hover:underline hover:cursor-pointer">Your Account</div>
                        <div className="text-sm hover:underline hover:cursor-pointer">Order Tracker</div>
                    </div>
                </div>
            </div>
            <div className="footerBottom flex justify-between bg-slate-800 h-10 text-slate-300 px-64 mt-6">
                <div className="flex items-center gap-1 hover:underline hover:cursor-pointer">
                    <Flag country="ID" size={16} />
                    <div className="text-xs">Indonesia</div>
                </div>
                <div className="flex text-xs items-center gap-2">
                    <div className="hover:underline hover:cursor-pointer">Privacy Policy</div>
                    <div className="w-32 text-center border-l hover:underline hover:cursor-pointer">Terms and Conditions</div>
                    <div>© 2021 adidas Indonesia</div>
                </div>
            </div>
            <div className="chat fixed bottom-[10px] right-5 w-[50px] h-[50px] bg-black rounded-full flex items-center justify-center hover:cursor-pointer">
                <BsChatLeftText size={25} color="white"/>
            </div>
        </div>
    )
}