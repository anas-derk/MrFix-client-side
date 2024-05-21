// استيراد المكتبات المطلوبة + صورة صفحة إنشاء الحساب
import Head from 'next/head';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import { FiUserPlus } from "react-icons/fi";
import { AiOutlineClockCircle, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { TfiFaceSmile } from "react-icons/tfi";
import { inputValuesValidation } from '../../../public/global_functions/validations';
import Link from 'next/link';
import axios from 'axios';
import ErrorOnLoadingThePage from '@/components/ErrorOnLoadingThePage';
import LoaderPage from '@/components/LoaderPage';
import { getUserInfo } from '../../../public/global_functions/popular';
import { useRouter } from 'next/router';

// تعريف دالة صفحة إنشاء الحساب 
export default function Signup() {
    // تعريف المتغيرات المطلوب كــ state
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);
    const [firstAndLastName, setFirstAndLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobilePhone, setMobilePhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gender, setGender] = useState("");
    const [birthday, setBirthday] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [errors, setErrors] = useState({});
    const [inputType, setInputType] = useState("text");
    const [isSignupStatus, setIsSignupStatus] = useState(false);
    const [isSuccessfulyStatus, setIsSuccessfulyStatus] = useState(false);
    const [errMsg, setErrorMsg] = useState("");
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] = useState(false);
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
                pageContent = document.querySelector(".sign-up .page-content");
            // جعل أقل ارتفاع لعنصر pageContent هو عرض الصفحة المرأية كاملةً منقوصاً منها ارتفاع عنصر رأس الصفحة
            pageContent.style.minHeight = `calc(100vh - ${header.clientHeight}px)`;
        }
    }, [isLoadingPage]);
    // تعريف دالة إرسال طلب إنشاء الحساب للباك ايند
    const createAccount = async (e) => {
        try {
            // منع إرسال المعلومات لنفس الصفحة
            e.preventDefault();
            // إعادة تعيين كائن الأخطاء الخاصة بالمدخلات إلى كائن فارغ لتصفير كل الأخطاء وإعادة التحقق من كل الأخطاء للمدخلات الجديدة
            setErrors({});
            // إرسال المدخلات إلى دالة inputValuesValidation للتحقق منها قبل إرسال الطلب إلى الباك ايند وتخزينها في المتغير errorsObject
            const errorsObject = inputValuesValidation(
                [
                    {
                        name: "firstAndLastName",
                        value: firstAndLastName,
                        rules: {
                            isRequired: {
                                msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                            },
                            maxLength: {
                                value: 30,
                                msg: "عذراً ، يجب أن يكون عدد الأحرف على الأكثر 30",
                            }
                        },
                    },
                    {
                        name: "mobilePhone",
                        value: mobilePhone,
                        rules: {
                            isRequired: {
                                msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                            },
                            isValidMobilePhone: {
                                msg: "عذراً ، يجب يكون رقم الهاتف من 10 أرقام ويجب أن يبدأ بإحدى الأرقام التالية : (093 أو 099 أو 098 أو 094 أو 095 أو 096 )",
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
                                msg: "عذراً ، يجب أن تكون كلمة السر تحتوي على الأقل 8 حروف أو أرقام أو كلاهما",
                            },
                        },
                    },
                    {
                        name: "confirmPassword",
                        value: confirmPassword,
                        rules: {
                            isRequired: {
                                msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                            },
                            isMatch: {
                                value: password,
                                msg: "عذراً ، لا يوجد تطابق بين كلمة السر وتأكيدها !!",
                            },
                        },
                    },
                    {
                        name: "gender",
                        value: gender,
                        rules: {
                            isRequired: {
                                msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                            },
                        },
                    },
                    {
                        name: "birthday",
                        value: birthday,
                        rules: {
                            isRequired: {
                                msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                            },
                        },
                    },
                    {
                        name: "city",
                        value: city,
                        rules: {
                            isRequired: {
                                msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                            },
                        },
                    },
                    {
                        name: "address",
                        value: address,
                        rules: {
                            isRequired: {
                                msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                            },
                        },
                    },
                ]
            );
            // تخزين الأخطاء الناتجة في ال state الخاص بالأخطاء
            setErrors(errorsObject);
            // التحقق من أنّ الكائن الخاص بالأخطاء فارغ أي لا يوجد أخطاء
            if (Object.keys(errorsObject).length == 0) {
                // تعديل قيمة ال state المسماة isSignupStatus لتصبح true من أجل استخدامه لاحقاً في إظهار رسالة انتظار
                setIsSignupStatus(true);
                // بداية محاولة إرسال الطلب
                // إرسال الطلب وتخزين الاستجابة في متغير
                const res = await axios.post(`${process.env.BASE_API_URL}/users/create-new-user`, {
                    firstAndLastName,
                    email: email ? email : "",
                    mobilePhone,
                    password,
                    gender,
                    birthday,
                    city,
                    address,
                });
                // جلب البيانات الناتجة عن الاستجابة
                const result = res.data;
                // التحقق من البيانات  المُرسلة كاستجابة
                if (!result.error) {
                    // تعيين مؤقت ليتم تنفيذ تعليمات بعد ثانيتين
                    let successStatusTimeout = setTimeout(() => {
                        // تعديل قيمة ال state المسماة isSignupStatus لتصبح false من أجل استخدامه لاحقاً في إخفاء رسالة الانتظار
                        setIsSignupStatus(false);
                        // تعديل قيمة ال state المسماة isSuccessfulyStatus من أجل استخدامه لاحقاً في إظهار رسالة نجاح العملية
                        setIsSuccessfulyStatus(true);
                        // حذف المتغير الذي يحتوي المؤقت
                        clearTimeout(successStatusTimeout);
                    }, 2000);
                } else {
                    // تعديل قيمة ال state المسماة isSignupStatus لتصبح false من أجل استخدامه لاحقاً في إخفاء رسالة الانتظار
                    setIsSignupStatus(false);
                    // إعادة قيمة ال state المسماة errMsg إلى القيمة الناتجة عن الاستجابة من أجل استخدامها لاحقاً في إظهار رسالة الخطأ
                    setErrorMsg(result.msg);
                    // تعيين مؤقت ليتم تنفيذ تعليمات بعد أربع ثواني
                    let errMsgTimeout = setTimeout(() => {
                        // إعادة قيمة ال state المسماة errMsg إلى القيمة الفارغة الافتراضية من أجل استخدامها لاحقاً في إخفاء رسالة الخطأ
                        setErrorMsg("");
                        // حذف المتغير الذي يحتوي المؤقت
                        clearTimeout(errMsgTimeout);
                    }, 4000);
                }
            }
        }
        catch(err) {
            // طباعة رسالة الخطأ في الكونسول إن حصلت مشكلة عند إرسال الطلب للسيرفر
            setIsSignupStatus(false);
            setErrorMsg("عذراً حدث خطا ما ، يرجى إعادة المحاولة !!");
            let errorTimeout = setTimeout(() => {
                setErrorMsg("");
                clearTimeout(errorTimeout);
            }, 5000);
        }
    }
    return (
        // بداية كتابة كود ال jsx لصفحة إنشاء الحساب
        <div className="sign-up">
            {/* بداية كتابة معلومات عنصر ال head في ال html */}
            <Head>
                <title>مستر فيكس - إنشاء حساب</title>
            </Head>
            {/* نهاية كتابة معلومات عنصر ال head في ال html */}
            {!isLoadingPage && !isErrorMsgOnLoadingThePage && <>
                {/* بداية عرض مكون الرأس الذي أنشأناه */}
                <Header />
                {/* نهاية عرض مكون الرأس الذي أنشأناه */}
                {/* بداية كتابة كود ال jsx لعنصر ال html المسمى page-content */}
                <section className="page-content pt-4 pb-4">
                    {/* بداية مكون الحاوية من البوتستراب */}
                    <div className="container">
                        <h1 className='page-title mb-4'>أهلاً وسهلاً بك في مستر فيكس</h1>
                        <form className="sign-up-form" onSubmit={createAccount}>
                            {/* بداية مكون الشبكة من البوتستراب */}
                            <div className="row">
                                {/* بداية مكون العمود */}
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        placeholder='الاسم والكنية'
                                        // في حالة يوجد خطأ بالإدخال نجعل الحواف بلون أحمر
                                        className={`form-control p-3 ${errors["firstAndLastName"] ? "border border-danger mb-2" : "mb-4"}`}
                                        onChange={(e) => setFirstAndLastName(e.target.value.trim())}
                                    />
                                    {/* بداية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                    {errors["firstAndLastName"] && <p className='error-msg text-danger'>{errors["firstAndLastName"]}</p>}
                                    {/* نهاية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                    <input
                                        type="email"
                                        placeholder="البريد الالكتروني"
                                        className={`form-control p-3 mb-4`}
                                        onChange={(e) => setEmail(e.target.value.trim())}
                                    />
                                    <input
                                        type="number"
                                        placeholder="رقم الجوال"
                                        // في حالة يوجد خطأ بالإدخال نجعل الحواف بلون أحمر
                                        className={`form-control p-3 ${errors["mobilePhone"] ? "border border-danger mb-2" : "mb-4"}`}
                                        onChange={(e) => setMobilePhone(e.target.value.trim())}
                                    />
                                    {/* بداية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                    {errors["mobilePhone"] && <p className='error-msg text-danger'>{errors["mobilePhone"]}</p>}
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
                                    <div className='confirm-password-field-box'>
                                        <input
                                            type={isVisibleConfirmPassword ? "text" : "password"}
                                            placeholder="تأكيد كلمة السر"
                                            // في حالة يوجد خطأ بالإدخال نجعل الحواف بلون أحمر
                                            className={`form-control p-3 ${errors["confirmPassword"] ? "border border-danger mb-2" : "mb-4"}`}
                                            onChange={(e) => setConfirmPassword(e.target.value.trim())}
                                        />
                                        <div className='icon-box'>
                                            {!isVisibleConfirmPassword && <AiOutlineEye className='eye-icon icon' onClick={() => setIsVisibleConfirmPassword(value => value = !value)} />}
                                            {isVisibleConfirmPassword && <AiOutlineEyeInvisible className='invisible-eye-icon icon' onClick={() => setIsVisibleConfirmPassword(value => value = !value)} />}
                                        </div>
                                    </div>
                                    {/* بداية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                    {errors["confirmPassword"] && <p className='error-msg text-danger'>{errors["confirmPassword"]}</p>}
                                    {/* نهاية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                </div>
                                {/* نهاية مكون العمود */}
                                {/* بداية مكون العمود */}
                                <div className="col-md-6">
                                    <select
                                        // في حالة يوجد خطأ بالإدخال نجعل الحواف بلون أحمر
                                        className={`form-control p-3 ${errors["gender"] ? "border border-danger mb-2" : "mb-4"}`}
                                        onChange={(e) => setGender(e.target.value)}
                                    >
                                        <option defaultValue="" hidden>اختر الجنس</option>
                                        <option value="male">ذكر</option>
                                        <option value="female">أنثى</option>
                                    </select>
                                    {/* بداية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                    {errors["gender"] && <p className='error-msg text-danger'>{errors["gender"]}</p>}
                                    {/* نهاية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                    <input
                                        type={inputType}
                                        placeholder="تاريخ الميلاد"
                                        // في حالة يوجد خطأ بالإدخال نجعل الحواف بلون أحمر
                                        className={`form-control p-3 ${errors["birthday"] ? "border border-danger mb-2" : "mb-4"}`}
                                        // تغيير نوع المدخل إلى تاريخ عند التركيز على المدخل
                                        onFocus={() => setInputType("date")}
                                        // تغيير نوع المدخل إلى نص عند إزالة التركيز عن المدخل
                                        onBlur={() => setInputType("text")}
                                        onChange={(e) => setBirthday(e.target.value)}
                                    />
                                    {/* بداية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                    {errors["birthday"] && <p className='error-msg text-danger'>{errors["birthday"]}</p>}
                                    {/* نهاية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                    <select
                                        // في حالة يوجد خطأ بالإدخال نجعل الحواف بلون أحمر
                                        className={`form-control p-3 ${errors["city"] ? "border border-danger mb-2" : "mb-4"}`}
                                        onChange={(e) => setCity(e.target.value)}
                                    >
                                        <option defaultValue="" hidden>اختر المحافظة</option>
                                        <option value="damascus">دمشق</option>
                                        <option value="rif-damascus">ريف دمشق</option>
                                    </select>
                                    {/* بداية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                    {errors["city"] && <p className='error-msg text-danger'>{errors["city"]}</p>}
                                    {/* نهاية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                    <textarea
                                        placeholder="محافظة دمشق، الميدان، امتداد شارع المول, بناء الغاردينيا، مقابل/ قرب محل الملكي، الطابق الرابع"
                                        // في حالة يوجد خطأ بالإدخال نجعل الحواف بلون أحمر
                                        className={`form-control p-3 address ${errors["address"] ? "border border-danger mb-2" : "mb-4"}`}
                                        onChange={(e) => setAddress(e.target.value.trim())}
                                    />
                                    {/* بداية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                    {errors["address"] && <p className='error-msg text-danger'>{errors["address"]}</p>}
                                    {/* نهاية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                </div>
                                {/* نهاية مكون العمود */}
                            </div>
                            {/* نهاية مكون الشبكة من البوتستراب */}
                            {/* في حالة لم يكن لدينا حالة إنشاء الحساب في الانتظار ولا يوجد أي خطأ نظهر المكون التالي */}
                            {!isSignupStatus && !errMsg && <button className='btn sign-up-btn w-50 p-3 mt-4 mx-auto d-block'>
                                <span className='ms-2'>تسجيل</span>
                                <FiUserPlus />
                            </button>}
                            {/* في حالة لم يكن لدينا حالة إنشاء الحساب في الانتظار ولا يوجد أي خطأ نظهر المكون التالي */}
                            {/* في حالة كان لدينا حالة إنشاء الحساب في الانتظار ولا يوجد أي خطأ نظهر المكون التالي */}
                            {isSignupStatus && <button className='btn wait-sign-up-btn w-50 p-3 mt-4 mx-auto d-block' disabled>
                                <span className='ms-2'>جاري التسجيل ...</span>
                                <AiOutlineClockCircle />
                            </button>}
                            {/* في حالة كان لدينا حالة إنشاء الحساب في الانتظار ولا يوجد أي خطأ نظهر المكون التالي */}
                            {/* في حالة كان لدينا خطأ نظهر المكون التالي */}
                            {errMsg && <button className='btn btn-danger error-btn w-50 p-3 mt-4 mx-auto d-block' disabled>
                                {errMsg}
                            </button>}
                            {/* في حالة كان لدينا خطأ نظهر المكون التالي */}
                        </form>
                    </div>
                    {/* نهاية مكون الحاوية من البوتستراب */}
                </section>
                {/* نهاية كتابة كود ال jsx لعنصر ال html المسمى page-content */}
                {/* في حالة كان لدينا حالة النجاح نظهر المكون التالي */}
                {isSuccessfulyStatus &&
                    /* بداية كتابة كود ال jsx لعنصر ال html المسمى popup-box */
                    <div className="popup-box">
                        <div className="popup d-flex flex-column align-items-center justify-content-center">
                            <h3 className='text-center welcome-msg mb-4'>
                                <span className='ms-3'>مبارك عزيزي الزائر</span>
                                <TfiFaceSmile />
                            </h3>
                            <h4 className='signup-confirm-msg'>لقد تمّ تسجيل حسابك لدينا</h4>
                            <h5 className='happy-msg mb-5'>نحن مسرورون بانضمامك لدينا</h5>
                            <Link className='btn btn-success' href="/login">تسجيل الدخول الآن</Link>
                        </div>
                    </div>
                    /* نهاية كتابة كود ال jsx لعنصر ال html المسمى popup-box */
                }
                {/* في حالة كان لدينا حالة النجاح نظهر المكون التالي */}
            </>}
            {isLoadingPage && !isErrorMsgOnLoadingThePage && <LoaderPage />}
            {isErrorMsgOnLoadingThePage && <ErrorOnLoadingThePage />}
        </div>
        // نهاية كتابة كود ال jsx لصفحة إنشاء الحساب
    );
}
