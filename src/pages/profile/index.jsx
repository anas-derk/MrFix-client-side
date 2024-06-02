// استيراد المكتبات المطلوبة + صورة صفحة الملف الشخصي
import Head from 'next/head';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import { FiUserPlus } from "react-icons/fi";
import { AiOutlineClockCircle, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { inputValuesValidation } from '../../../public/global_functions/validations';
import axios from 'axios';
import { useRouter } from 'next/router';
import LoaderPage from '@/components/LoaderPage';
import ErrorOnLoadingThePage from '@/components/ErrorOnLoadingThePage';
import { getUserInfo } from '../../../public/global_functions/popular';

// تعريف دالة صفحة الملف الشخصي 
export default function Profile() {
    // تعريف المتغيرات المطلوب كــ state
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);
    const [userInfo, setUserInfo] = useState({
        firstAndLastName: "",
        email: "",
        mobilePhone: "",
        password: "",
        gender: "",
        birthday: "",
        city: "",
        address: "",
    });
    const [errors, setErrors] = useState({});
    const [inputType, setInputType] = useState("text");
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
    const [isSuccessfulyStatus, setIsSuccessfulyStatus] = useState(false);
    const [errMsg, setErrorMsg] = useState("");
    const [defaultMobilePhone, setDefaultMobilePhone] = useState("");
    const [defaultEmail, setDefaultEmail] = useState("");
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    // تعريف راوتر لاستخدامه في التعامل مع روابط الصفحات
    const router = useRouter();
    // تعريف دالة useEffect من أجل عمل شيء ما عند تحميل الصفحة في جانب العميل أي المتصفح
    useEffect(() => {
        if (!isLoadingPage && !isErrorMsgOnLoadingThePage) {
            // جلب بعض العناصر من صفحة الويب باستخدام الجافا سكربت
            const header = document.querySelector("#__next .page-header"),
                pageContent = document.querySelector(".profile .page-content");
            // جعل أقل ارتفاع لعنصر pageContent هو عرض الصفحة المرأية كاملةً منقوصاً منها ارتفاع عنصر رأس الصفحة
            pageContent.style.minHeight = `calc(100vh - ${header.clientHeight}px)`;
        }
    }, [isLoadingPage]);
    useEffect(() => {
        const userToken = localStorage.getItem(process.env.userTokenNameInLocalStorage);
        if (userToken) {
            getUserInfo()
                .then(async (result) => {
                    if (!result.error) {
                        const userData = result.data;
                        setUserInfo({
                            firstAndLastName: userData.firstAndLastName,
                            email: userData.email,
                            mobilePhone: userData.mobilePhone,
                            password: "",
                            gender: userData.gender,
                            birthday: userData.birthday,
                            city: userData.city,
                            address: userData.address,
                        });
                        setDefaultEmail(userData.email);
                        setDefaultMobilePhone(userData.mobilePhone);
                        setIsLoadingPage(false);
                    } else {
                        localStorage.removeItem(process.env.userTokenNameInLocalStorage);
                        await router.replace("/login");
                    }
                })
                .catch(async (err) => {
                    if (err?.response?.data?.msg === "Unauthorized Error") {
                        localStorage.removeItem(process.env.userTokenNameInLocalStorage);
                        await router.replace("/login");
                    } else {
                        setIsLoadingPage(false);
                        setIsErrorMsgOnLoadingThePage(true);
                    }
                });
        } else {
            router.replace("/login");
        }
    }, []);
    // تعريف دالة إرسال طلب للباك ايند لتحديث بيانات  المستخدم
    const updateProfile = async (e) => {
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
                        value: userInfo.firstAndLastName,
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
                        value: userInfo.mobilePhone,
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
                        value: userInfo.password,
                        rules: {
                            isValidPassword: {
                                msg: "عذراً ، يجب أن تكون كلمة السر تحتوي على الأقل 8 حروف أو أرقام أو كلاهما.",
                            },
                        },
                    },
                    {
                        name: "gender",
                        value: userInfo.gender,
                        rules: {
                            isRequired: {
                                msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                            },
                        },
                    },
                    {
                        name: "birthday",
                        value: userInfo.birthday,
                        rules: {
                            isRequired: {
                                msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                            },
                        },
                    },
                    {
                        name: "city",
                        value: userInfo.city,
                        rules: {
                            isRequired: {
                                msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                            },
                        },
                    },
                    {
                        name: "address",
                        value: userInfo.address,
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
            if (Object.keys(errorsObject).length == 0) {
                // تعديل قيمة ال state المسماة isUpdatingStatus لتصبح true من أجل استخدامه لاحقاً في إظهار رسالة انتظار
                setIsUpdatingStatus(true);
                // تعريف كائن بيانات المستخدم الذي سنستخدمه في إرسال البيانات المطلوب فقط مع الطلب إلى الباك ايند
                let newUserData = {};
                newUserData = {
                    firstAndLastName: userInfo.firstAndLastName,
                    email: userInfo.email,
                    mobilePhone: userInfo.mobilePhone,
                    password: userInfo.password,
                    gender: userInfo.gender,
                    birthday: userInfo.birthday,
                    city: userInfo.city,
                    address: userInfo.address,
                }
                // في حالة الإيميل هو نفسه الإيميل الافتراضي أي لم يتم تعديل الإيميل عندها نضع قيمة المتغير isSameOfEmail هي نعم وإلا نضع لا
                const isSameOfEmail = userInfo.email === defaultEmail ? "yes" : "no";
                // في حالة رقم الموبايل هو نفسه رقم الموبايل الافتراضي أي لم يتم تعديل الإيميل عندها نضع قيمة المتغير isSameOfEmail هي نعم وإلا نضع لا
                const isSameOfMobilePhone = userInfo.mobilePhone === defaultMobilePhone ? "yes" : "no";
                // بداية محاولة إرسال الطلب
                // جلب البيانات الناتجة عن الاستجابة
                const res = await axios.put(`${process.env.BASE_API_URL}/users/update-user-info?isSameOfEmail=${isSameOfEmail}&isSameOfMobilePhone=${isSameOfMobilePhone}`, newUserData, {
                    headers: {
                        Authorization: localStorage.getItem(process.env.userTokenNameInLocalStorage),
                    }
                });
                // جلب البيانات الناتجة عن الاستجابة
                const result = res.data;
                // التحقق من البيانات  المُرسلة كاستجابة
                if (result.error) {
                    // تعيين مؤقت ليتم تنفيذ تعليمات بعد ثانيتين
                    setTimeout(() => {
                        // تعديل قيمة ال state المسماة isUpdatingStatus لتصبح false من أجل استخدامه لاحقاً في إخفاء رسالة الانتظار
                        setIsUpdatingStatus(false);
                        // إعادة قيمة ال state المسماة errMsg إلى القيمة الناتجة عن الاستجابة من أجل استخدامها لاحقاً في إظهار رسالة الخطأ
                        setErrorMsg(result.msg);
                        // تعيين مؤقت ليتم تنفيذ تعليمات بعد أربع ثواني
                        let errMsgTimeout = setTimeout(() => {
                            // إعادة قيمة ال state المسماة errMsg إلى القيمة الفارغة الافتراضية من أجل استخدامها لاحقاً في إخفاء رسالة الخطأ
                            setErrorMsg("");
                            // حذف المتغير الذي يحتوي المؤقت
                            clearTimeout(errMsgTimeout);
                        }, 4000);
                    }, 2000);
                } else {
                    // تعيين مؤقت ليتم تنفيذ تعليمات بعد ثانيتين
                    setTimeout(() => {
                        // تعديل قيمة ال state المسماة isUpdatingStatus لتصبح false من أجل استخدامه لاحقاً في إخفاء رسالة الانتظار
                        setIsUpdatingStatus(false);
                        // تعديل قيمة ال state المسماة isSuccessfulyStatus لتصبح true من أجل استخدامه لاحقاً في إظهار رسالة النجاح
                        setIsSuccessfulyStatus(true);
                        // تعيين مؤقت ليتم تنفيذ تعليمات بعد أربع ثواني
                        let successMsgTimeout = setTimeout(() => {
                            // تعديل قيمة ال state المسماة isSuccessfulyStatus لتصبح false من أجل استخدامه لاحقاً في إخفاء رسالة النجاح
                            setIsSuccessfulyStatus(false);
                            clearTimeout(successMsgTimeout);
                        }, 4000);
                    }, 2000);
                }
            }
        }
        catch (err) {
            if (err?.response?.data?.msg === "Unauthorized Error") {
                localStorage.removeItem(process.env.userTokenNameInLocalStorage);
                await router.replace("/login");
                return;
            }
            // طباعة رسالة الخطأ في الكونسول إن حصلت مشكلة عند إرسال الطلب للسيرفر
            setIsUpdatingStatus(false);
            setErrorMsg("عذراً حدث خطا ما ، يرجى إعادة المحاولة !!");
            let errorTimeout = setTimeout(() => {
                setErrorMsg("");
                clearTimeout(errorTimeout);
            }, 5000);
        }
    }

    return (
        // بداية كتابة كود ال jsx لصفحة الملف الشخصي
        <div className="profile">
            {/* بداية كتابة معلومات عنصر ال head في ال html */}
            <Head>
                <title>مستر فيكس - الملف الشخصي</title>
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
                        <h1 className='page-title mb-4'>الملف الشخصي</h1>
                        <form className="edit-profile-form" onSubmit={updateProfile}>
                            {/* بداية مكون الشبكة من البوتستراب */}
                            <div className="row">
                                {/* بداية مكون العمود */}
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        placeholder='الاسم والكنية الجديد'
                                        // في حالة يوجد خطأ بالإدخال نجعل الحواف بلون أحمر
                                        className={`form-control p-3 ${errors["firstAndLastName"] ? "border border-danger mb-2" : "mb-4"}`}
                                        onChange={(e) => setUserInfo({ ...userInfo, firstAndLastName: e.target.value.trim() })}
                                        defaultValue={userInfo.firstAndLastName}
                                    />
                                    {/* بداية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                    {errors["firstAndLastName"] && <p className='error-msg text-danger'>{errors["firstAndLastName"]}</p>}
                                    {/* نهاية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                    <input
                                        type="email"
                                        placeholder="البريد الالكتروني"
                                        className={`form-control p-3 mb-4`}
                                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value.trim().toLowerCase() })}
                                        defaultValue={userInfo.email}
                                    />
                                    <input
                                        type="number"
                                        placeholder="رقم الجوال الجديد"
                                        // في حالة يوجد خطأ بالإدخال نجعل الحواف بلون أحمر
                                        className={`form-control p-3 ${errors["mobilePhone"] ? "border border-danger mb-2" : "mb-4"}`}
                                        onChange={(e) => setUserInfo({ ...userInfo, mobilePhone: e.target.value.trim() })}
                                        defaultValue={userInfo.mobilePhone}
                                    />
                                    {/* بداية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                    {errors["mobilePhone"] && <p className='error-msg text-danger'>{errors["mobilePhone"]}</p>}
                                    {/* نهاية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                    <div className='password-field-box'>
                                        <input
                                            type={isVisiblePassword ? "text" : "password"}
                                            placeholder="كلمة السر الجديدة"
                                            // في حالة يوجد خطأ بالإدخال نجعل الحواف بلون أحمر
                                            className={`form-control p-3 ${errors["password"] ? "border border-danger mb-2" : "mb-4"}`}
                                            onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value.trim() })}
                                        />
                                        <div className='icon-box'>
                                            {!isVisiblePassword && <AiOutlineEye className='eye-icon icon' onClick={() => setIsVisiblePassword(value => value = !value)} />}
                                            {isVisiblePassword && <AiOutlineEyeInvisible className='invisible-eye-icon icon' onClick={() => setIsVisiblePassword(value => value = !value)} />}
                                        </div>
                                    </div>
                                    {/* بداية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                    {errors["password"] && <p className='error-msg text-danger'>{errors["password"]}</p>}
                                    {/* نهاية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                </div>
                                {/* نهاية مكون العمود */}
                                {/* بداية مكون العمود */}
                                <div className="col-md-6">
                                    <select
                                        // في حالة يوجد خطأ بالإدخال نجعل الحواف بلون أحمر
                                        className={`form-control p-3 ${errors["gender"] ? "border border-danger mb-2" : "mb-4"}`}
                                        onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })}
                                        value={userInfo.gender}
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
                                        placeholder="تاريخ الميلاد الجديد"
                                        // في حالة يوجد خطأ بالإدخال نجعل الحواف بلون أحمر
                                        className={`form-control p-3 ${errors["birthday"] ? "border border-danger mb-2" : "mb-4"}`}
                                        // تغيير نوع المدخل إلى تاريخ عند التركيز على المدخل
                                        onFocus={() => setInputType("date")}
                                        // تغيير نوع المدخل إلى نص عند إزالة التركيز عن المدخل
                                        onBlur={() => setInputType("text")}
                                        onChange={(e) => setUserInfo({ ...userInfo, birthday: e.target.value })}
                                        defaultValue={userInfo.birthday}
                                    />
                                    {/* بداية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                    {errors["birthday"] && <p className='error-msg text-danger'>{errors["birthday"]}</p>}
                                    {/* نهاية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                    <select
                                        // في حالة يوجد خطأ بالإدخال نجعل الحواف بلون أحمر
                                        className={`form-control p-3 ${errors["city"] ? "border border-danger mb-2" : "mb-4"}`}
                                        onChange={(e) => setUserInfo({ ...userInfo, city: e.target.value })}
                                        value={userInfo.city}
                                    >
                                        <option defaultValue="" hidden>اختر المحافظة</option>
                                        <option value="damascus">دمشق</option>
                                        <option value="rif-Damascus">ريف دمشق</option>
                                    </select>
                                    {/* بداية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                    {errors["city"] && <p className='error-msg text-danger'>{errors["city"]}</p>}
                                    {/* نهاية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                    <textarea
                                        placeholder="محافظة دمشق، الميدان، امتداد شارع المول, بناء الغاردينيا، مقابل/ قرب محل الملكي، الطابق الرابع"
                                        // في حالة يوجد خطأ بالإدخال نجعل الحواف بلون أحمر
                                        className={`form-control p-3 address ${errors["address"] ? "border border-danger mb-2" : "mb-4"}`}
                                        onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value.trim() })}
                                        defaultValue={userInfo.address}
                                    />
                                    {/* بداية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                    {errors["address"] && <p className='error-msg text-danger'>{errors["address"]}</p>}
                                    {/* نهاية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                </div>
                                {/* نهاية مكون العمود */}
                            </div>
                            {/* نهاية مكون الشبكة من البوتستراب */}
                            {/* في حالة لم يكن لدينا حالة تحديث بيانات الملف الشخصي في الانتظار ولا يوجد أي خطأ نظهر المكون التالي */}
                            {!isUpdatingStatus && !isSuccessfulyStatus && !errMsg && <button type='submit' className='btn edit-profile-btn w-50 p-3 mt-4 mx-auto d-block'>
                                <span className='ms-2'>تعديل</span>
                                <FiUserPlus />
                            </button>}
                            {/* في حالة لم يكن لدينا حالة تحديث بيانات الملف الشخصي في الانتظار ولا يوجد أي خطأ نظهر المكون التالي */}
                            {/* في حالة لم يكن لدينا حالة تحديث بيانات الملف الشخصي في الانتظار ولا يوجد أي خطأ نظهر المكون التالي */}
                            {isUpdatingStatus && <button className='btn btn-warning wait-update-profile-btn w-50 p-3 mt-4 mx-auto d-block' disabled>
                                <span className='ms-2'>جاري تعديل البيانات ...</span>
                                <AiOutlineClockCircle />
                            </button>}
                            {/* في حالة كان لدينا حالة النجاح نظهر المكون التالي */}
                            {isSuccessfulyStatus && <button className='btn btn-success success-update-profile-btn w-50 p-3 mt-4 mx-auto d-block' disabled>
                                <span className='ms-2'>تمّ التعديل بنجاح .</span>
                            </button>}
                            {/* في حالة كان لدينا حالة النجاح نظهر المكون التالي */}
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
            </>}
            {isLoadingPage && !isErrorMsgOnLoadingThePage && <LoaderPage />}
            {isErrorMsgOnLoadingThePage && <ErrorOnLoadingThePage />}
        </div>
        // نهاية كتابة كود ال jsx لصفحة الملف الشخصي
    );
}
