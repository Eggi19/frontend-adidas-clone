import CardWhatsHot from "../../Component/card/whatsHot";
import Button from "../../Component/button/button";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from "react-router-dom";

export default function Home() {

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4.5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    }

    return (
        <div>
            <div className="relative mb-2">
                <img src="https://www.adidas.co.id/media/scandiweb/slider/m/h/mh-d-bape-2023.png" alt="jumbotron" />
                <div className="absolute bottom-32 left-[137px]">
                    <div className="text-lg mb-5">adidas CAMPUS 80s BAPE®</div>
                    <Link to='/product'>
                        <Button borderColor='border-black' bgColor='bg-black' textColor='text-white' content='SHOP NOW' />
                    </Link>
                </div>
            </div>

            <div className="relative mb-2">
                <img src="https://www.adidas.co.id/media/scandiweb/slider/m/h/mh-d-hoc.png" alt="jumbotron2" />
                <div className="absolute bottom-32 left-[137px]">
                    <div className="font-bold text-4xl text-white">HOME OF CLASSICS</div>
                    <div className="font-normal text-lg my-4 text-white">Three classics, timeless for a reason</div>
                    <Link to='/product'>
                        <Button borderColor='border-white' bgColor='bg-white' textColor='text-black' content='SHOP NOW' />
                    </Link>
                </div>
            </div>

            <div className="relative">
                <img src="https://www.adidas.co.id/media/scandiweb/slider/p/e/performance_mh_desktop_1920x720px_1.jpg" alt="jumbotron3" />
                <div className="absolute bottom-32 left-[137px]">
                    <div className="font-normal my-4 text-white text-lg">Get Raya-ready with new outfits!</div>
                    <Link to='/product'>
                        <Button borderColor='border-white' bgColor='bg-white' textColor='text-black' content='SHOP NOW' />
                    </Link>
                </div>
            </div>

            <div className="mx-10 my-5">
                <div className="text-3xl font-bold mb-4">WHAT'S HOT</div>
                <div className="m-0">
                    <Carousel responsive={responsive}>
                        <CardWhatsHot img="https://www.adidas.co.id/media/wysiwyg/Originals_TC_1050x1400px.jpg" content="Get Raya-ready with new outfits!" />
                        <CardWhatsHot img="https://www.adidas.co.id/media/wysiwyg/TC-WWC.png" title="Your World Cup Away Kits" content="Support your national team with the World Cup away kits, inspired by nature." />
                        <CardWhatsHot img="https://www.adidas.co.id/media/wysiwyg/TC-argentina.png" title="Dress like a champion" content="Made for fans. Celebrate victory with Argentina's latest home jersey." />
                        <CardWhatsHot img="https://www.adidas.co.id/media/wysiwyg/TOKYO_MARATHON_TC.jpg" title="Marathon winner" content="02:16:28_Rosemary Wanjiru_ADIZERO ADIOS PRO 3." />
                        <CardWhatsHot img="https://www.adidas.co.id/media/wysiwyg/Tennis-SS23-Roland-Garros-launch-HP-teaser-card-portrait-dualgender-t.jpg" title="Make your point" content="High performance meets sustainability in the new adidas tennis collection." />
                        <CardWhatsHot img="https://www.adidas.co.id/media/wysiwyg/originals-dtc-ss23-advgraphics-global-launch-glp-tc-nmd-d.jpg" title="Undo the doing" content="What happens when you dare to stop doing, and create time to be." />
                        <CardWhatsHot img="https://www.adidas.co.id/media/wysiwyg/TC-golf-fairway.png" title="Welcome to Our [Fair]way" content="A field of possibilities. Where optimism lives and the freedom of individuality thrives." />
                        <CardWhatsHot img="https://www.adidas.co.id/media/wysiwyg/TC-HOC.png" title="Home of Classics" content="Three classics, timeless for a reason." />
                    </Carousel>
                </div>
            </div>
        </div>
    )
}