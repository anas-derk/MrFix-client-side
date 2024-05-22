// استيراد المكتبات المطلوبة + صورة صفحة نسيت كلمة السر
import Head from 'next/head';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import ForgetPasswordImage from "../../../public/images/ForgetPassword/forget-password.png";
import { inputValuesValidation } from "../../../public/global_functions/validations";
import { useRouter } from 'next/router';
import axios from "axios";
import { AiOutlineClockCircle } from "react-icons/ai";
import LoaderPage from '@/components/LoaderPage';
import ErrorOnLoadingThePage from '@/components/ErrorOnLoadingThePage';
import { getUserInfo } from '../../../public/global_functions/popular';

// تعريف دالة مكون نسيت كلمة السر
export default function ForgetPassword() {
    // تعريف المتغيرات المطلوب كــ state
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    const [isWaitCheckStatus, setIsWaitCheckStatus] = useState("");
    const [errMsg, setErrorMsg] = useState("");
    // تعريف راوتر لاستخدامه في التعامل مع روابط الصفحات
    const router = useRouter();
    // تعريف دالة useEffect من أجل عمل شيء ما عند تحميل الصفحة في جانب العميل أي المتصفح
    useEffect(() => {
        // جلب رقم معرّف المستخدم من التخزين المحلي
        const userToken = localStorage.getItem(process.env.userTokenNameInLocalStorage);
        // التحقق من أنّ الرقم موجود من أجل التأكد هل هذا الرقم لمستخدم ما أم تمّ التلاعب به
        if (userToken) {
            getUserInfo()
                .then(async (result) => {
                    if (!result.error) {
                        await router.push("/");
                    } else {
                        localStorage.removeItem(process.env.userTokenNameInLocalStorage);
                        setIsLoadingPage(false);
                    }
                })
                .catch(async (err) => {
                    if (err?.response?.data?.msg === "Unauthorized Error") {
                        localStorage.removeItem(process.env.userTokenNameInLocalStorage);
                        setIsLoadingPage(false);
                    } else {
                        setIsLoadingPage(false);
                        setIsErrorMsgOnLoadingThePage(true);
                    }
                });
        } else {
            setIsLoadingPage(false);
        }
    }, []);
    useEffect(() => {
        if (!isLoadingPage) {
            // جلب بعض العناصر من صفحة الويب باستخدام الجافا سكربت
            const header = document.querySelector("#__next .page-header"),
                pageContent = document.querySelector(".forget-password .page-content");
            // جعل أقل ارتفاع لعنصر pageContent هو عرض الصفحة المرأية كاملةً منقوصاً منها ارتفاع عنصر رأس الصفحة
            pageContent.style.minHeight = `calc(100vh - ${header.clientHeight}px)`;
        }
    }, [isLoadingPage]);
    // تعريف دالة معالجة نسيان كلمة المرور
    const forgetPassword = async (e) => {
        try {
            // منع إرسال المعلومات لنفس الصفحة
            e.preventDefault();
            // إعادة تعيين كائن الأخطاء الخاصة بالمدخلات إلى كائن فارغ لتصفير كل الأخطاء وإعادة التحقق من كل الأخطاء للمدخلات الجديدة
            setErrors({});
            // إرسال المدخلات إلى دالة inputValuesValidation للتحقق منها قبل إرسال الطلب إلى الباك ايند وتخزينها في المتغير errorsObject
            const errorsObject = inputValuesValidation(
                [
                    {
                        name: "email",
                        value: email,
                        rules: {
                            isRequired: {
                                msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                            },
                            isEmail: {
                                msg: "عذراً ، الإيميل الذي أدخلته غير صالح ، الرجاء إدخال إيميل صالح !!",
                            },
                        },
                    },
                ]
            );
            // تخزين الأخطاء الناتجة في ال state الخاص بالأخطاء
            setErrors(errorsObject);
            // التحقق من أنّ الكائن الخاص بالأخطاء فارغ أي لا يوجد أخطاء
            if (Object.keys(errorsObject).length == 0) {
                // تعديل قيمة ال state المسماة isWaitCheckStatus لتصبح true من أجل استخدامه لاحقاً في إظهار رسالة انتظار
                setIsWaitCheckStatus(true);
                // بداية محاولة إرسال الطلب
                // إرسال الطلب وتخزين الاستجابة في متغير
                const res = await axios.get(`${process.env.BASE_API_URL}/users/forget-password?email=${email}`);
                // جلب البيانات الناتجة عن الاستجابة
                const result = res.data;
                // التحقق من البيانات  المُرسلة كاستجابة
                if (result.error) {
                    // تعيين مؤقت ليتم تنفيذ تعليمات بعد ثانيتين
                    let waitTimeout = setTimeout(() => {
                        // تعديل قيمة ال state المسماة isWaitCheckStatus لتصبح false من أجل استخدامه لاحقاً في إخفاء رسالة الانتظار
                        setIsWaitCheckStatus(false);
                        // تعديل قيمة ال state المسماة errMsg من أجل استخدامه لاحقاً في إظهار رسالة خطأ
                        setErrorMsg(result.msg);
                        // تعيين مؤقت ليتم تنفيذ تعليمات بعد ثانيتين
                        let errorTimeout = setTimeout(() => {
                            // إعادة قيمة ال state المسماة errMsg إلى القيمة الفارغة الافتراضية من أجل استخدامها لاحقاً في إخفاء رسالة الخطأ
                            setErrorMsg("");
                            // حذف المتغيرات التي تحتوي المؤقت
                            clearTimeout(errorTimeout);
                            clearTimeout(waitTimeout);
                        }, 2000);
                    }, 2000);
                } else {
                    // تعيين مؤقت ليتم تنفيذ تعليمات بعد ثانيتين
                    let waitTimeout = setTimeout(async () => {
                        // تعديل قيمة ال state المسماة isWaitCheckStatus لتصبح false من أجل استخدامه لاحقاً في إخفاء رسالة الانتظار
                        setIsWaitCheckStatus(false);
                        // حذف المتعير الذي يحتوي المؤقت
                        clearTimeout(waitTimeout);
                        // إعادة التوجيه لصفحة إعادة ضبط كلمة السر بعد التحقق من الإيميل أنه موجود
                        await router.push(`/reset-password?email=${email}`);
                    }, 2000);
                }
            }
        }
        catch (err) {
            // طباعة رسالة الخطأ في الكونسول إن حصلت مشكلة عند إرسال الطلب للسيرفر
            setIsWaitCheckStatus(false);
            setErrorMsg("عذراً حدث خطا ما ، يرجى إعادة المحاولة !!");
            let errorTimeout = setTimeout(() => {
                setErrorMsg("");
                clearTimeout(errorTimeout);
            }, 5000);
        }
    }
    return (
        // بداية كتابة كود ال jsx لصفحة نسيت كلمة السر
        <div className="forget-password shared-pages-with-styles">
            {/* بداية كتابة معلومات عنصر ال head في ال html */}
            <Head>
                <title>مستر فيكس - نسيت كلمة السر</title>
            </Head>
            {/* نهاية كتابة معلومات عنصر ال head في ال html */}
            {!isLoadingPage && !isErrorMsgOnLoadingThePage && <>
                {/* بداية عرض مكون الرأس الذي أنشأناه */}
                <Header />
                {/* نهاية عرض مكون الرأس الذي أنشأناه */}
                {/* بداية كتابة كود ال jsx لعنصر ال html المسمى page-content */}
                <div className="page-content p-4">
                    {/* بداية مكون الحاوية من البوتستراب */}
                    <div className="container">
                        {/* بداية مكون الشبكة من البوتستراب */}
                        <div className="row align-items-center">
                            {/* بداية مكون العمود */}
                            <div className="col-lg-6 p-5">
                                {/* بداية كتابة كود ال jsx لعنصر ال html المسمى forget-password-form */}
                                <form
                                    className="forget-password-form bg-white p-4 pt-5 pb-5 text-center mt-4"
                                    onSubmit={forgetPassword}
                                >
                                    <h4 className='mb-5'>نسيت كلمة السر !</h4>
                                    <input
                                        type="text"
                                        placeholder="البريد الالكتروني"
                                        // في حالة يوجد خطأ بالإدخال نجعل الحواف بلون أحمر
                                        className={`form-control p-3 ${errors["email"] ? "border border-danger mb-2" : "mb-5"}`}
                                        onChange={(e) => setEmail(e.target.value.trim())}
                                    />
                                    {/* بداية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                    {errors["email"] && <p className='error-msg text-danger'>{errors["email"]}</p>}
                                    {/* نهاية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                    {/* في حالة لم يكن لدينا حالة التحقق في الانتظار ولا يوجد أي خطأ نظهر المكون التالي */}
                                    {!isWaitCheckStatus && !errMsg && <button type='submit' className='btn forget-password-btn w-100 p-3'>إرسال</button>}
                                    <p className='text-danger mt-4 mb-0 note'>تنويه: في حال لم يكن لديك إيميل يرجى التواصل على رقم الواتس
                                        09444444444444444444
                                    </p>
                                    {/* في حالة كان لدينا حالة التحقق في الانتظار ولا يوجد أي خطأ نظهر المكون التالي */}
                                    {isWaitCheckStatus && <button className='btn wait-check-btn w-100 p-3 mt-4 mx-auto d-block' disabled>
                                        <span className='ms-2'>جاري التحقق ...</span>
                                        <AiOutlineClockCircle />
                                    </button>}
                                    {/* في حالة كان لدينا خطأ نظهر المكون التالي */}
                                    {errMsg && <button className='btn btn-danger error-btn w-100 p-3 mt-4 mx-auto d-block' disabled>
                                        {errMsg}
                                    </button>}
                                    {/* في حالة كان لدينا خطأ نظهر المكون التالي */}
                                </form>
                                {/* نهاية كتابة كود ال jsx لعنصر ال html المسمى forget-password-form */}
                            </div>
                            {/* نهاية مكون العمود */}
                            {/* بداية مكون العمود */}
                            <div className="col-lg-6">
                                <img src={ForgetPasswordImage.src} alt="Forget Password Image !!" className='forget-password-img' />
                            </div>
                            {/* نهاية مكون العمود */}
                        </div>
                        {/* نهاية مكون الشبكة من البوتستراب */}
                    </div>
                    {/* نهاية مكون الحاوية من البوتستراب */}
                </div>
                {/* نهاية كتابة كود ال jsx لعنصر ال html المسمى page-content */}
            </>}
            {isLoadingPage && !isErrorMsgOnLoadingThePage && <LoaderPage />}
            {isErrorMsgOnLoadingThePage && <ErrorOnLoadingThePage />}
        </div>
        // نهاية كتابة كود ال jsx لصفحة نسيت كلمة السر
    );
}