import Head from 'next/head';
import Header from '@/components/Header';
import SideBar from '@/components/sideBar';
import { useEffect, useState } from 'react';
import whoAreWeImage from "../../../../public/images/WhoAreWe/who-are-we.png";
import data from "../../../../public/data/index";

export default function ElectricalsAndElectronics() {

    const [isSideBarAppeared, setIsSideBarAppeared] = useState(false);

    useEffect(() => {

        let header = document.querySelector("#__next .page-header"),
            pageContent = document.querySelector(".electricals-and-electronics-services .page-content");

        pageContent.style.minHeight = `calc(100vh - ${header.clientHeight}px)`;

    }, []);

    return (
        // Start Who Electricals and electronics Services Page
        <div className="electricals-and-electronics-services shared-pages-with-styles page-content-explain">
            <Head>
                <title>Mr. Fix - {data.servicesData[0].optionValue}</title>
            </Head>
            <Header setIsSideBarAppeared={setIsSideBarAppeared} />
            {isSideBarAppeared && <SideBar />}
            {/* Start Page Content Section */}
            <section className="page-content pt-3 pb-3">
                {/* Start Container From Bootstrap */}
                <div className="container">
                    {/* Start Grid System From Bootstrap */}
                    <div className="row align-items-center">
                        <h1 className='page-title text-center mb-2'>{ data.servicesData[0].name }</h1>
                        {/* Start Column */}
                        <div className="col-md-6">
                            <p className='service-explain page-content-explain'>
                                {data.servicesData[0].explain}
                            </p>
                        </div>
                        {/* End Column */}
                        {/* Start Column */}
                        <div className="col-md-6">
                            <img src={whoAreWeImage.src} alt="Electricals and electronics Image !!" className='electricals-and-electronics-img page-img' />
                        </div>
                        {/* End Column */}
                    </div>
                    {/* End Grid System From Bootstrap */}
                </div>
                {/* End Container From Bootstrap */}
            </section>
            {/* End Page Content Section */}
        </div>
        // End electricals And Electronics Services Page
    );
}
