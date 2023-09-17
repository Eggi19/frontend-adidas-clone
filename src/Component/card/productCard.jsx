import { useState } from "react";
import { TbHeart } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function ProductCard(props) {
    const [image, setImage] = useState('')
    
    return (
        <div className="group relative w-[307px] h-auto flex flex-col border border-white justify-between hover:border hover:border-black">
            <div>
                <Link to={`/detailpage/${props?.allData?.id}`}>
                    <img src={image ? image : props?.img} alt="" />
                </Link>
                {
                    props?.allData?.types?.length > 1 ?
                        <div className="bg-slate-200 h-12 hidden group-hover:flex">
                            {
                                props?.productOption?.map(value => {
                                    return (
                                        <img onClick={() => setImage(value?.images?.main_images)} className="border-b-2 hover:border-black hover:border-b-2 hover" src={value.images.main_images} alt="" />
                                    )
                                })
                            }
                        </div>
                        : <div></div>
                }
                <div className="text-xs text-slate-500 px-2 py-2">Men {props?.type}</div>
                <div className="text-sm text-slate-700 px-2">{props?.title}</div>
                <div className="text-sm text-slate-700 px-2">Rp. {props?.price?.toLocaleString()}</div>
            </div>
            <div className="text-xs text-slate-500 px-2 pt-8 pb-2">{props?.color} color</div>
            <TbHeart className="absolute right-3 top-4" size={20} />
            <div className="absolute rotate-[-90deg] bg-white text-sm tracking-[0.2em] top-6"><em>NEW</em></div>
        </div>
    )
}