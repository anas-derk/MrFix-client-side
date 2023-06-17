// استيراد المكتبات المطلوبة + صورة صفحة الملف الشخصي
import Head from 'next/head';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import { FiUserPlus } from "react-icons/fi";
import { AiOutlineClockCircle, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import global_functions from '../../../public/global_functions/validations';
import Axios from 'axios';
import { useRouter } from 'next/router';

// تعريف دالة صفحة الملف الشخصي 
export default function Profile() {
    // تعريف المتغيرات المطلوب كــ state
    const [userId, setUserId] = useState("");
    const [firstAndLastName, setFirstAndLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobilePhone, setMobilePhone] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [birthday, setBirthday] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [errors, setErrors] = useState({});
    const [inputType, setInputType] = useState("text");
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
    const [isSuccessfulyStatus, setIsSuccessfulyStatus] = useState(false);
    const [errMsg, setErrorMsg] = useState("");
    const [userNotFoundError, setUserNotFoundError] = useState("");
    const [defaultMobilePhone, setDefaultMobilePhone] = useState("");
    const [defaultEmail, setDefaultEmail] = useState("");
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    // تعريف راوتر لاستخدامه في التعامل مع روابط الصفحات
    const router = useRouter();
    // تعريف دالة useEffect من أجل عمل شيء ما عند تحميل الصفحة في جانب العميل أي المتصفح
    useEffect(() => {
        // جلب بعض العناصر من صفحة الويب باستخدام الجافا سكربت
        const header = document.querySelector("#__next .page-header"),
            pageContent = document.querySelector(".profile .page-content");
        // جعل أقل ارتفاع لعنصر pageContent هو عرض الصفحة المرأية كاملةً منقوصاً منها ارتفاع عنصر رأس الصفحة
        pageContent.style.minHeight = `calc(100vh - ${header.clientHeight}px)`;
        // تخزينه في متغير معرف المستخدم كــ state
        const id = localStorage.getItem("mr-fix-user-id");
        setUserId(id);
        // التحقق من أنّ الرقم غير موجود
        if (!id) {
            // في حالة الرقم غير موجود نعيد التوجيه إلى صفحة تسجيل الدخول
            router.push("/login");
        } else {
            // في حالة الرقم موجود نتأكد من أنّ هذا الرقم موجود فعلاً في قاعدة البيانات عن طريق جلب بيانات المستخدم ذو المعرّف السابق
            async function fetchData(userId) {
                try {
                    let res = await Axios.get(`${process.env.BASE_API_URL}/users/user-info/${userId}`);
                    let result = await res.data;
                    if (result === "عذراً ، المستخدم غير موجود") {
                        setUserNotFoundError(result);
                    }
                    else {
                        setFirstAndLastName(result.firstAndLastName);
                        setEmail(result.email);
                        setMobilePhone(result.mobilePhone);
                        setGender(result.gender);
                        setBirthday(result.birthday);
                        setCity(result.city);
                        setAddress(result.address);
                        setDefaultMobilePhone(result.mobilePhone);
                        setDefaultEmail(result.email);
                    }
                }
                catch (err) {
                    setUserNotFoundError("عذراً حدث خطأ ، الرجاء إعادة المحاولة");
                }
            }
            fetchData(id);
        }
    }, []);
    // تعريف دالة إرسال طلب للباك ايند لتحديث بيانات  المستخدم
    const updateProfile = async (e) => {
        // منع إرسال المعلومات لنفس الصفحة
        e.preventDefault();
        // إعادة تعيين كائن الأخطاء الخاصة بالمدخلات إلى كائن فارغ لتصفير كل الأخطاء وإعادة التحقق من كل الأخطاء للمدخلات الجديدة
        setErrors({});
        // إرسال المدخلات إلى دالة inputValuesValidation للتحقق منها قبل إرسال الطلب إلى الباك ايند وتخزينها في المتغير errorsObject
        const errorsObject = global_functions.inputValuesValidation(
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
                        isValidPassword: {
                            value: password,
                            msg: "عذراً ، يجب أن تكون كلمة السر تحتوي على الأقل 8 حروف أو أرقام أو كلاهما.",
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
        if (Object.keys(errorsObject).length == 0) {
            // تعديل قيمة ال state المسماة isUpdatingStatus لتصبح true من أجل استخدامه لاحقاً في إظهار رسالة انتظار
            setIsUpdatingStatus(true);
            // تعريف كائن بيانات المستخدم الذي سنستخدمه في إرسال البيانات المطلوب فقط مع الطلب إلى الباك ايند
            let newUserData = {};
            newUserData = {
                firstAndLastName: firstAndLastName,
                email: email,
                mobilePhone: mobilePhone,
                password: password,
                gender,
                birthday,
                city,
                address: address,
            }
            // في حالة الإيميل هو نفسه الإيميل الافتراضي أي لم يتم تعديل الإيميل عندها نضع قيمة المتغير isSameOfEmail هي نعم وإلا نضع لا
            const isSameOfEmail = email === defaultEmail ? "yes" : "no";
            // في حالة رقم الموبايل هو نفسه رقم الموبايل الافتراضي أي لم يتم تعديل الإيميل عندها نضع قيمة المتغير isSameOfEmail هي نعم وإلا نضع لا
            const isSameOfMobilePhone = mobilePhone === defaultMobilePhone ? "yes" : "no";
            // بداية محاولة إرسال الطلب
            try {
                // جلب البيانات الناتجة عن الاستجابة
                const res = await Axios.put(`${process.env.BASE_API_URL}/users/update-user-info/${userId}?isSameOfEmail=${isSameOfEmail}&isSameOfMobilePhone=${isSameOfMobilePhone}`, newUserData);
                // جلب البيانات الناتجة عن الاستجابة
                const result = await res.data;
                // التحقق من البيانات  المُرسلة كاستجابة
                if (result === "عذراً لا يمكن تعديل بيانات الملف الشخصي لأن البريد الإلكتروني أو رقم الموبايل موجود مسبقاً !!") {
                    // تعيين مؤقت ليتم تنفيذ تعليمات بعد ثانيتين
                    setTimeout(() => {
                        // تعديل قيمة ال state المسماة isUpdatingStatus لتصبح false من أجل استخدامه لاحقاً في إخفاء رسالة الانتظار
                        setIsUpdatingStatus(false);
                        // إعادة قيمة ال state المسماة errMsg إلى القيمة الناتجة عن الاستجابة من أجل استخدامها لاحقاً في إظهار رسالة الخطأ
                        setErrorMsg(result);
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
            } catch (err) {
                // طباعة رسالة الخطأ في الكونسول إن حصلت مشكلة عند إرسال الطلب للسيرفر
                console.log(err);
            }
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
            {/* بداية عرض مكون الرأس الذي أنشأناه */}
            <Header />
            {/* نهاية عرض مكون الرأس الذي أنشأناه */}
            {/* بداية كتابة كود ال jsx لعنصر ال html المسمى page-content */}
            <section className="page-content pt-4 pb-4">
                {/* بداية مكون الحاوية من البوتستراب */}
                <div className="container">
                    <h1 className='page-title mb-4'>الملف الشخصي</h1>
                    {/* في حالة لا يوجد خطأ أنّ المستخدم غير موجود ، نعرض المكون التالي وإلا نعرض رسالة خطأ */}
                    {!userNotFoundError ? <form className="edit-profile-form" onSubmit={updateProfile}>
                        {/* بداية مكون الشبكة من البوتستراب */}
                        <div className="row">
                            {/* بداية مكون العمود */}
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    placeholder='الاسم والكنية الجديد'
                                    // في حالة يوجد خطأ بالإدخال نجعل الحواف بلون أحمر
                                    className={`form-control p-3 ${errors["firstAndLastName"] ? "border border-danger mb-2" : "mb-4"}`}
                                    onChange={(e) => setFirstAndLastName(e.target.value.trim())}
                                    defaultValue={firstAndLastName}
                                />
                                {/* بداية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                {errors["firstAndLastName"] && <p className='error-msg text-danger'>{errors["firstAndLastName"]}</p>}
                                {/* نهاية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                <input
                                    type="email"
                                    placeholder="البريد الالكتروني"
                                    className={`form-control p-3 mb-4`}
                                    onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
                                    defaultValue={email}
                                />
                                <input
                                    type="number"
                                    placeholder="رقم الجوال الجديد"
                                    // في حالة يوجد خطأ بالإدخال نجعل الحواف بلون أحمر
                                    className={`form-control p-3 ${errors["mobilePhone"] ? "border border-danger mb-2" : "mb-4"}`}
                                    onChange={(e) => setMobilePhone(e.target.value.trim())}
                                    defaultValue={mobilePhone}
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
                            </div>
                            {/* نهاية مكون العمود */}
                            {/* بداية مكون العمود */}
                            <div className="col-md-6">
                                <select
                                    // في حالة يوجد خطأ بالإدخال نجعل الحواف بلون أحمر
                                    className={`form-control p-3 ${errors["gender"] ? "border border-danger mb-2" : "mb-4"}`}
                                    onChange={(e) => setGender(e.target.value)}
                                    value={gender}
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
                                    onChange={(e) => setBirthday(e.target.value)}
                                    defaultValue={birthday}
                                />
                                {/* بداية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                {errors["birthday"] && <p className='error-msg text-danger'>{errors["birthday"]}</p>}
                                {/* نهاية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                <select
                                    // في حالة يوجد خطأ بالإدخال نجعل الحواف بلون أحمر
                                    className={`form-control p-3 ${errors["city"] ? "border border-danger mb-2" : "mb-4"}`}
                                    onChange={(e) => setCity(e.target.value)}
                                    value={city}
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
                                    onChange={(e) => setAddress(e.target.value.trim())}
                                    defaultValue={address}
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
                    </form> : <p className='alert alert-danger'>{userNotFoundError}</p>}
                    {/* في حالة لا يوجد خطأ أنّ المستخدم غير موجود ، نعرض المكون التالي وإلا نعرض رسالة خطأ */}
                </div>
                {/* نهاية مكون الحاوية من البوتستراب */}
            </section>
            {/* نهاية كتابة كود ال jsx لعنصر ال html المسمى page-content */}
        </div>
        // نهاية كتابة كود ال jsx لصفحة الملف الشخصي
    );
}
