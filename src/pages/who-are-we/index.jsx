// استيراد المكتبات المطلوبة + صورة صفحة من نحن
import Head from 'next/head';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import whoAreWeImage from "../../../public/images/WhoAreWe/who-are-we.png";
import { getUserInfo } from '../../../public/global_functions/popular';
import LoaderPage from '@/components/LoaderPage';
import ErrorOnLoadingThePage from '@/components/ErrorOnLoadingThePage';

// تعريف دالة مكون من نحن
export default function WhoAreWe() {
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);
    // تعريف دالة useEffect من أجل عمل شيء ما عند تحميل الصفحة في جانب العميل أي المتصفح
    useEffect(() => {
        if (!isLoadingPage) {
            // جلب بعض العناصر من صفحة الويب باستخدام الجافا سكربت
            const header = document.querySelector("#__next .page-header"),
                pageContent = document.querySelector(".who-are-we .page-content");
            // جعل أقل ارتفاع لعنصر pageContent هو عرض الصفحة المرأية كاملةً منقوصاً منها ارتفاع عنصر رأس الصفحة
            pageContent.style.minHeight = `calc(100vh - ${header.clientHeight}px)`;
        }
    }, [isLoadingPage]);
    useEffect(() => {
        const userToken = localStorage.getItem(process.env.userTokenNameInLocalStorage);
        if (userToken) {
            getUserInfo()
                .then(async (result) => {
                    setIsLoadingPage(false);
                    if (result.error) {
                        localStorage.removeItem(process.env.userTokenNameInLocalStorage);
                    }
                })
                .catch(async (err) => {
                    setIsLoadingPage(false);
                    if (err?.response?.data?.msg === "Unauthorized Error") {
                        localStorage.removeItem(process.env.userTokenNameInLocalStorage);
                    } else {
                        setIsErrorMsgOnLoadingThePage(true);
                    }
                });
        } else {
            setIsLoadingPage(false);
        }
    }, []);
    return (
        // بداية كتابة كود ال jsx لصفحة من نحن
        <div className="who-are-we shared-pages-with-styles">
            {/* بداية كتابة معلومات عنصر ال head في ال html */}
            <Head>
                <title>مستر فيكس - من نحن ؟</title>
            </Head>
            {/* نهاية كتابة معلومات عنصر ال head في ال html */}
            {!isLoadingPage && !isErrorMsgOnLoadingThePage && <>
                {/* بداية عرض مكون الرأس الذي أنشأناه */}
                <Header />
                {/* نهاية عرض مكون الرأس الذي أنشأناه */}
                {/* بداية كتابة كود ال jsx لعنصر ال html المسمى page-content */}
                <section className="page-content p-4">
                    {/* بداية مكون الحاوية من البوتستراب */}
                    <div className="container">
                        {/* بداية مكون الشبكة من البوتستراب */}
                        <div className="row align-items-center">
                            {/* بداية مكون العمود */}
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
                            {/* نهاية مكون العمود */}
                            {/* بداية مكون العمود */}
                            <div className="col-md-6">
                                <div className='image-box'>
                                    <img src={whoAreWeImage.src} alt="Who Are We Image !!" className='who-are-we-img page-img' />
                                </div>
                            </div>
                            {/* نهاية مكون العمود */}
                        </div>
                        {/* نهاية مكون الشبكة من البوتستراب */}
                    </div>
                    {/* نهاية مكون الحاوية من البوتستراب */}
                </section>
                {/* نهاية كتابة كود ال jsx لعنصر ال html المسمى page-content */}
            </>}
            {isLoadingPage && !isErrorMsgOnLoadingThePage && <LoaderPage />}
            {isErrorMsgOnLoadingThePage && <ErrorOnLoadingThePage />}
        </div>
        // نهاية كتابة كود ال jsx لصفحة من نحن
    );
}
