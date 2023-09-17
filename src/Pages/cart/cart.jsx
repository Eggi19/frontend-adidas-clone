import Button from "../../Component/button/button";
import { TbTruckDelivery } from "react-icons/tb";
import { AiOutlineCheck } from "react-icons/ai";
import { IoMdRefresh } from "react-icons/io";
import Card from "./card";
import { useDispatch, useSelector } from "react-redux";
import { updateStock } from "../../Features/username/transactionSlice";

export default function Cart() {
    const cartReducer = useSelector((state) => state.transaction.cart)
    const qty = useSelector((state) => state.transaction.qty)
    const dispatch = useDispatch()
    
    let totalTransaction = 0
    cartReducer?.map(value => {
        totalTransaction += value.product.price * value.quantity
    })

    return (
        <div className="flex px-4 pt-10 gap-14">
            <div className="cartL w-[60%]">
                <div className="flex justify-between items-center">
                    <div className="flex items-end gap-2">
                        <div className="text-3xl font-bold">YOUR BAG</div>
                        <div>{qty} ITEM</div>
                    </div>
                    <div className="underline text-sm"><span className="hover:bg-black hover:text-white hover:cursor-pointer">Continue Shopping</span></div>
                </div>
                <hr className="w-[60%] mt-8" />              
                    <Card data={cartReducer}/>
                <div onClick={() => dispatch(updateStock())} className="pl-3">
                    <Button width='80' borderColor='border-black' bgColor='bg-black' textColor='text-white' content='CHECKOUT' />
                </div>
                <div className="flex justify-between px-8">
                    <div className="flex items-center gap-2 w-[30%]">
                        <TbTruckDelivery size={30} />
                        <div className="text-md font-semibold">
                            Free Delivery on All Orders!
                        </div>
                    </div>
                    <div className="flex items-center gap-2 w-[30%]">
                        <IoMdRefresh size={30} />
                        <div className="text-md font-semibold">
                            Free & Easy Return
                        </div>
                    </div>
                    <div className="flex items-center gap-2 w-[30%]">
                        <AiOutlineCheck size={30} />
                        <div className="text-md font-semibold">
                            Akulaku Installment Available Now!
                        </div>
                    </div>
                </div>
            </div>
            <div className="cartR w-[40%]">
                <div className="bg-slate-200 mb-4">
                    <div className="p-4">
                        <div onClick={() => dispatch(updateStock())} className="w-full">
                            <Button width='full' borderColor='border-black' bgColor='bg-black' textColor='text-white' content='CHECKOUT' />
                        </div>
                        <div className="font-bold text-2xl mb-3">
                            ORDER SUMMARY:
                        </div>
                        <div className="bg-white">
                            <div className="flex flex-col gap-3 p-3">
                                <div className="border-b-[1px] border-b-slate-400 pb-3">{qty} Product</div>
                                <div className="flex justify-between border-b-[1px] border-b-slate-400 pb-3">
                                    <div>Product Total</div>
                                    <div>Rp {totalTransaction.toLocaleString()}</div>
                                </div>
                                <div className="flex justify-between border-b-[1px] border-b-slate-400 pb-3">
                                    <div>Delivery</div>
                                    <div>FREE</div>
                                </div>
                                <div className="flex justify-between items-center font-bold">
                                    <div>
                                        <div>Total</div>
                                        <div>(Inclusive of Tax)</div></div>
                                    <div>
                                        Rp {totalTransaction.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-slate-200">
                    <div className="p-4">
                        <div className="bg-white p-3">PROMO CODE</div>
                    </div>
                </div>
            </div>
        </div>
    )
}