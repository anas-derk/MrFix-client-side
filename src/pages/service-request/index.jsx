import Head from 'next/head';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import { FiUserPlus } from "react-icons/fi";
import ourServicesData from "../../../public/data/index";

export default function ServiceRequest() {
    const [requestType, setRequestType] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [imageOfTheBrokenTool, setImageOfTheBrokenTool] = useState("");
    const [pictureOfTheVacationSpot, setPictureOfTheVacationSpot] = useState("");
    const [preferredDateOfVisit, setPreferredDateOfVisit] = useState("");
    const [preferredTimeOfVisit, setPreferredTimeOfVisit] = useState("");
    const [electricityTimes, setElectricityTimes] = useState("");
    const [isAlternativeEnergyExist, setIsAlternativeEnergyExist] = useState("");
    const [inputType1, setInputType1] = useState("");
    const [inputType2, setInputType2] = useState("");
    const [inputType3, setInputType3] = useState("");
    const serviceRequest = (e) => {
        e.preventDefault();
    }
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
                    <form className="service-request-form" onSubmit={serviceRequest}>
                        <select
                            className='form-control p-3 mb-4 request-type-select'
                            onChange={(e) => setRequestType(e.target.value)}
                        >
                            <option value="" hidden>نوع الطلب</option>
                            <option value="normal-request">طلب عادي</option>
                            <option value="ambulance-request">طلب إسعافي</option>
                        </select>
                        <select
                            className='form-control p-3 mb-4 service-type-select'
                            onChange={(e) => setServiceType(e.target.value)}
                        >
                            <option value="" hidden>نوع الخدمة</option>
                            {ourServicesData.servicesData.map((service, index) => (
                                <option value={service.optionValue} key={index}>{service.name}</option>
                            ))}
                        </select>
                        {/* Start Grid System From Bootstrap */}
                        <div className="row">
                            {/* Start Column */}
                            <div className="col-md-6">
                                <textarea
                                    placeholder="العنوان بالتفصيل في حالة إختلافه عن العنوان المسجل"
                                    className='form-control p-3 mb-4'
                                    onChange={(e) => setNewAddress(e.target.value)}
                                ></textarea>
                                <input
                                    type="file"
                                    placeholder="صورة عن الأداة المعطلة"
                                    className='form-control p-3 mb-4'
                                    onChange={(e) => setImageOfTheBrokenTool(e.target.files[0])}
                                />
                                <input
                                    type="file"
                                    placeholder="صورة عن المكان المعطل"
                                    className='form-control p-3 mb-4'
                                    onChange={(e) => setPictureOfTheVacationSpot(e.target.files[0])}
                                />
                            </div>
                            {/* End Column */}
                            {/* Start Column */}
                            <div className="col-md-6">
                                {requestType !== "ambulance-request" && <>
                                    <input
                                        type={inputType3}
                                        placeholder="تاريخ اليوم المفضل لزيارة الورشة"
                                        className='form-control p-3 mb-4'
                                        onFocus={() => setInputType3("date")}
                                        onBlur={() => setInputType3("text")}
                                        onChange={(e) => setPreferredDateOfVisit(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="الوقت المفضل لزيارة الورشة"
                                        className='form-control p-3 mb-4'
                                        onChange={(e) => setPreferredTimeOfVisit(e.target.value)}
                                    />
                                </>}
                                <input
                                    type="text"
                                    placeholder="أوقات الكهرباء النظامية"
                                    className='form-control p-3 mb-4'
                                    onChange={(e) => setElectricityTimes(e.target.value)}
                                />
                                <select
                                    className='form-control p-3 mb-4'
                                    onChange={(e) => setIsAlternativeEnergyExist(e.target.value)}
                                >
                                    <option value="" hidden>هل يوجد طاقة بديلة ؟</option>
                                    <option value="yes">نعم</option>
                                    <option value="no">لا</option>
                                </select>
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
