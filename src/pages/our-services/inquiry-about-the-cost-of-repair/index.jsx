import Head from 'next/head';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import inquiryAboutTheCostOfRepairImage from "../../../../public/images/OurServices/inquiry-about-the-cost-of-repair.png";
import inquiryAboutTheCostOfRepairImageInRes from "../../../../public/images/OurServices/responsive/inquiry-about-the-cost-of-repair.png";
import data from "../../../../public/data/index";
import LoaderPage from '@/components/LoaderPage';
import ErrorOnLoadingThePage from '@/components/ErrorOnLoadingThePage';

export default function InquiryRepairCostServices() {
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);
    useEffect(() => {
        if (!isLoadingPage) {
            let header = document.querySelector("#__next .page-header"),
                pageContent = document.querySelector(".inquir-repair-cost-services .page-content");
            pageContent.style.minHeight = `calc(100vh - ${header.clientHeight}px)`;
        }
    }, [isLoadingPage]);
    useEffect(() => {
        const userToken = localStorage.getItem(process.env.userTokenNameInLocalStorage);
        if (userToken) {
            getUserInfo()
                .then(async (result) => {
                    if (!result.error) {
                        setIsLoadingPage(false);
                    } else {
                        localStorage.removeItem(process.env.userTokenNameInLocalStorage);
                    }
                })
                .catch(async (err) => {
                    if (err?.response?.data?.msg === "Unauthorized Error") {
                        localStorage.removeItem(process.env.userTokenNameInLocalStorage);
                    } else {
                        setIsLoadingPage(false);
                        setIsErrorMsgOnLoadingThePage(true);
                    }
                });
        } else {
            setIsLoadingPage(false);
        }
    }, []);
    return (
        // Start Inquir Repair Cost Services Page
        <div className="inquir-repair-cost-services shared-our-services-with-styles">
            <Head>
                <title>مستر فيكس - استفسار عن تكلفة الإصلاح</title>
            </Head>
            {!isLoadingPage && !isErrorMsgOnLoadingThePage && <>
                <Header />
                {/* Start Page Content Section */}
                <section className="page-content pt-3 pb-3" style={{ backgroundImage: `url(${inquiryAboutTheCostOfRepairImage.src})` }}>
                    {/* Start Container From Bootstrap */}
                    <div className="container">
                        {/* Start Grid System From Bootstrap */}
                        <div className="row align-items-center">
                            <h1 className='page-title text-center mb-4'>{data.servicesData[10].name}</h1>
                            {/* Start Column */}
                            <div className="col-md-6">
                                <p className='service-explain page-content-explain p-2'>
                                    {data.servicesData[10].explain}
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
            </>}
            {isLoadingPage && !isErrorMsgOnLoadingThePage && <LoaderPage />}
            {isErrorMsgOnLoadingThePage && <ErrorOnLoadingThePage />}
        </div>
        // End Inquir Repair Cost Page
    );
}