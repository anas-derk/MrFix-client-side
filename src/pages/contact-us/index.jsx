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
                <title>Mr. Fix - Contact Us</title>
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
                            <p className='how-to-contact-us-explain page-content-explain pe-4 ps-4'>
                                نهتم بشكل كبير في النمو والتطور والريادة ولنكون الأفضل دائماً نحن بحاجة أن نتعلم منك ما هي الآراء والأفكار أو المفاهيم التي قد تجعلك في راحة أكثر لذا أخبرنا كيف من خلال التواصل معنا.
                                <br />
                                <br />
                                و كذلك التعليقات والشكاوي ستظل دائمًا مرحبا   بها في مستر فيكس
                                <br />
                                <br />
                                كلنا آذان صاغية على :
                                <br />
                                <span>الإيميل : </span>
                                <a href="mailto:mr.fix.support@gmail.com" className='email-link'>mr.fix.support@gmail.com .</a>
                                <br />
                                <span>رقم الجوال: 09444444444444</span>
                            </p>
                        </div>
                        {/* End Column */}
                        {/* Start Column */}
                        <div className="col-md-6">
                            <img src={contactUsImage.src} alt="Contact Us Image !!" className='contact-us-img page-img' />
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