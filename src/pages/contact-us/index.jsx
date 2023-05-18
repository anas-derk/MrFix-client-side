import Head from 'next/head';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import whoAreWeImage from "../../../public/images/WhoAreWe/who-are-we.png";

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
            <section className="page-content pt-4 pb-4">
                {/* Start Container From Bootstrap */}
                <div className="container">
                    {/* Start Grid System From Bootstrap */}
                    <div className="row align-items-center">
                        <h1 className='page-title text-center mb-2'>اتصل بنا</h1>
                        {/* Start Column */}
                        <div className="col-md-6">
                            <p className='how-to-contact-us-explain page-content-explain'>
                                نحن نعلم أننا نستطيع أن نكون افضل. ولكن أخبرنا كيف من خلال التواصل معنا
                                نحن نستمر في النمو والتطور، لكن الأهم من ذلك ، أن نتعلم منك ما هي الأفكار أو المفاهيم التي قد تجعلك في راحة أكثر
                                بدأنا للتو ونعلم أنه يمكننا أن نفعل أكثر لذا التعليقات و الآراء هي وستظل دائمًا مرحبا بها في Mr. fix.
                                كلنا آذان صاغية على :
                            </p>
                            <div className="contact-methods">
                                <div className='email-box mb-3'>
                                    <span>الإيميل : </span>
                                    <a href="mailto:mr.fix.support@gmail.com" className='email-link'>mr.fix.support@gmail.com .</a>
                                </div>
                                <div className='mobile-box'>
                                    <span>رقم الجوال: 09444444444444</span>
                                </div>
                            </div>
                        </div>
                        {/* End Column */}
                        {/* Start Column */}
                        <div className="col-md-6">
                            <img src={whoAreWeImage.src} alt="Who Are We Image !!" className='contact-us-img page-img' />
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