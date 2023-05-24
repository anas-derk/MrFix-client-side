import Head from 'next/head';
import Header from '@/components/Header';
import { useEffect } from 'react';
import electricalsAndElectronicsImage from "../../../../public/images/OurServices/electricals-and-electronics.png";
import data from "../../../../public/data/index";

export default function Cleaning() {

    useEffect(() => {

        let header = document.querySelector("#__next .page-header"),
            pageContent = document.querySelector(".cleaning-services .page-content");

        pageContent.style.minHeight = `calc(100vh - ${header.clientHeight}px)`;

    }, []);

    return (
        // Start Cleaning Services Page
        <div className="cleaning-services shared-our-services-with-styles">
            <Head>
                <title>Mr. Fix - {data.servicesData[7].optionValue}</title>
            </Head>
            <Header />
            {/* Start Page Content Section */}
            <section className="page-content pt-3 pb-3" style={{ backgroundImage: `url(${electricalsAndElectronicsImage.src})` }}>
                {/* Start Container From Bootstrap */}
                <div className="container">
                    {/* Start Grid System From Bootstrap */}
                    <div className="row align-items-center">
                        <h1 className='page-title text-center mb-4'>{ data.servicesData[7].name }</h1>
                        {/* Start Column */}
                        <div className="col-md-6">
                            <p className='service-explain page-content-explain p-4'>
                                { data.servicesData[7].explain }
                            </p>
                        </div>
                        {/* End Column */}
                    </div>
                    {/* End Grid System From Bootstrap */}
                </div>
                {/* End Container From Bootstrap */}
            </section>
            {/* End Page Content Section */}
        </div>
        // End Cleaning Services Page
    );
}