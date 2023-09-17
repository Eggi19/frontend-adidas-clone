import { TbTruckDelivery } from "react-icons/tb";
import { GoMail } from "react-icons/go";
import { AiOutlineCheck } from "react-icons/ai";
import { IoReturnUpBackSharp } from "react-icons/io5";
import ProductCard from "../../Component/card/productCard";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Dropdown } from "flowbite-react";
import Button from "../../Component/button/button";

export default function Product() {
    const [DataProduct, setDataProduct] = useState([])
    const [categoryProduct, setCategoryProduct] = useState([])

    const _min = useRef(0)
    const _max = useRef(0)

    const getDataProduct = async () => {
        try {
            let response = await axios.get(`https://mesquite-shell-titanosaurus.glitch.me/products?_embed=types&_expand=category`)
            setDataProduct(response.data)
        } catch (error) {

        }
    }

    const getCategoryProduct = async () => {
        try {
            let response = await axios.get('https://mesquite-shell-titanosaurus.glitch.me/categories')
            setCategoryProduct(response.data)
        } catch (error) {

        }
    }

    const onFilterCategory = async (_selectedCategory) => {
        try {
            if (_selectedCategory === 0) {
                var response = await axios.get('https://mesquite-shell-titanosaurus.glitch.me/products?_embed=types&_expand=category')
            } else {
                var response = await axios.get(`https://mesquite-shell-titanosaurus.glitch.me/products?_embed=types&_expand=category&categoryId=${_selectedCategory}`)
            }
            setDataProduct(response.data)
        } catch (error) {

        }
    }

    const onFilterPrice = async (_min, _max) => {
        try {
            const response = await axios.get(`https://mesquite-shell-titanosaurus.glitch.me/products?_expand=category&price_gte=${_min}&price_lte=${_max}`)
            setDataProduct(response.data)
        } catch (error) {

        }
    }
    console.log(DataProduct);
    useEffect(() => {
        getDataProduct()
        getCategoryProduct()
    }, [])

    return (
        <div>
            <div className="flex justify-center gap-10 py-2 border-b-[3px]">
                <div className="flex items-center gap-2"><TbTruckDelivery size={25} />FREE DELIVERY ON ORDERS ABOVE RP 900K</div>
                <div className="flex items-center gap-2"><GoMail size={20} />CHAT WITH US</div>
                <div className="flex items-center gap-2"><AiOutlineCheck size={20} />AKULAKU INSTALLMENT AVAILABLE NOW!</div>
            </div>
            <div className="flex items-center gap-2 px-6 py-2">
                <IoReturnUpBackSharp size={25} />
                <div className="font-semibold tracking-widest underline">BACK</div>
                <div className="text-xs underline pl-2">MEN</div>
            </div>
            <div className="pt-2 pb-4">
                <em className="text-4xl px-6">MEN</em>
            </div>
            <div className="px-6">
                <div className="flex justify-between border border-black h-14 items-center px-4">
                    <div className="flex gap-4 items-center">
                        <div className="font-light border border-white text-sm py-2 px-4 tracking-widest hover:cursor-pointer hover:border hover:border-black hover:py-2 hover:px-4">
                            <Dropdown
                                label="PRICE"
                                inline={true}
                            >
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center">
                                        <div>Rp. </div>
                                        <input ref={_min} type="text" placeholder="Min Price" />
                                    </div>
                                    <div className="flex justify-center">to</div>
                                    <div className="flex items-center">
                                        <div>Rp. </div>
                                        <input ref={_max} type="text" placeholder="Max price" />
                                    </div>
                                    <div onClick={() => onFilterPrice(_min.current.value, _max.current.value)}>
                                        <Button borderColor='border-black' bgColor='bg-black' textColor='text-white' content='FILTER' />
                                    </div>
                                </div>
                            </Dropdown>
                        </div>
                        <div className="font-light border border-white text-sm py-2 px-4 tracking-widest hover:cursor-pointer hover:border hover:border-black hover:py-2 hover:px-4">SIZE</div>
                        <div className="font-light border border-white text-sm py-2 px-4 tracking-widest hover:cursor-pointer hover:border hover:border-black hover:py-2 hover:px-4">
                            <Dropdown
                                label="DISCOUNT"
                                inline={true}
                            >
                                {

                                }
                            </Dropdown>
                        </div>
                        <div className="font-light border border-white text-sm py-2 px-4 tracking-widest hover:cursor-pointer hover:border hover:border-black hover:py-2 hover:px-4">CORPORATE MARKETING LINE</div>
                        <div className="font-light border border-white text-sm py-2 px-4 tracking-widest hover:cursor-pointer hover:border hover:border-black hover:py-2 hover:px-4">
                            <Dropdown
                                label="PRODUCT TYPE"
                                inline={true}
                            >
                                <Dropdown.Item onClick={() => onFilterCategory(0)}>
                                    ALL
                                </Dropdown.Item>
                                {
                                    categoryProduct.map(value => {
                                        return (
                                            <Dropdown.Item className="uppercase" onClick={() => onFilterCategory(value.id)}>
                                                {value.category}
                                            </Dropdown.Item>
                                        )
                                    })
                                }
                            </Dropdown>
                        </div>
                    </div>
                    <div className="flex gap-8">
                        <div className="font-light border border-white text-sm py-2 px-4 tracking-widest hover:cursor-pointer hover:border hover:border-black hover:py-2 hover:px-4">MORE FILTERS</div>
                        <div className="font-light border border-white text-sm py-2 px-4 tracking-widest hover:cursor-pointer hover:border hover:border-black hover:py-2 hover:px-4">RECOMMENDED</div>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 my-9">
                {
                    DataProduct?.map(value => {
                        console.log(value);
                        return (
                            <ProductCard allData={value} productOption={value?.types} type={value?.category?.category} img={value?.types[0]?.images?.main_images} title={value?.name} price={value?.price} color={value?.types?.length} />
                        )
                    })
                }
            </div>
            <div className="flex gap-8 text-sm text-justify px-24 py-12 leading-5 bg-slate-200">
                <div className="flex-1">
                    <div className="font-bold mb-4">
                        MEN’S SHOES
                    </div>
                    <div className="">
                        A pair of adidas shoes, for casual or sporting activities, is a must have for men of all ages. A great way to finish off your outfit with style and look the part, no matter the occasion, is to choose your shoes wisely, and adidas is here to help with our range of shoes for men.
                    </div>
                    <div className="font-bold my-4">
                        SPORTING ESSENTIALS TO HELP YOU TRAIN LIKE A PRO
                    </div>
                    <div>
                        Choose your men’s shoes with care, taking into consideration the return you want to see from your activity, whether for a day on the golf course, a training session for the next football season, a running plan for a marathon, or hiking in the mountains. The adidas range of shoes for men is designed using state-of-the-art technology and innovative features that will suit your exercise style. Football boots exist to play on soft ground with agility stud configuration, or hard ground with lightweight, firm ground outsoles. Up your game with a pair of football shoes that hug your feet with a lightweight mesh upper. Golfers can choose shoes with a Primeknit upper that molds itself to your foot or a pair with a leather upper that keeps your feet warm and dry on cold, wet golf days. Challenge your personal best with a pair of adidas running shoes for men made with advanced Boost technology in the midsole that gives you extra lift with every step. Hikers, pick up a pair of lightweight GORE-TEX® shoes to keep your feet dry on rainy days.
                    </div>
                </div>
                <div className="flex-1">
                    <div className="font-bold mb-4">
                        THE ULTIMATE ONLINE DESTINATION FOR ADIDAS MEN’S SPORTS SHOES
                    </div>
                    <div>
                        Relax after exercising by hanging out with your mates about town in an iconic pair of adidas casual trainers with soft leather uppers and the iconic 3-Stripes boasting your loyalty to the brand. Alternatively, you can make a statement with a pair of retro trainers with a design based on the track shoes of the 1970s, with a nylon upper that remains true to the style of the time. With such a wide range of men’s shoes by adidas, you will be sure to find the design, colour, and style that is right for you.
                    </div>
                    <div>
                        Exercise is a way of life, feel the adrenaline kick-in, and achieve your sporting goals. Adidas gives you the latest sports shoe technology, supporting you in your daily routines. Maximize your potential and prevent injuries with adidas’s premium quality designs. The adidas indonesia official online store ranges sports shoes for running, training, basketball, tennis, football, alongside adidas originals for everyday style. We stock a wide range of colors and designs - check out our collection today.
                    </div>
                </div>
            </div>
        </div>
    )
}