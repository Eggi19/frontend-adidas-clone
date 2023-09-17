import axios from "axios"
import UrlAPI from "../../Features/API"
import { useDispatch, useSelector } from "react-redux"
import { getCartAsync } from "../../Features/username/transactionSlice"

export default function Card(props) {
    const dispatch = useDispatch()

    const updateQty = async (_condition, _userId, _productId, _typeId, _cartId) => {
        try {
            //increase or decrease qty
            const getStock = await axios.get(`${UrlAPI}/types/${_typeId}`)
            const getCart = await axios.get(`${UrlAPI}/carts?userId=${_userId}&productId=${_productId}&typeId=${_typeId}&id=${_cartId}`)
            const stock = getStock.data.stock
            const currentQty = getCart.data[0].quantity
            if (_condition === true) {
                if(stock > currentQty){
                    await axios.patch(`${UrlAPI}/carts/${_cartId}`, { quantity: currentQty + 1 })
                }
            } else if (_condition === false) {
                await axios.patch(`${UrlAPI}/carts/${_cartId}`, { quantity: currentQty - 1 })
            }

            //delete cart if qty = 0
            const getUpdateQty = await axios.get(`${UrlAPI}/carts?userId=${_userId}&productId=${_productId}&typeId=${_typeId}&id=${_cartId}`)
            let updatedQty = getUpdateQty.data[0].quantity
            if (updatedQty === 0) {
                await axios.delete(`${UrlAPI}/carts/${_cartId}`)
            }
            dispatch(getCartAsync())
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {
                props.data?.map((value, index) => {
                    return (
                        <div className="flex p-3 gap-4">
                            <div className="w-[25%]">
                                <img src={value?.type?.images?.main_images} alt="" />
                            </div>
                            <div className="w-[40%] flex flex-col justify-between text-sm">
                                <div>
                                    <div className="font-semibold mb-2">{value?.product?.name}</div>
                                    <div>Gender: Men</div>
                                    <div>Size: {value?.size}</div>
                                    <div>Color: {value?.type?.color}</div>
                                    <div>In Stock</div>
                                </div>
                            </div>
                            <div className="flex items-center justify-end w-[25%] gap-2">
                                <button onClick={() => updateQty(false, value?.userId, value?.productId, value?.typeId, value?.id)} className="bg-black text-white w-6 h-6">-</button>
                                <div>{value?.quantity}</div>
                                <button onClick={() => updateQty(true, value?.userId, value?.productId, value?.typeId, value?.id)} className="bg-black text-white w-6 h-6">+</button>
                            </div>
                            <div className="flex items-center justify-end w-[25%]">
                                <div>Rp {value?.product?.price.toLocaleString()}</div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}
