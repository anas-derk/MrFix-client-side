// استيراد المكتبات المطلوبة
import Head from 'next/head';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import Axios from "axios";
import { getAdsCount, getAllAdsInsideThePage, getUserInfo } from '../../../public/global_functions/popular';
import LoaderPage from '@/components/LoaderPage';
import ErrorOnLoadingThePage from '@/components/ErrorOnLoadingThePage';

// تعريف دالة مكون من نحن
export default function Ads({ result }) {
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);
    const [allAdsInsideThePage, setAllAdsInsideThePage] = useState([]);
    const [isGetAds, setIsGetAds] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPagesCount, setTotalPagesCount] = useState(0);
    const pageSize = 5;
    // تعريف دالة useEffect من أجل عمل شيء ما عند تحميل الصفحة في جانب العميل أي المتصفح
    useEffect(() => {
        if (!isLoadingPage) {
            // جلب بعض العناصر من صفحة الويب باستخدام الجافا سكربت
            const header = document.querySelector("#__next .page-header"),
                pageContent = document.querySelector(".ads .page-content");
            // جعل أقل ارتفاع لعنصر pageContent هو عرض الصفحة المرأية كاملةً منقوصاً منها ارتفاع عنصر رأس الصفحة
            pageContent.style.minHeight = `calc(100vh - ${header.clientHeight}px)`;
        }
    }, [isLoadingPage]);
    useEffect(() => {
        const userToken = localStorage.getItem(process.env.userTokenNameInLocalStorage);
        if (userToken) {
            getUserInfo()
                .then(async (result) => {
                    if (result.error) {
                        localStorage.removeItem(process.env.userTokenNameInLocalStorage);
                    }
                    result = await getAdsCount();
                    if (result.data > 0) {
                        setAllAdsInsideThePage((await getAllAdsInsideThePage(1, pageSize)).data);
                        setTotalPagesCount(Math.ceil(result.data / pageSize));
                    }
                    setIsGetAds(false);
                    setIsLoadingPage(false);
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
            getAdsCount()
                .then(async (result) => {
                    if (result.data > 0) {
                        setAllAdsInsideThePage((await getAllAdsInsideThePage(1, pageSize)).data);
                    }
                    setIsGetAds(false);
                    setIsLoadingPage(false);
                })
                .catch((err) => {
                    setIsLoadingPage(false);
                    setIsErrorMsgOnLoadingThePage(true);
                });
        }
    }, []);
    return (
        // بداية كتابة كود ال jsx لصفحة من نحن
        <div className="ads shared-pages-with-styles">
            {/* بداية كتابة معلومات عنصر ال head في ال html */}
            <Head>
                <title>مستر فيكس - الإعلانات</title>
            </Head>
            {/* نهاية كتابة معلومات عنصر ال head في ال html */}
            {!isLoadingPage && !isErrorMsgOnLoadingThePage && <>
                {/* بداية عرض مكون الرأس الذي أنشأناه */}
                <Header />
                {/* نهاية عرض مكون الرأس الذي أنشأناه */}
                {/* بداية كتابة كود ال jsx لعنصر ال html المسمى page-content */}
                <section className="page-content p-4">
                    {/* بداية مكون الحاوية من البوتستراب */}
                    <div className="container">
                        <h1 className="welcome-msg text-center mb-4">مرحباً بك في صفحة الإعلانات</h1>
                        {/* بداية مكون الشبكة من البوتستراب */}
                        {allAdsInsideThePage.length === 0 && !isGetAds && <p className='alert alert-danger'>عذراً ، لا توجد إعلانات حالياً !!</p>}
                        <div className="ads-box align-items-center p-4">
                            {allAdsInsideThePage.map((ad, index) => (
                                <p className={`ad-content p-3 text-white ${index !== allAdsInsideThePage.length - 1 ? "mb-4" : ""}`} key={ad._id}>{ad.content}</p>
                            ))}
                        </div>
                        {/* نهاية مكون الشبكة من البوتستراب */}
                    </div>
                    {/* نهاية مكون الحاوية من البوتستراب */}
                </section>
                {/* نهاية كتابة كود ال jsx لعنصر ال html المسمى page-content */}
            </>}
            {isLoadingPage && !isErrorMsgOnLoadingThePage && <LoaderPage />}
            {isErrorMsgOnLoadingThePage && <ErrorOnLoadingThePage />}
        </div>
        // نهاية كتابة كود ال jsx لصفحة من نحن
    );
}