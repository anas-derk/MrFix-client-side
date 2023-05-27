import Head from 'next/head';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import { FiUserPlus } from "react-icons/fi";

export default function Profile() {

    useEffect(() => {

        let header = document.querySelector("#__next .page-header"),
            pageContent = document.querySelector(".profile .page-content");

        pageContent.style.minHeight = `calc(100vh - ${header.clientHeight}px)`;

        let address = document.querySelector(".profile .edit-profile-form .address");

        address.style.height = `calc(116px + 1.5rem)`;

    }, []);

    return (
        // Start Profile Page
        <div className="profile">
            <Head>
                <title>Mr. Fix - Profile</title>
            </Head>
            <Header />
            {/* Start Page Content Section */}
            <section className="page-content pt-4 pb-4">
                {/* Start Container From Bootstrap */}
                <div className="container">
                    <h1 className='page-title mb-4'>الملف الشخصي</h1>
                    <form className="edit-profile-form">
                        {/* Start Grid System From Bootstrap */}
                        <div className="row">
                            {/* Start Column */}
                            <div className="col-md-6">
                                <input type="text" placeholder='الاسم والكنية' className='form-control p-3 mb-4' />
                                <input type="email" placeholder="البريد الالكتروني" className='form-control p-3 mb-4' />
                                <input type="number" placeholder="رقم الجوال" className='form-control p-3 mb-4' min="0" max="9" maxLength="10" />
                                <input type="password" placeholder="كلمة السر" className='form-control p-3 mb-4' />
                                <input type="password" placeholder="تأكيد كلمة السر" className='form-control p-3 mb-4' />
                            </div>
                            {/* End Column */}
                            {/* Start Column */}
                            <div className="col-md-6">
                                <select className='form-control p-3 mb-4'>
                                    <option defaultValue="" hidden>اختر الجنس</option>
                                    <option value="male">ذكر</option>
                                    <option value="female">أنثى</option>
                                </select>
                                <input type="date" placeholder="تاريخ الميلاد" className='form-control p-3 mb-4' />
                                <select className='form-control p-3 mb-4'>
                                    <option defaultValue="" hidden>اختر المحافظة</option>
                                    <option value="lattakia">اللاذقية</option>
                                    <option value="lattakia">حلب</option>
                                    <option value="lattakia">دمشق</option>
                                    <option value="lattakia">طرطوس</option>
                                    <option value="lattakia">درعا</option>
                                    <option value="lattakia">القنيطرة</option>
                                    <option value="lattakia">ريف دمشق</option>
                                    <option value="lattakia">حماة</option>
                                    <option value="lattakia">إدلب</option>
                                    <option value="lattakia">حمص</option>
                                    <option value="lattakia">الحسكة</option>
                                    <option value="lattakia">دير الزور</option>
                                    <option value="lattakia">الرقة</option>
                                </select>
                                <textarea placeholder="العنوان بالتفصيل - مثال: شارع ميسلون, في البناء مقابل محل انكو, في الطابق الرابع" className='form-control p-3 address' />
                            </div>
                            {/* End Column */}
                        </div>
                        {/* End Grid System From Bootstrap */}
                        <button type='submit' className='btn edit-profile-btn w-50 p-3 mt-4 mx-auto d-block'>
                            <span className='ms-2'>تعديل</span>
                            <FiUserPlus />
                        </button>
                    </form>
                </div>
                {/* End Container From Bootstrap */}
            </section>
            {/* End Page Content Section */}
        </div>
        // End Profile Page
    );
}
