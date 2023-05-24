import Head from 'next/head';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import loginImage from "../../../public/images/Login/login.png";
import Link from 'next/link';

export default function Login() {

    useEffect(() => {

        let header = document.querySelector("#__next .page-header"),
            pageContent = document.querySelector(".login .page-content");

        pageContent.style.minHeight = `calc(100vh - ${header.clientHeight}px)`;

    }, []);

    return (
        // Start Login Page
        <div className="login shared-pages-with-styles">
            <Head>
                <title>Mr. Fix - Login</title>
            </Head>
            <Header />
            {/* Start Page Content Section */}
            <div className="page-content p-4">
                {/* Start Container From Bootstrap */}
                <div className="container">
                    {/* Start Grid System From Bootstrap */}
                    <div className="row align-items-center">
                        {/* Start Column */}
                        <div className="col-lg-6 p-5">
                            {/* Start Login Form */}
                            <form className="login-form bg-white p-4 text-center">
                                <h4 className='mb-4'>أهلاً بعودتك .</h4>
                                <input type="text" placeholder="البريد الالكتروني أو رقم الجوال" className="form-control mb-4 p-3" />
                                <input type="password" placeholder="كلمة السر" className="form-control mb-4 p-3" />
                                <Link href="/forget-password" className='mb-3 btn w-100 text-start'>نسيت كلمة السر !</Link>
                                <button type='submit' className='btn login-btn w-100 p-3'>تسجيل الدخول</button>
                            </form>
                            {/* End Login Form */}
                        </div>
                        {/* End Column */}
                        {/* Start Column */}
                        <div className="col-lg-6">
                            <img src={loginImage.src} alt="Login Image !!" className='login-img' />
                        </div>
                        {/* End Column */}
                    </div>
                    {/* End Grid System From Bootstrap */}
                </div>
                {/* End Container From Bootstrap */}
            </div>
            {/* End Page Content Section */}
        </div>
        // End Who Are We Page
    );
}
