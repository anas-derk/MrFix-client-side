import Head from 'next/head';
import Header from '@/components/Header';
import SideBar from '@/components/sideBar';
import { useEffect, useState } from 'react';
import whoAreWeImage from "../../../../public/images/WhoAreWe/who-are-we.png";
import data from "../../../../public/data/index";

export default function PaintAndInsulation() {

    const [isSideBarAppeared, setIsSideBarAppeared] = useState(false);

    useEffect(() => {

        let header = document.querySelector("#__next .page-header"),
            pageContent = document.querySelector(".paint-and-insulation-services .page-content");

        pageContent.style.minHeight = `calc(100vh - ${header.clientHeight}px)`;

    }, []);

    return (
        // Start Paint And Insulation Services Page
        <div className="paint-and-insulation-services shared-pages-with-styles page-content-explain">
            <Head>
                <title>Mr. Fix - {data.servicesData[5].optionValue}</title>
            </Head>
            <Header setIsSideBarAppeared={setIsSideBarAppeared} />
            {isSideBarAppeared && <SideBar />}
            {/* Start Page Content Section */}
            <section className="page-content pt-3 pb-3">
                {/* Start Container From Bootstrap */}
                <div className="container">
                    {/* Start Grid System From Bootstrap */}
                    <div className="row align-items-center">
                        <h1 className='page-title text-center mb-2'>{ data.servicesData[5].name }</h1>
                        {/* Start Column */}
                        <div className="col-md-6">
                            <p className='service-explain page-content-explain'>
                                { data.servicesData[5].explain }
                            </p>
                        </div>
                        {/* End Column */}
                        {/* Start Column */}
                        <div className="col-md-6">
                            <img src={whoAreWeImage.src} alt="Paint And Insulation Image !!" className='painta-and-insulation-img page-img' />
                        </div>
                        {/* End Column */}
                    </div>
                    {/* End Grid System From Bootstrap */}
                </div>
                {/* End Container From Bootstrap */}
            </section>
            {/* End Page Content Section */}
        </div>
        // End Paint And Insulation Services Page
    );
}