import Head from 'next/head';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import electricalsAndElectronicsImage from "../../../../public/images/OurServices/electricals-and-electronics.png";
import electricalsAndElectronicsImageInRes from "../../../../public/images/OurServices/responsive/electricals-and-electronics.png";
import data from "../../../../public/data/index";
import LoaderPage from '@/components/LoaderPage';
import ErrorOnLoadingThePage from '@/components/ErrorOnLoadingThePage';
import { getUserInfo } from '../../../../public/global_functions/popular';

export default function ElectricalsAndElectronics() {
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);
    useEffect(() => {
        if (!isLoadingPage) {
            let header = document.querySelector("#__next .page-header"),
                pageContent = document.querySelector(".electricals-and-electronics-services .page-content");
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
        // Start Who Electricals and electronics Services Page
        <div className="electricals-and-electronics-services shared-our-services-with-styles">
            <Head>
                <title>مستر فيكس - الكهربائيات والالكترونيات</title>
            </Head>
            {!isLoadingPage && !isErrorMsgOnLoadingThePage && <>
                <Header />
                {/* Start Page Content Section */}
                <section className="page-content pt-3 pb-3" style={{ backgroundImage: `url(${electricalsAndElectronicsImage.src})` }}>
                    {/* Start Container From Bootstrap */}
                    <div className="container">
                        {/* Start Grid System From Bootstrap */}
                        <div className="row align-items-center">
                            <h1 className='page-title text-center mb-4'>{data.servicesData[0].name}</h1>
                            {/* Start Column */}
                            <div className="col-md-6">
                                <p className='service-explain page-content-explain p-4'>
                                    {data.servicesData[0].explain}
                                </p>
                            </div>
                            {/* End Column */}
                            {/* Start Column */}
                            <div className="col-md-6">
                                <img src={electricalsAndElectronicsImageInRes.src} alt="Image" className='image-in-responsive' />
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
        // End electricals And Electronics Services Page
    );
}
