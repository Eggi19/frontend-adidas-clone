import { Link } from "react-router-dom"

export default function CardWhatsHot(props) {
    return (
        <div className="w-64 h-[500px] flex flex-col justify-between">
            <div>
                <img src={props.img} alt="" />
                <div className="my-2">
                    <div className="font-bold">{props.title}</div>
                    <div>{props.content}</div>
                </div>
            </div>
            <div className="underline text-xs tracking-widest font-bold"><Link to='/product'><span className="hover:bg-black hover:text-white hover:cursor-pointer">SHOP NOW</span></Link></div>
        </div>
    )
}