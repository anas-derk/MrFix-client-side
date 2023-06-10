import Head from 'next/head';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import contactUsImage from "../../../public/images/ContactUs/contact-us.png";

export default function ContactUs() {

    useEffect(() => {

        let header = document.querySelector("#__next .page-header"),
            pageContent = document.querySelector(".contact-us .page-content");

        pageContent.style.minHeight = `calc(100vh - ${header.clientHeight}px)`;

    }, []);

    return (
        // Start Contact Us Page
        <div className="contact-us shared-pages-with-styles">
            <Head>
                <title>مستر فيكس - اتصل بنا</title>
            </Head>
            <Header />
            {/* Start Page Content Section */}
            <section className="page-content p-4">
                {/* Start Container From Bootstrap */}
                <div className="container">
                    {/* Start Grid System From Bootstrap */}
                    <div className="row align-items-center">
                        {/* Start Column */}
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
                        {/* End Column */}
                        {/* Start Column */}
                        <div className="col-md-6">
                            <div className="image-box">
                                <img src={contactUsImage.src} alt="Contact Us Image !!" className='contact-us-img page-img' />
                            </div>
                        </div>
                        {/* End Column */}
                    </div>
                    {/* End Grid System From Bootstrap */}
                </div>
                {/* End Container From Bootstrap */}
            </section>
            {/* End Page Content Section */}
        </div>
        // End Contact Us Page
    );
}