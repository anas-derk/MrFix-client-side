import Head from 'next/head';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import ForgetPasswordImage from "../../../public/images/ForgetPassword/forget-password.png";

export default function ForgetPassword() {

    useEffect(() => {

        let header = document.querySelector("#__next .page-header"),
            pageContent = document.querySelector(".forget-password .page-content");

        pageContent.style.minHeight = `calc(100vh - ${header.clientHeight}px)`;

    }, []);

    return (
        // Start Forget Password Page
        <div className="forget-password shared-pages-with-styles">
            <Head>
                <title>Mr. Fix - Forget Password</title>
            </Head>
            <Header />
            {/* Start Page Content Section */}
            <div className="page-content pt-4 pb-4">
                {/* Start Container From Bootstrap */}
                <div className="container">
                    {/* Start Grid System From Bootstrap */}
                    <div className="row align-items-center">
                        {/* Start Column */}
                        <div className="col-md-6 p-5">
                            {/* Start Login Form */}
                            <form className="forget-password-form bg-white p-4 text-center">
                                <h4 className='mb-4'>نسيت كلمة السر !</h4>
                                <input type="email" placeholder="البريد الالكتروني" className="form-control mb-4 p-3" />
                                <button type='submit' className='btn forget-password-btn w-100 p-3'>إرسال</button>
                            </form>
                            {/* End Login Form */}
                        </div>
                        {/* End Column */}
                        {/* Start Column */}
                        <div className="col-md-6">
                            <img src={ForgetPasswordImage.src} alt="Forget Password Image !!" className='forget-password-img' />
                        </div>
                        {/* End Column */}
                    </div>
                    {/* End Grid System From Bootstrap */}
                </div>
                {/* End Container From Bootstrap */}
            </div>
            {/* End Page Content Section */}
        </div>
        // End Forget Password Page
    );
}