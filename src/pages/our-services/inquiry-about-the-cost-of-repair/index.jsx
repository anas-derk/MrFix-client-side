import Head from 'next/head';
import Header from '@/components/Header';
import { useEffect } from 'react';
import inquiryAboutTheCostOfRepairImage from "../../../../public/images/OurServices/inquiry-about-the-cost-of-repair.png";
import inquiryAboutTheCostOfRepairImageInRes from "../../../../public/images/OurServices/responsive/inquiry-about-the-cost-of-repair.png";
import data from "../../../../public/data/index";

export default function InquiryRepairCostServices() {

    useEffect(() => {

        let header = document.querySelector("#__next .page-header"),
            pageContent = document.querySelector(".inquir-repair-cost-services .page-content");

        pageContent.style.minHeight = `calc(100vh - ${header.clientHeight}px)`;

    }, []);

    return (
        // Start Inquir Repair Cost Services Page
        <div className="inquir-repair-cost-services shared-our-services-with-styles">
            <Head>
                <title>Mr. Fix - {data.servicesData[10].optionValue}</title>
            </Head>
            <Header />
            {/* Start Page Content Section */}
            <section className="page-content pt-3 pb-3" style={{ backgroundImage: `url(${inquiryAboutTheCostOfRepairImage.src})` }}>
                {/* Start Container From Bootstrap */}
                <div className="container">
                    {/* Start Grid System From Bootstrap */}
                    <div className="row align-items-center">
                        <h1 className='page-title text-center mb-4'>{ data.servicesData[10].name }</h1>
                        {/* Start Column */}
                        <div className="col-md-6">
                            <p className='service-explain page-content-explain p-2'>
                                { data.servicesData[10].explain }
                            </p>
                        </div>
                        {/* End Column */}
                        {/* Start Column */}
                        <div className="col-md-6">
                            <img src={inquiryAboutTheCostOfRepairImageInRes.src} alt="Image" className='image-in-responsive' />
                        </div>
                        {/* End Column */}
                    </div>
                    {/* End Grid System From Bootstrap */}
                </div>
                {/* End Container From Bootstrap */}
            </section>
            {/* End Page Content Section */}
        </div>
        // End Inquir Repair Cost Page
    );
}