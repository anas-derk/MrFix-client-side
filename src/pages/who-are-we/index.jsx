import Head from 'next/head';
import Header from '@/components/Header';
import { useEffect } from 'react';
import whoAreWeImage from "../../../public/images/WhoAreWe/who-are-we.png";

export default function WhoAreWe() {

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
            <Header />
            {/* Start Page Content Section */}
            <section className="page-content p-4">
                {/* Start Container From Bootstrap */}
                <div className="container">
                    {/* Start Grid System From Bootstrap */}
                    <div className="row align-items-center">
                        {/* Start Column */}
                        <div className="col-md-6">
                            <p className='who-are-we-explain page-content-explain pe-4 ps-4'>
                                من الألف إلى الياء ، أردنا بناء خدمة من خلال شركة وسيطة تمنح مفهوم آخر وطرق جديدة لإجراء عملية الصيانة، شركة هدفها الإرتباط بعملائها، ودائمًا نحو الأفضل لجعل حياتك أسهل في إدارتها.
                                <br />
                                <br />
                                ما عليك فعله هو الدخول إلى موقعنا، اختيار الخدمة التي تحتاجها، وتحديد الموعد المناسب لك، وبدورنا سنقوم بإرسال المهنيين المؤهلين والمجهزين بالأدوات اللازمة لإصلاح وصيانة أي شيء تريده في منزلك أو مكتبك .
                                <br />
                                <br />
                                نحن هنا لمساعدتك، و لنضمن لك سهولة التواصل و سرعة الإجابة و الجودة العالية والأسعار المناسبة و لنضمن تحقيق رضاك.
                                <br />
                                <br />
                                مستر فيكس مكان واحد لكافة احتياجات منزلك من خلال هاتفك، حيث نرغب في أن نكون جزءَا في توفير الأمان و الراحة بشكل دائم.
                                <br />
                                <br />
                                لماذا نحن مختلفون :
                                <br />
                                العناية بالصيانة ليست مجرد خدمة، نحن نتفهم أن ما نقدمه هو جزء من حياتك اليومية، هدفنا هو أن نكون موثوقين ومفيدين ونأمل أن نكون مبدعين في تحقيق رغباتك لتعيش حياة رغيدة في منزلك لذا سنبقى مكرسين للتأكد من أن راحتك وأمانك في منزلك محقق من خلال الاهتمام المستمر و خدمة ما بعد البيع.
                            </p>
                        </div>
                        {/* End Column */}
                        {/* Start Column */}
                        <div className="col-md-6">
                            <div className='image-box'>
                                <img src={whoAreWeImage.src} alt="Who Are We Image !!" className='who-are-we-img page-img' />
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
        // End Who Are We Page
    );
}
