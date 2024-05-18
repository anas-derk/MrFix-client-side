// استيراد المكتبات المطلوبة + صورة صفحة تواصل معنا
import Head from 'next/head';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import contactUsImage from "../../../public/images/ContactUs/contact-us.png";
import { useRouter } from 'next/router';
import LoaderPage from '@/components/LoaderPage';
import ErrorOnLoadingThePage from '@/components/ErrorOnLoadingThePage';

// تعريف دالة مكون تواصل معنا
export default function ContactUs() {
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);
    // تعريف راوتر لاستخدامه في التعامل مع روابط الصفحات
    const router = useRouter();
    // تعريف دالة useEffect من أجل عمل شيء ما عند تحميل الصفحة في جانب العميل أي المتصفح
    useEffect(() => {
        if (!isLoadingPage) {
            // جلب بعض العناصر من صفحة الويب باستخدام الجافا سكربت
            const header = document.querySelector("#__next .page-header"),
                pageContent = document.querySelector(".contact-us .page-content");
            // جعل أقل ارتفاع لعنصر pageContent هو عرض الصفحة المرأية كاملةً منقوصاً منها ارتفاع عنصر رأس الصفحة
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
        // كتابة كود ال jsx لصفحة تواصل معنا
        <div className="contact-us shared-pages-with-styles">
            {/* بداية كتابة معلومات عنصر ال head في ال html */}
            <Head>
                <title>مستر فيكس - اتصل بنا</title>
            </Head>
            {!isLoadingPage && !isErrorMsgOnLoadingThePage && <>
                {/* نهاية كتابة معلومات عنصر ال head في ال html */}
                {/* بداية عرض مكون الرأس الذي أنشأناه */}
                <Header />
                {/* نهاية عرض مكون الرأس الذي أنشأناه */}
                {/* بداية كتابة كود ال jsx لعنصر ال html المسمى page-content */}
                <section className="page-content p-4">
                    {/* بداية مكون الحاوية من البوتستراب */}
                    <div className="container">
                        {/* بداية مكون الشبكة من البوتستراب */}
                        <div className="row align-items-center">
                            {/* بداية مكون العمود */}
                            <div className="col-md-6">
                                <div className="contact-us-content-box">
                                    <p className='how-to-contact-us-explain pe-4 ps-4 mb-5'>
                                        نهتم بشكل كبير في النمو والتطور والريادة ولنكون الأفضل دائماً نحن بحاجة أن نتعلم منك ما هي الآراء والأفكار أو المفاهيم التي قد تجعلك في راحة أكثر لذا أخبرنا كيف من خلال التواصل معنا.
                                    </p>
                                    <p className='how-to-contact-us-explain pe-4 ps-4 mb-5'>
                                        و كذلك التعليقات والشكاوي ستظل دائمًا مرحبا   بها في مستر فيكس
                                    </p>
                                    <p className='how-to-contact-us-explain pe-4 ps-4'>
                                        كلنا آذان صاغية على :
                                    </p>
                                    <p className='how-to-contact-us-explain pe-4 ps-4 mb-4'>
                                        E-mail:
                                        <a href="mailto:mrfix.help@gmail.com" className='email-link'> mrfix.help@gmail.com</a>
                                    </p>
                                    <p className='how-to-contact-us-explain pe-4 ps-4'>
                                        كافة ما يتعلق بالموقع ومشاكل التسجيل والإشتراك والطلبات عبر الموقع  والاستفسارات حول الاشتراك وكذلك الشكاوي
                                    </p>
                                    <p className='how-to-contact-us-explain pe-4 ps-4 mb-4'>
                                        Mobile/whatsapp: 09444444444444
                                        Mobile/whatsapp: 09444444444444
                                    </p>
                                    <p className='how-to-contact-us-explain pe-4 ps-4'>
                                        كافة ما يتعلق بالمهام المتفق عليها بعد طلب الخدمة وتعديلها أو إلغائها أو تعديل الوقت أو الاستفسار بتفاصيل تخص إنجاز الخدمة
                                    </p>
                                    <p className='how-to-contact-us-explain pe-4 ps-4 mb-5'>
                                        Mobile/whatsapp: 09444444444444
                                        Mobile/whatsapp: 09444444444444
                                    </p>
                                </div>
                            </div>
                            {/* نهاية مكون العمود */}
                            {/* بداية مكون العمود */}
                            <div className="col-md-6">
                                <div className="image-box">
                                    <img src={contactUsImage.src} alt="Contact Us Image !!" className='contact-us-img page-img' />
                                </div>
                            </div>
                            {/* نهاية مكون العمود */}
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
        // نهاية كود ال jsx لصفحة تواصل معنا
    );
}