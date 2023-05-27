import Head from 'next/head';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import { FiUserPlus } from "react-icons/fi";
import ourServicesData from "../../../public/data/index";

export default function ServiceRequest() {

    useEffect(() => {

        let header = document.querySelector("#__next .page-header"),
            pageContent = document.querySelector(".service-request .page-content");

        pageContent.style.minHeight = `calc(100vh - ${header.clientHeight}px)`;

    }, []);

    return (
        // Start Service Request Page
        <div className="service-request">
            <Head>
                <title>Mr. Fix - Service Request</title>
            </Head>
            <Header />
            {/* Start Page Content Section */}
            <section className="page-content pt-4 pb-4">
                {/* Start Container From Bootstrap */}
                <div className="container">
                    <h1 className='page-title mb-4 text-center'>طلب خدمة</h1>
                    <form className="service-request-form">
                        <select className='form-control p-3 mb-4 request-type-select'>
                            <option defaultValue="" hidden>نوع الطلب</option>
                            <option value="normal-request">طلب عادي</option>
                            <option value="ambulance-request">طلب إسعافي</option>
                        </select>
                        <select className='form-control p-3 mb-4 service-type-select'>
                            <option defaultValue="" hidden>نوع الخدمة</option>
                            {ourServicesData.servicesData.map((service, index) => (
                                <option value={service.optionValue} key={index}>{ service.name }</option>
                            ))}
                        </select>
                        {/* Start Grid System From Bootstrap */}
                        <div className="row">
                            {/* Start Column */}
                            <div className="col-md-6">
                                <textarea placeholder="العنوان بالتفصيل في حالة إختلافه عن العنوان المسجل" className='form-control p-3 mb-4'></textarea>
                                <input type="file" placeholder="صورة عن الأداة المعطلة" className='form-control p-3 mb-4' />
                                <input type="file" placeholder="صورة عن المكان المعطل" className='form-control p-3 mb-4' />
                            </div>
                            {/* End Column */}
                            {/* Start Column */}
                            <div className="col-md-6">
                                <input type="date" placeholder="تاريخ اليوم المفضل لزيارة الورشة" className='form-control p-3 mb-4' />
                                <input type="text" placeholder="الوقت المفضل لزيارة الورشة" className='form-control p-3 mb-4' />
                                <input type="text" placeholder="أوقات الكهرباء النظامية" className='form-control p-3 mb-4' />
                                <input type="text" placeholder="هل يوجد طاقة بديلة ؟" className='form-control p-3 mb-4' />
                            </div>
                            {/* End Column */}
                        </div>
                        {/* End Grid System From Bootstrap */}
                        <button type='submit' className='btn service-request-btn w-50 p-3 mx-auto d-block'>
                            <span className='ms-2'>إرسال</span>
                            <FiUserPlus />
                        </button>
                    </form>
                </div>
                {/* End Container From Bootstrap */}
            </section>
            {/* End Page Content Section */}
        </div>
        // End Service Request Page
    );
}
