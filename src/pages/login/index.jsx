// استيراد المكتبات المطلوبة + صورة صفحة تسجيل الدخول
import Head from 'next/head';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import loginImage from "../../../public/images/Login/login.png";
import Link from 'next/link';
import { inputValuesValidation } from '../../../public/global_functions/validations';
import axios from 'axios';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineClockCircle } from "react-icons/ai";
import { useRouter } from "next/router";
import { getUserInfo } from '../../../public/global_functions/popular';
import LoaderPage from '@/components/LoaderPage';
import ErrorOnLoadingThePage from '@/components/ErrorOnLoadingThePage';

// تعريف دالة صفحة تسجيل الدخول 
export default function Login() {
    // تعريف المتغيرات المطلوب كــ state
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);
    const [text, setText] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [errMsg, setErrorMsg] = useState("");
    const [isLoginStatus, setIsLoginStatus] = useState(false);
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    // تعريف راوتر لاستخدامه في التعامل مع روابط الصفحات
    const router = useRouter();
    // تعريف دالة useEffect من أجل عمل شيء ما عند تحميل الصفحة في جانب العميل أي المتصفح
    useEffect(() => {
        if (!isLoadingPage) {
            // جلب بعض العناصر من صفحة الويب باستخدام الجافا سكربت
            const header = document.querySelector("#__next .page-header"),
                pageContent = document.querySelector(".login .page-content");
            // جعل أقل ارتفاع لعنصر pageContent هو عرض الصفحة المرأية كاملةً منقوصاً منها ارتفاع عنصر رأس الصفحة
            pageContent.style.minHeight = `calc(100vh - ${header.clientHeight}px)`;
        }
    }, isLoadingPage);
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
    // تعريف دالة معالجة تسجيل الدخول
    const login = async (e) => {
        // منع إرسال المعلومات لنفس الصفحة
        e.preventDefault();
        // إعادة تعيين كائن الأخطاء الخاصة بالمدخلات إلى كائن فارغ لتصفير كل الأخطاء وإعادة التحقق من كل الأخطاء للمدخلات الجديدة
        setErrors({});
        // إرسال المدخلات إلى دالة inputValuesValidation للتحقق منها قبل إرسال الطلب إلى الباك ايند وتخزينها في المتغير errorsObject
        const errorsObject = inputValuesValidation(
            [
                {
                    name: "text",
                    value: text,
                    rules: {
                        isRequired: {
                            msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                        },
                        isEmailOrMobilePhone: {
                            msg: "عذراً ، الإيميل أو رقم الهاتف الذي أدخلته غير صالح ، الرجاء إدخال إيميل أو رقم هاتف  !!",
                        },
                    },
                },
                {
                    name: "password",
                    value: password,
                    rules: {
                        isRequired: {
                            msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                        },
                        isValidPassword: {
                            value: password,
                            msg: "عذراً ، يجب أن تكون كلمة السر تحتوي على الأقل 8 حروف أو أرقام أو كلاهما.                            ",
                        },
                    },
                },
            ]
        );
        // تخزين الأخطاء الناتجة في ال state الخاص بالأخطاء
        setErrors(errorsObject);
        // التحقق من أنّ الكائن الخاص بالأخطاء فارغ أي لا يوجد أخطاء
        if (Object.keys(errorsObject).length == 0) {
            // تعديل قيمة ال state المسماة isLoginStatus لتصبح true من أجل استخدامه لاحقاً في إظهار رسالة انتظار
            setIsLoginStatus(true);
            // بداية محاولة إرسال الطلب
            try {
                // إرسال الطلب وتخزين الاستجابة في متغير
                const res = await axios.get(`${process.env.BASE_API_URL}/users/login?text=${text}&password=${password}`);
                // جلب البيانات الناتجة عن الاستجابة
                const result = res.data;
                // التحقق من البيانات  المُرسلة كاستجابة
                if (result.error) {
                    // تعيين مؤقت ليتم تنفيذ تعليمات بعد ثانيتين
                    let loginTimeout = setTimeout(() => {
                        // تعديل قيمة ال state المسماة isLoginStatus لتصبح false من أجل استخدامه لاحقاً في إخفاء رسالة الانتظار
                        setIsLoginStatus(false);
                        // تعديل قيمة ال state المسماة errMsg من أجل استخدامه لاحقاً في إظهار رسالة خطأ
                        setErrorMsg(result.msg);
                        // تعيين مؤقت ليتم تنفيذ تعليمات بعد ثانيتين
                        let errorTimeout = setTimeout(() => {
                            // إعادة قيمة ال state المسماة errMsg إلى القيمة الفارغة الافتراضية من أجل استخدامها لاحقاً في إخفاء رسالة الخطأ
                            setErrorMsg("");
                            // حذف المتغيرات التي تحتوي المؤقت
                            clearTimeout(errorTimeout);
                            clearTimeout(loginTimeout);
                        }, 2000);
                    }, 2000);
                } else {
                    // تعيين مؤقت ليتم تنفيذ تعليمات بعد ثانيتين
                    let loginTimeout = setTimeout(async () => {
                        // تعديل قيمة ال state المسماة isLoginStatus لتصبح false من أجل استخدامه لاحقاً في إخفاء رسالة الانتظار
                        setIsLoginStatus(false);
                        // حذف المتعير الذي يحتوي المؤقت
                        clearTimeout(loginTimeout);
                        // تخزين نتيجة الاستجابة أي رقم معرّف المستخدم في التخزين المحلي
                        localStorage.setItem(process.env.userTokenNameInLocalStorage, result.data.token);
                        // إعادة التوجيه للصفحة الرئيسية بعد تسجيل الدخول
                        await router.push("/");
                    }, 2000);
                }
            } catch (err) {
                // طباعة رسالة الخطأ في الكونسول إن حصلت مشكلة عند إرسال الطلب للسيرفر
                setIsLoginStatus(false);
                setErrorMsg("عذراً حدث خطا ما ، يرجى إعادة المحاولة !!");
                let errorTimeout = setTimeout(() => {
                    setErrorMsg("");
                    clearTimeout(errorTimeout);
                }, 5000);
            }
        }
    }
    return (
        // بداية كتابة كود ال jsx لصفحة تسجيل الدخول
        <div className="login shared-pages-with-styles">
            {/* بداية كتابة معلومات عنصر ال head في ال html */}
            <Head>
                <title>مستر فيكس - تسجيل الدخول</title>
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
                            <div className="col-lg-7 p-5">
                                {/* بداية كتابة كود ال jsx لعنصر ال html المسمى login-form */}
                                <form className="login-form bg-white p-4 text-center" onSubmit={login}>
                                    <h4 className='mb-4'>أهلاً بعودتك .</h4>
                                    <input
                                        type="text"
                                        placeholder="البريد الالكتروني أو رقم الجوال"
                                        // في حالة يوجد خطأ بالإدخال نجعل الحواف بلون أحمر
                                        className={`form-control p-3 ${errors["text"] ? "border border-danger mb-2" : "mb-4"}`}
                                        onChange={(e) => setText(e.target.value.trim())}
                                    />
                                    {/* بداية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                    {errors["text"] && <p className='error-msg text-danger'>{errors["text"]}</p>}
                                    {/* نهاية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                    <div className='password-field-box'>
                                        <input
                                            type={isVisiblePassword ? "text" : "password"}
                                            placeholder="كلمة السر"
                                            // في حالة يوجد خطأ بالإدخال نجعل الحواف بلون أحمر
                                            className={`form-control p-3 ${errors["password"] ? "border border-danger mb-2" : "mb-4"}`}
                                            onChange={(e) => setPassword(e.target.value.trim())}
                                        />
                                        <div className='icon-box'>
                                            {!isVisiblePassword && <AiOutlineEye className='eye-icon icon' onClick={() => setIsVisiblePassword(value => value = !value)} />}
                                            {isVisiblePassword && <AiOutlineEyeInvisible className='invisible-eye-icon icon' onClick={() => setIsVisiblePassword(value => value = !value)} />}
                                        </div>
                                    </div>
                                    {/* بداية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                    {errors["password"] && <p className='error-msg text-danger'>{errors["password"]}</p>}
                                    {/* نهاية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                    <Link href="/forget-password" className='mb-3 btn w-100 text-start'>نسيت كلمة السر !</Link>
                                    {/* في حالة لم يكن لدينا حالة تسجيل الدخول في الانتظار ولا يوجد أي خطأ نظهر المكون التالي */}
                                    {!isLoginStatus && !errMsg && <button type='submit' className='btn login-btn w-100 p-3'>تسجيل الدخول</button>}
                                    {/* في حالة لم يكن لدينا حالة تسجيل الدخول في الانتظار ولا يوجد أي خطأ نظهر المكون التالي */}
                                    {/* في حالة كان لدينا حالة تسجيل الدخول في الانتظار ولا يوجد أي خطأ نظهر المكون التالي */}
                                    {isLoginStatus && <button className='btn wait-login-btn w-100 p-3 mt-4 mx-auto d-block' disabled>
                                        <span className='ms-2'>جاري تسجيل الدخول ...</span>
                                        <AiOutlineClockCircle />
                                    </button>}
                                    {/* في حالة كان لدينا حالة تسجيل الدخول في الانتظار ولا يوجد أي خطأ نظهر المكون التالي */}
                                    {/* في حالة كان لدينا خطأ نظهر المكون التالي */}
                                    {errMsg && <button className='btn btn-danger error-btn w-100 p-3 mt-4 mx-auto d-block' disabled>
                                        {errMsg}
                                    </button>}
                                    {/* في حالة كان لدينا خطأ نظهر المكون التالي */}
                                </form>
                                {/* بداية كتابة كود ال jsx لعنصر ال html المسمى login-form */}
                            </div>
                            {/* نهاية مكون العمود */}
                            {/* بداية مكون العمود */}
                            <div className="col-lg-5">
                                <img src={loginImage.src} alt="Login Image !!" className='login-img' />
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
        // نهاية كتابة كود ال jsx لصفحة تسجيل الدخول
    );
}
