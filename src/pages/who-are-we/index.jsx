import Head from 'next/head';
import Header from '@/components/Header';
import SideBar from '@/components/sideBar';
import { useEffect, useState } from 'react';
import whoAreWeImage from "../../../public/images/WhoAreWe/who-are-we.png";

export default function WhoAreWe() {

    const [isSideBarAppeared, setIsSideBarAppeared] = useState(false);

    useEffect(() => {

        let header = document.querySelector("#__next .page-header"),
            pageContent = document.querySelector(".who-are-we .page-content");

        pageContent.style.minHeight = `calc(100vh - ${header.clientHeight}px)`;

    }, []);

    return (
        // Start Who Are We Page
        <div className="who-are-we shared-pages-with-styles">
            <Head>
                <title>Mr. Fix - Who Are We</title>
            </Head>
            <Header setIsSideBarAppeared={setIsSideBarAppeared} />
            {isSideBarAppeared && <SideBar />}
            {/* Start Page Content Section */}
            <section className="page-content">
                {/* Start Container From Bootstrap */}
                <div className="container">
                    {/* Start Grid System From Bootstrap */}
                    <div className="row align-items-center">
                    <h1 className='page-title text-center mb-2'>من نحن ؟</h1>
                        {/* Start Column */}
                        <div className="col-md-6">
                            <p className='who-are-we-explain page-content-explain'>
                                من الألف إلى الياء ، أردنا بناء خدمة من خلال شركة تمنح مفهوم آخر و طرق جديدة لإجراء عملية الصيانة، شركة هدفها الإرتباط بعملائها، ودائمًا نحو الأفضل لجعل حياتك أسهل في إدارتها
                                Mr.FIX عبارة عن منصة تساعدك على البقاء في حالة راحة و أمان في جميع أنشطة صيانة منزلك ، بما في ذلك سهولة التواصل و سرعة الاإجابة
                                من خلال موقع بسيط، يتيح Mr.FIX لأصحاب المنازل بالتخطيط لحياة ذكية وآمنة ومستدامة
                                نحن دليلك نحو منزل آمن
                                مكان واحد لكل احتياجات منزلك: إصلاح و صيانة جميع ما يحتاجه منزلك في مكان واحد
                                أضف قيمة إلى منزلك من خلال الحفاظ عليه و عدم إهمال الصيانات الدورية
                                من خلال السهولة التي توفرها التكنولوجيا في التواصل أعتني بمنزلك من خلال هاتفك .
                            </p>
                        </div>
                        {/* End Column */}
                        {/* Start Column */}
                        <div className="col-md-6">
                            <img src={whoAreWeImage.src} alt="Who Are We Image !!" className='who-are-we-img page-img' />
                        </div>
                        {/* End Column */}
                    </div>
                    {/* End Grid System From Bootstrap */}
                </div>
                {/* End Container From Bootstrap */}
            </section>
            {/* End Page Content Section */}
        </div>
        // End Who Are We Page
    );
}
