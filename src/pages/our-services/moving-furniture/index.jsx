import Head from 'next/head';
import Header from '@/components/Header';
import { useEffect } from 'react';
import movingFurnitureImage from "../../../../public/images/OurServices/moving-furniture.png";
import movingFurnitureImageInRes from "../../../../public/images/OurServices/responsive/moving-furniture.png";
import data from "../../../../public/data/index";

export default function MovingFurniture() {

    useEffect(() => {

        let header = document.querySelector("#__next .page-header"),
            pageContent = document.querySelector(".moving-furniture-services .page-content");

        pageContent.style.minHeight = `calc(100vh - ${header.clientHeight}px)`;

    }, []);

    return (
        // Start Moving Furniture Services Page
        <div className="moving-furniture-services shared-our-services-with-styles">
            <Head>
                <title>Mr. Fix - {data.servicesData[6].optionValue}</title>
            </Head>
            <Header />
            {/* Start Page Content Section */}
            <section className="page-content pt-3 pb-3" style={{ backgroundImage: `url(${movingFurnitureImage.src})` }}>
                {/* Start Container From Bootstrap */}
                <div className="container">
                    {/* Start Grid System From Bootstrap */}
                    <div className="row align-items-center">
                        <h1 className='page-title text-center mb-4'>{data.servicesData[6].name}</h1>
                        {/* Start Column */}
                        <div className="col-md-6">
                            <p className='service-explain page-content-explain p-4'>
                                {data.servicesData[6].explain}
                            </p>
                        </div>
                        {/* End Column */}
                        {/* Start Column */}
                        <div className="col-md-6">
                            <img src={movingFurnitureImageInRes.src} alt="Image" className='image-in-responsive' />
                        </div>
                        {/* End Column */}
                    </div>
                    {/* End Grid System From Bootstrap */}
                </div>
                {/* End Container From Bootstrap */}
            </section>
            {/* End Page Content Section */}
        </div>
        // End Moving Furniture Services Page
    );
}