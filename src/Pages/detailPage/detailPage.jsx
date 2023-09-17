import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import UrlAPI from "../../Features/API"
import { useEffect, useState } from "react"
import { Dropdown } from "flowbite-react"
import Button from "../../Component/button/button"
import { TbHeart } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux"
import toast, { Toaster } from 'react-hot-toast';
import { getCartAsync } from "../../Features/username/transactionSlice"

export default function DetailPage() {
    const params = useParams()
    const [getData, setGetData] = useState(null)
    const [detailImage, setDetailImage] = useState('')
    const [TypeIndex, setTypeIndex] = useState(0)
    const [selectedSize, setSelectedSize] = useState(0)
    const userReducer = useSelector((state) => state.username)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getDataAsync = async () => {
        try {
            const response = await axios.get(`${UrlAPI}/products/${params.id}?_embed=types`)
            setGetData(response.data)
        } catch (error) {

        }
    }

    const updateCartAsync = async () => {
        try {
            if(getData?.types[TypeIndex].stock > 0){
                if (selectedSize === 0) {
                    throw { message: `Size is Empty` }
                }
                const findCart = await axios.get(`${UrlAPI}/carts?userId=${userReducer.id}&productId=${parseInt(params.id)}&typeId=${getData?.types[TypeIndex].id}&size=${selectedSize}`)

                if(findCart.data.length){
                    await axios.patch(`https://mesquite-shell-titanosaurus.glitch.me/carts/${findCart.data[0].id}`, {quantity: findCart.data[0].quantity+1})
                    navigate ('/cart')
                }else{
                    await axios.post(`${UrlAPI}/carts`, { userId: userReducer.id, productId: parseInt(params.id), typeId: getData?.types[TypeIndex].id, size: selectedSize, quantity: 1 })
                    navigate ('/cart')
                }
            }else{
                throw { message: `Product is Sold Out` }
            }

            dispatch(getCartAsync())
        } catch (error) {
            toast.error(error.message)
        }
    }

    const onSetSelectedType = (_index, _img) => {
        setTypeIndex(_index)
        setDetailImage(_img)
        setSelectedSize(0)
    }

    const onSelectedSize = (_size) => {
        setSelectedSize(_size)
    }

    useEffect(() => {
        getDataAsync()
    }, [])

    return (
        <div className="flex">
            <Toaster />
            <div className="flex flex-col gap-4 w-[60%] border-2">
                <div className="flex justify-center relative">
                    <img className="" src={detailImage ? detailImage : getData?.types[TypeIndex].images.main_images} alt="" />
                    <div className="flex flex-wrap justify-center absolute bottom-0 gap-3">
                        {
                            getData?.types[TypeIndex].images.detail_images.map(value => {
                                return (
                                    <img onClick={() => setDetailImage(value)} className="border border-black h-14" src={value} alt="" />
                                )
                            })
                        }
                    </div>
                </div>
                <div className="flex justify-center gap-2">
                    <div className="w-14 uppercase text-xs flex items-center italic font-semibold">{getData?.types.length} warna tersedia</div>
                    <div className="flex gap-2">
                        {
                            getData?.types.map((value1, index1) => {
                                return (
                                    <div className="w-16">
                                        <img onClick={() => onSetSelectedType(index1, value1?.images.main_images)} src={value1?.images.main_images} alt="" />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="flex justify-center gap-8 text-sm font-semibold py-8 border-b-2 border-t-2">
                    <div>GALLERY</div>
                    <div>DESCRIPTION</div>
                    <div>DETAILS</div>
                    <div>REVIEWS</div>
                </div>
                <div className="px-4 py-2">
                    <div className="font-bold text-3xl">
                        {getData?.name}
                    </div>
                    <div className="font-semibold italic text-md mt-3">
                        CASUAL CYCLING SHOES MADE IN PART WITH RECYCLED AND VEGAN MATERIALS.
                    </div>
                    <div className="text-sm mt-3">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet cum reprehenderit cumque optio, debitis sit odit non nostrum. Amet et eum itaque non quisquam enim mollitia quam corporis! In, eius. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, repudiandae nemo hic laboriosam ipsam soluta quo fugiat nam mollitia nisi veniam libero quasi quas corporis velit! Cupiditate saepe quos sunt? Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, soluta iusto a obcaecati distinctio excepturi illo porro eligendi minima provident quidem reiciendis ut. Nostrum, aliquam exercitationem alias itaque corporis quisquam!
                    </div>
                    <div className="font-bold text-3xl mt-3">
                        SPECIFITACIONS
                    </div>
                    <div className="flex gap-64 px-10 mt-3 leading-8">
                        <ul className="list-disc">
                            <li>Regular fit</li>
                            <li>Vegan upper</li>
                            <li>Reflective details</li>
                            <li>Product Code: GY5597</li>
                        </ul>
                        <ul className="list-disc">
                            <li>Lace closure</li>
                            <li>Textile lining</li>
                            <li>Stiff nylon insole board</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="w-[40%] p-10">
                <div className="text-3xl flex-1 font-semibold italic">{getData?.name}</div>
                <div className="my-6 text-sm">{getData?.types[TypeIndex].color}</div>
                <div className="font-bold text-lg">Rp. {getData?.price.toLocaleString()}</div>
                <div className="text-xs tracking-widest font-bold mt-6">SELECT SIZE</div>
                <div className="border border-black hover:border-2 flex justify-center items-center my-3 w-[90px] h-[40px]">
                    <Dropdown
                        label={selectedSize === 0 ? "SIZE" : selectedSize}
                        inline={true}
                    >
                        {
                            getData?.types[TypeIndex].size.map(value => {
                                return (
                                    <Dropdown.Item onClick={() => onSelectedSize(value)}>
                                        {value}
                                    </Dropdown.Item>
                                )
                            })
                        }
                    </Dropdown>
                </div>
                <div className="font-semibold">Stock: {getData?.types[TypeIndex].stock}</div>
                <div className="flex gap-3 my-3">
                    {
                        userReducer.user ?
                            <div className="flex gap-3 my-3">
                                <div onClick={updateCartAsync} className="w-full flex justify-center items-center">
                                    <Button width='full' borderColor='border-black' bgColor='bg-black' textColor='text-white' content='ADD TO BAG' />
                                </div>
                                <div className="w-[50px] h-[50px] flex justify-center items-center border border-black">
                                    <TbHeart size={25} />
                                </div>
                            </div>
                            : <div></div>
                    }
                </div>
            </div>
        </div>
    )
}