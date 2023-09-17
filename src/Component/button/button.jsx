import { HiOutlineArrowLongRight } from "react-icons/hi2";

export default function Button(props) {
    return (
        <button className={`border mb-2 ${props.borderColor} w-${props.width}`}>
            <div className={`w-${props.width} relative top-[-3px] left-[-3px] ${props.bgColor} text-sm ${props.textColor} flex gap-2 justify-between items-center py-2 px-6 active:top-0 active:left-0`}>
                <div>
                {props.content}
                </div>
                <div>
                <HiOutlineArrowLongRight size={30} />
                </div>
            </div>
        </button>
    )
}