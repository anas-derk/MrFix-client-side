import Head from 'next/head';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import ourServicesData from "../../../public/data/index";
import Link from 'next/link';
import fixLogo from "../../../public/images/OurServices/1.png";
import LoaderPage from '@/components/LoaderPage';
import ErrorOnLoadingThePage from '@/components/ErrorOnLoadingThePage';
import { getUserInfo } from '../../../public/global_functions/popular';

export default function OurServices() {
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);
    useEffect(() => {
        if (!isLoadingPage && !isErrorMsgOnLoadingThePage) {
            let header = document.querySelector("#__next .page-header"),
                pageContent = document.querySelector(".our-services .page-content");
            pageContent.style.minHeight = `calc(100vh - ${header.clientHeight}px)`;
        }
    }, [isLoadingPage]);
    useEffect(() => {
        const userToken = localStorage.getItem(process.env.userTokenNameInLocalStorage);
        if (userToken) {
            getUserInfo()
                .then(async (result) => {
                    setIsLoadingPage(false);
                    if (result.error) {
                        localStorage.removeItem(process.env.userTokenNameInLocalStorage);
                    }
                })
                .catch(async (err) => {
                    setIsLoadingPage(false);
                    if (err?.response?.data?.msg === "Unauthorized Error") {
                        localStorage.removeItem(process.env.userTokenNameInLocalStorage);
                    } else {
                        setIsErrorMsgOnLoadingThePage(true);
                    }
                });
        } else {
            setIsLoadingPage(false);
        }
    }, []);
    return (
        // Start Our Services Page
        <div className="our-services">
            <Head>
                <title>مستر فيكس - خدماتنا</title>
            </Head>
            {!isLoadingPage && !isErrorMsgOnLoadingThePage && <>
                <Header />
                {/* Start Page Content Section */}
                <section className="page-content pt-4 pb-4">
                    {/* Start Container From Bootstrap */}
                    <h1 className='page-title text-center mb-4'>خدماتنا</h1>
                    <div className="container">
                        {/* Start Grid System From Bootstrap */}
                        <div className="row justify-content-center">
                            {ourServicesData.servicesData.map((service, index) => (
                                /* Start Column */
                                <div className="col-md-3" key={index}>
                                    {/* Start Service Box */}
                                    <div className="service-box p-3 d-flex flex-column justify-content-between">
                                        <div className="service-name d-flex">
                                            <h5 className='service-name'>{service.name}</h5>
                                        </div>
                                        <div className='service-link-and-logo d-flex justify-content-between align-items-end'>
                                            <Link className='service-details-link' href={service.detailsInfoLink}>إقرأ المزيد ...</Link>
                                            <img src={fixLogo.src} alt="Fix Image" className='fix-image' />
                                        </div>
                                    </div>
                                    {/* End Service Box */}
                                </div>
                                /* End Column */
                            ))}
                        </div>
                        {/* End Grid System From Bootstrap */}
                        <Link className='btn service-request-link w-50 p-3 mx-auto d-block' href="/service-request">
                            <span className='ms-2'>طلب خدمة</span>
                        </Link>
                    </div>
                    {/* End Container From Bootstrap */}
                </section>
                {/* End Page Content Section */}
            </>}
            {isLoadingPage && !isErrorMsgOnLoadingThePage && <LoaderPage />}
            {isErrorMsgOnLoadingThePage && <ErrorOnLoadingThePage />}
        </div>
        // End Our Services Page
    );
}
