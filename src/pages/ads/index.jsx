// استيراد المكتبات المطلوبة
import Head from 'next/head';
import Header from '@/components/Header';
import { useEffect } from 'react';
import Axios from "axios";

// تعريف دالة مكون من نحن
export default function Ads({ result }) {
    // تعريف دالة useEffect من أجل عمل شيء ما عند تحميل الصفحة في جانب العميل أي المتصفح
    useEffect(() => {
        // جلب بعض العناصر من صفحة الويب باستخدام الجافا سكربت
        const header = document.querySelector("#__next .page-header"),
            pageContent = document.querySelector(".ads .page-content");
        // جعل أقل ارتفاع لعنصر pageContent هو عرض الصفحة المرأية كاملةً منقوصاً منها ارتفاع عنصر رأس الصفحة
        pageContent.style.minHeight = `calc(100vh - ${header.clientHeight}px)`;
    }, []);
    return (
        // بداية كتابة كود ال jsx لصفحة من نحن
        <div className="ads shared-pages-with-styles">
            {/* بداية كتابة معلومات عنصر ال head في ال html */}
            <Head>
                <title>مستر فيكس - الإعلانات</title>
            </Head>
            {/* نهاية كتابة معلومات عنصر ال head في ال html */}
            {/* بداية عرض مكون الرأس الذي أنشأناه */}
            <Header />
            {/* نهاية عرض مكون الرأس الذي أنشأناه */}
            {/* بداية كتابة كود ال jsx لعنصر ال html المسمى page-content */}
            <section className="page-content p-4">
                {/* بداية مكون الحاوية من البوتستراب */}
                <div className="container">
                    <h1 className='welcome-msg text-center mb-4'>مرحباً بك في صفحة الإعلانات</h1>
                    {/* بداية مكون الشبكة من البوتستراب */}
                    <div className="ads-box align-items-center p-4">
                        {result.map((ad, index) => (
                            <p className={`ad-content p-3 text-white ${index !== result.length - 1 ? "mb-4": ""}`} key={index}>{ ad.content }</p>
                        ))}
                    </div>
                    {/* نهاية مكون الشبكة من البوتستراب */}
                </div>
                {/* نهاية مكون الحاوية من البوتستراب */}
            </section>
            {/* نهاية كتابة كود ال jsx لعنصر ال html المسمى page-content */}
        </div>
        // نهاية كتابة كود ال jsx لصفحة من نحن
    );
}

// تعريف دالة getServerSideProps لجلب بيانات كل الإعلانات في جهة الخادم وليس من جانب المتصفح
export async function getServerSideProps() {
    let res = await Axios.get(`${process.env.BASE_API_URL}/admin/ads/all-ads`);
    let result = await res.data;
    return {
        props: { result },
    };
}