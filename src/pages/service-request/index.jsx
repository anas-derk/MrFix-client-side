// استيراد المكتبات المطلوبة + صورة صفحة طلب الخدمة
import Head from 'next/head';
import Header from '@/components/Header';
import { Fragment, useEffect, useState } from 'react';
import { FiUserPlus } from "react-icons/fi";
import { RiFileUploadLine } from "react-icons/ri";
import ourServicesData from "../../../public/data/index";
import axios from "axios";
import { useRouter } from 'next/router';
import { inputValuesValidation } from "../../../public/global_functions/validations";
import { AiOutlineClockCircle } from "react-icons/ai";
import LoaderPage from '@/components/LoaderPage';
import ErrorOnLoadingThePage from '@/components/ErrorOnLoadingThePage';
import { getUserInfo } from '../../../public/global_functions/popular';

// تعريف دالة صفحة طلب خدمة 
export default function ServiceRequest() {
    // تعريف المتغيرات المطلوب كــ state
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);
    const [requestType, setRequestType] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [explainAndNewAddress, setExplainAndNewAddress] = useState("");
    const [fileList1, setFileList1] = useState("");
    const [fileList2, setFileList2] = useState("");
    const [preferredDateOfVisit, setPreferredDateOfVisit] = useState("");
    const [preferredTimeOfVisit, setPreferredTimeOfVisit] = useState("");
    const [electricityTimes, setElectricityTimes] = useState("");
    const [isAlternativeEnergyExist, setIsAlternativeEnergyExist] = useState("");
    const [errors, setErrors] = useState({});
    const [isRequestingStatus, setIsRequestingStatus] = useState(false);
    const [isSuccessfulyStatus, setIsSuccessfulyStatus] = useState(false);
    const [errMsg, setErrorMsg] = useState("");
    // تعريف كائن يحتوي وصف الملفات بحيث نعرض تفاصيل عنها بحسب نوع الخدمة التي يحددها المستخدم لاحقاً
    const filesCaption = {
        "الكهربائيات والالكترونيات": ["صور عن الأداة المعطلة", "صور عن مكان العطل"],
        "الصحية ( السباكة )": ["صور عن الأداة المعطلة", "صور عن مكان العطل"],
        "الطاقة البديلة": ["صور عن الأداة المعطلة", "صور عن مكان العطل"],
        "الخشبيات والمفروشات": ["صور عن الأداة المعطلة", "صور عن مكان العطل"],
        "الألمنيوم": ["صور عن الأداة المعطلة", "صور عن مكان العطل"],
        "دهان وعزل": ["صور عن المكان المُراد دهانه أو عزله"],
        "نقل الأثاث": ["صور الأثاث المطلوب نقله"],
        "التنظيف": ["صور عن المكان المراد تنظيفه"],
        "صيانة المنازل المؤجرة قبل الانتقال إليها": ["صور عن المنزل المُراد استئجاره", "صور عن مكان الأعطال الظاهرة"],
        "اقتراحات تغيير ديكور واستغلال المساحات": ["صور عن المكان المُراد تغيير ديكوره"],
        "استفسار عن تكلفة الإصلاح": ["صور عن الأداة المعطلة", "صور عن مكان العطل"],
    }
    // تعريف راوتر لاستخدامه في التعامل مع روابط الصفحات
    const router = useRouter();
    // تعريف دالة useEffect من أجل عمل شيء ما عند تحميل الصفحة في جانب العميل أي المتصفح
    useEffect(() => {
        if (!isLoadingPage && !isErrorMsgOnLoadingThePage) {
            // جلب بعض العناصر من صفحة الويب باستخدام الجافا سكربت
            const header = document.querySelector("#__next .page-header"),
                pageContent = document.querySelector(".service-request .page-content");
            // جعل أقل ارتفاع لعنصر pageContent هو عرض الصفحة المرأية كاملةً منقوصاً منها ارتفاع عنصر رأس الصفحة
            pageContent.style.minHeight = `calc(100vh - ${header.clientHeight}px)`;
        }
    }, [isLoadingPage]);
    useEffect(() => {
        const userToken = localStorage.getItem(process.env.userTokenNameInLocalStorage);
        if (userToken) {
            getUserInfo()
                .then(async (result) => {
                    console.log(result);
                    if (!result.error) {
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
    // تعريف دالة إرسال طلب لطلب خدمة للباك ايند
    const serviceRequest = async (e) => {
        try {
            // منع إرسال المعلومات لنفس الصفحة
            e.preventDefault();
            // إعادة تعيين كائن الأخطاء الخاصة بالمدخلات إلى كائن فارغ لتصفير كل الأخطاء وإعادة التحقق من كل الأخطاء للمدخلات الجديدة
            setErrors({});
            // إرسال المدخلات إلى دالة inputValuesValidation للتحقق منها قبل إرسال الطلب إلى الباك ايند وتخزينها في المتغير errorsObject
            const errorsObject = inputValuesValidation(
                [
                    {
                        name: "requestType",
                        value: requestType,
                        rules: {
                            isRequired: {
                                msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                            },
                        },
                    },
                    {
                        name: "serviceType",
                        value: serviceType,
                        rules: {
                            isRequired: {
                                msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                            },
                        },
                    },
                    {
                        name: "explainAndNewAddress",
                        value: explainAndNewAddress,
                        rules: {
                            isRequired: {
                                msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                            },
                        },
                    },
                    {
                        name: "fileList1",
                        value: fileList1,
                        rules: {
                            isRequired: {
                                msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                            },
                            isImages: {
                                msg: "عذراً ، يجب أن يكون الملف أو الملفات صور من امتداد png أو jpg !!"
                            },
                        },
                    },
                    serviceType !== "دهان وعزل"
                        && serviceType !== "نقل الأثاث"
                        && serviceType !== "التنظيف"
                        && serviceType !== "صيانة المنازل المؤجرة قبل الانتقال إليها"
                        && serviceType !== "اقتراحات تغيير ديكور واستغلال المساحات"
                        ? {
                            name: "fileList2",
                            value: fileList2,
                            rules: {
                                isRequired: {
                                    msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                                },
                                isImages: {
                                    msg: "عذراً ، يجب أن يكون الملف أو الملفات صور من امتداد png أو jpg !!"
                                },
                            },
                        } : {
                            name: "fileList2",
                            value: fileList2,
                            rules: {
                                isRequired: undefined,
                            },
                        },
                    {
                        name: "preferredDateOfVisit",
                        value: preferredDateOfVisit,
                        rules: {
                            isRequired: {
                                msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                            },
                        },
                    },
                    {
                        name: "preferredTimeOfVisit",
                        value: preferredTimeOfVisit,
                        rules: {
                            isRequired: {
                                msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                            },
                        },
                    },
                    {
                        name: "electricityTimes",
                        value: electricityTimes,
                        rules: {
                            isRequired: {
                                msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                            },
                        },
                    },
                    {
                        name: "isAlternativeEnergyExist",
                        value: isAlternativeEnergyExist,
                        rules: {
                            isRequired: {
                                msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                            },
                        },
                    },
                    {
                        name: "isAlternativeEnergyExist",
                        value: isAlternativeEnergyExist,
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
            // أو التحقق من كون نوع الطلب إسعافي + عدد الأخطاء هو 2 ( للدلالة على أنّ الأخطاء هي عدم وجود بيانات لتاريخ يوم الزيارة المفضل والوقت المفضل للزياة )
            if (Object.keys(errorsObject).length == 0 ||
                (requestType === "طلب إسعافي"
                    && Object.keys(errorsObject).length == 2
                    && errorsObject["preferredDateOfVisit"] === "عذراً ، لا يجب أن يكون الحقل فارغاً !!"
                    && errorsObject["preferredTimeOfVisit"] === "عذراً ، لا يجب أن يكون الحقل فارغاً !!"
                )
            ) {
                // تعديل قيمة ال state المسماة isRequestingStatus لتصبح true من أجل استخدامه لاحقاً في إظهار رسالة انتظار
                setIsRequestingStatus(true);
                // إنشاء كائن من ال formData لتخزين بيانات الفورم قبل إرساله مع الطلب في جسم الطلب وذلك بسبب وجود ملفات
                let formData = new FormData();
                formData.append("requestType", requestType);
                formData.append("serviceType", serviceType);
                formData.append("explainAndNewAddress", explainAndNewAddress);
                // إضافة كل الملفات إلى ال formData
                for (let i = 0; i < fileList1.length; i++) {
                    formData.append(`file${i}`, fileList1[i]);
                }
                for (let i = 0; i < fileList2.length; i++) {
                    formData.append(`file${i}`, fileList2[i]);
                }
                // التحقق من نوع الطلب بحيث نضيف بيانات حقلي تاريخ اليوم المفضل للزيارة ووقت الزيارة المفضل في حالة نوع الطلب عادي فقط ( كون الطلب الإسعافي ليس بحاجتهم )
                if (requestType === "طلب عادي") {
                    formData.append("preferredDateOfVisit", preferredDateOfVisit);
                    formData.append("preferredTimeOfVisit", preferredTimeOfVisit);
                }
                // إضافة باقي بيانات الحقول إلى الـ formDat
                formData.append("electricityTimes", electricityTimes);
                formData.append("isAlternativeEnergyExist", isAlternativeEnergyExist);
                // إرسال الطلب وتخزين الاستجابة في متغير
                const res = await axios.post(`${process.env.BASE_API_URL}/requests/create-new-request`, formData, {
                    // إضافة header لتحدد نوع المحتوى ا لمراد إرساله بحيث يسمح بإرسال البيانات ضمن ال formData
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": localStorage.getItem(process.env.userTokenNameInLocalStorage)
                    }
                });
                // جلب البيانات الناتجة عن الاستجابة
                const result = res.data;
                // التحقق من البيانات  المُرسلة كاستجابة
                if (!result.error) {
                    // تعديل قيمة ال state المسماة isRequestingStatus لتصبح false من أجل استخدامه لاحقاً في إخفاء رسالة الانتظار
                    setIsRequestingStatus(false);
                    // تعديل قيمة ال state المسماة isSuccessfulyStatus من أجل استخدامه لاحقاً في إظهار رسالة نجاح العملية
                    setIsSuccessfulyStatus(true);
                    // تعيين مؤقت ليتم تنفيذ تعليمات بعد ثانيتين
                    setTimeout(() => {
                        // تعديل قيمة ال state المسماة isSuccessfulyStatus لتصبح false من أجل استخدامه لاحقاً في إخفاء رسالة النجاح
                        setIsSuccessfulyStatus(false);
                        // تعيين مؤقت ليتم تنفيذ تعليمات بعد ثانية ونصف
                        setTimeout(() => {
                            // إعادة تحميل الصفحة من أجل حذف بيانات الحقول لإتاحة الإمكانية للمستخدم من إرسال طلب جديد إن أراد
                            setRequestType("");
                            setServiceType("");
                            setExplainAndNewAddress("");
                            setFileList1("");
                            setFileList2("");
                            setPreferredDateOfVisit("");
                            setPreferredTimeOfVisit("");
                            setElectricityTimes("");
                            setIsAlternativeEnergyExist("");
                        }, 1500);
                    }, 2000);
                } else {
                    // تعديل قيمة ال state المسماة isRequestingStatus لتصبح false من أجل استخدامه لاحقاً في إخفاء رسالة الانتظار
                    setIsRequestingStatus(false);
                    // إعادة قيمة ال state المسماة errMsg إلى القيمة الفارغة الافتراضية من أجل استخدامها لاحقاً في إخفاء رسالة الخطأ
                    setErrorMsg(result);
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
        catch (err) {
            if (err?.response?.data?.msg === "Unauthorized Error") {
                localStorage.removeItem(process.env.userTokenNameInLocalStorage);
                await router.replace("/login");
                return;
            }
            // طباعة رسالة الخطأ في الكونسول إن حصلت مشكلة عند إرسال الطلب للسيرفر
            setIsRequestingStatus(false);
            setErrorMsg("عذراً حدث خطا ما ، يرجى إعادة المحاولة !!");
            let errorTimeout = setTimeout(() => {
                setErrorMsg("");
                clearTimeout(errorTimeout);
            }, 5000);
        }
    }
    return (
        // بداية كتابة كود ال jsx لصفحة طلب الخدمة
        <div className="service-request">
            {/* بداية كتابة معلومات عنصر ال head في ال html */}
            <Head>
                <title>مستر فيكس - طلب خدمة</title>
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
                        <h1 className='page-title mb-4 text-center'>طلب خدمة</h1>
                        <form className="service-request-form" onSubmit={serviceRequest}>
                            <select
                                // في حالة يوجد خطأ بالإدخال نجعل الحواف بلون أحمر
                                className={`form-control p-3 request-type-select ${errors["requestType"] ? "border border-danger mb-2" : "mb-4"}`}
                                onChange={(e) => setRequestType(e.target.value)}
                                value={requestType}
                            >
                                <option value="" hidden>نوع الطلب</option>
                                <option value="طلب عادي">طلب عادي</option>
                                <option value="طلب إسعافي">طلب إسعافي</option>
                            </select>
                            {/* بداية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                            {errors["requestType"] && <p className='error-msg text-danger'>{errors["requestType"]}</p>}
                            {/* نهاية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                            <select
                                // في حالة يوجد خطأ بالإدخال نجعل الحواف بلون أحمر
                                className={`form-control p-3 service-type-select ${errors["serviceType"] ? "border border-danger mb-2" : "mb-4"}`}
                                onChange={(e) => setServiceType(e.target.value)}
                                value={serviceType}
                            >
                                <option value="" hidden>نوع الخدمة</option>
                                {/* عمل حلقة تكرارية على بيانات الخدمات بحيث نعرض كل أسماء الخدمات داخل option */}
                                {ourServicesData.servicesData.map((service, index) => (
                                    <option value={service.optionValue} key={index}>{service.name}</option>
                                ))}
                            </select>
                            {/* بداية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                            {errors["serviceType"] && <p className='error-msg text-danger'>{errors["serviceType"]}</p>}
                            {/* نهاية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                            {/* بداية مكون الشبكة من البوتستراب */}
                            <div className="row">
                                {/* بداية مكون العمود */}
                                <div className="col-md-6">
                                    <textarea
                                        placeholder="شرح مبسط عن المشكلة التي تواجهها أو شرح مبسط عن الطلب المرغوب بالتحديد، وكذلك يمكن إضافة العنوان بالتفصيل في حالة إختلافه عن العنوان المسجل"
                                        // في حالة يوجد خطأ بالإدخال نجعل الحواف بلون أحمر
                                        className={`form-control p-3 explain-and-new-address ${errors["explainAndNewAddress"] ? "border border-danger mb-2" : "mb-4"}`}
                                        onChange={(e) => setExplainAndNewAddress(e.target.value)}
                                        value={explainAndNewAddress}
                                    ></textarea>
                                    {/* بداية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                    {errors["explainAndNewAddress"] && <p className='error-msg text-danger'>{errors["explainAndNewAddress"]}</p>}
                                    {/* نهاية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                    {/* عرض حقل رفع الملفات فقط عندما يختار المستخدم نوع الخدمة وبناءً على نوع الخدمة يظهر له وصف الملفات المراد رفعها وعدد الحقول */}
                                    {serviceType !== "" && filesCaption[serviceType].map((el, index) => (
                                        <Fragment key={index}>
                                            {/* في حالة يوجد خطأ بالإدخال نجعل الحواف بلون أحمر */}
                                            <div className={`file-box form-control p-3 ${errors[`fileList${index + 1}`] ? "border border-danger mb-2" : "mb-4"}`}>
                                                <label htmlFor={`file${index + 1}`} className='file-label d-flex justify-content-between'>
                                                    <p className='caption'>{el}</p>
                                                    <RiFileUploadLine className="upload-file-icon" />
                                                </label>
                                                <input
                                                    type="file"
                                                    id={`file${index + 1}`}
                                                    onChange={(e) => index == 0 ? setFileList1(e.target.files) : setFileList2(e.target.files)}
                                                    multiple
                                                    value={`fileList${index + 1}`}
                                                />
                                            </div>
                                            {/* بداية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                            {errors[`fileList${index + 1}`] && <p className='error-msg text-danger'>{errors[`fileList${index + 1}`]}</p>}
                                            {/* نهاية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                        </Fragment>
                                    ))}
                                </div>
                                {/* نهاية مكون العمود */}
                                {/* بداية مكون العمود */}
                                <div className="col-md-6">
                                    {/* في حالة الطلب غير إسعافي عرض الحقول التالية */}
                                    {requestType !== "طلب إسعافي" && <>
                                        <input
                                            type="text"
                                            placeholder="تواريخ الأيام المفضلة لزيارة الورشة"
                                            // في حالة يوجد خطأ بالإدخال نجعل الحواف بلون أحمر
                                            className={`form-control p-3 ${errors["preferredDateOfVisit"] ? "border border-danger mb-2" : "mb-4"}`}
                                            onChange={(e) => setPreferredDateOfVisit(e.target.value)}
                                            value={preferredDateOfVisit}
                                        />
                                        {/* بداية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                        {errors["preferredDateOfVisit"] && <p className='error-msg text-danger'>{errors["preferredDateOfVisit"]}</p>}
                                        {/* نهاية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                        <input
                                            type="text"
                                            placeholder="الوقت المفضل لزيارة الورشة"
                                            // في حالة يوجد خطأ بالإدخال نجعل الحواف بلون أحمر
                                            className={`form-control p-3 ${errors["preferredTimeOfVisit"] ? "border border-danger mb-2" : "mb-4"}`}
                                            onChange={(e) => setPreferredTimeOfVisit(e.target.value)}
                                            value={preferredTimeOfVisit}
                                        />
                                        {/* بداية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                        {errors["preferredTimeOfVisit"] && <p className='error-msg text-danger'>{errors["preferredTimeOfVisit"]}</p>}
                                        {/* نهاية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                    </>}
                                    <input
                                        type="text"
                                        placeholder="أوقات الكهرباء النظامية"
                                        // في حالة يوجد خطأ بالإدخال نجعل الحواف بلون أحمر
                                        className={`form-control p-3 ${errors["electricityTimes"] ? "border border-danger mb-2" : "mb-4"}`}
                                        onChange={(e) => setElectricityTimes(e.target.value)}
                                        value={electricityTimes}
                                    />
                                    {/* بداية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                    {errors["electricityTimes"] && <p className='error-msg text-danger'>{errors["electricityTimes"]}</p>}
                                    {/* نهاية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                    <select
                                        // في حالة يوجد خطأ بالإدخال نجعل الحواف بلون أحمر
                                        className={`form-control p-3 ${errors["isAlternativeEnergyExist"] ? "border border-danger mb-2" : "mb-4"}`}
                                        onChange={(e) => setIsAlternativeEnergyExist(e.target.value)}
                                        value={isAlternativeEnergyExist}
                                    >
                                        <option value="" hidden>هل يوجد طاقة بديلة ؟</option>
                                        <option value="yes">نعم</option>
                                        <option value="no">لا</option>
                                    </select>
                                    {/* بداية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                    {errors["isAlternativeEnergyExist"] && <p className='error-msg text-danger'>{errors["isAlternativeEnergyExist"]}</p>}
                                    {/* نهاية رسالة الخطأ بالإدخال للمُدخل المحدد */}
                                </div>
                                {/* نهاية مكون العمود */}
                            </div>
                            {/* نهاية مكون الشبكة من البوتستراب */}
                            {/* في حالة لم يكن لدينا حالة إنشاء طلب في الانتظار ولا يوجد أي خطأ أو حالة نجاح نظهر المكون التالي */}
                            {!isRequestingStatus && !errMsg && !isSuccessfulyStatus && <button type='submit' className='btn service-request-btn w-50 p-3 mx-auto d-block'>
                                <span className='ms-2'>إرسال</span>
                                <FiUserPlus />
                            </button>}
                            {/* في حالة لم يكن لدينا حالة إنشاء طلب في الانتظار ولا يوجد أي خطأ أو حالة نجاح نظهر المكون التالي */}
                            {/* في حالة كان لدينا حالة إنشاء الطلب في الانتظار نظهر المكون التالي */}
                            {isRequestingStatus && <button className='btn wait-requesting-btn w-50 p-3 mt-4 mx-auto d-block' disabled>
                                <span className='ms-2'>جاري الطلب ...</span>
                                <AiOutlineClockCircle />
                            </button>}
                            {/* في حالة كان لدينا حالة إنشاء الطلب في الانتظار نظهر المكون التالي */}
                            {/* في حالة كان لدينا حالة النجاح نظهر المكون التالي */}
                            {isSuccessfulyStatus && <button className='btn btn-success requesting-successfuly-btn w-50 p-3 mt-4 mx-auto d-block' disabled>
                                <span className='ms-2'>تمّ طلب الخدمة بنجاح</span>
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
        // نهاية كتابة كود ال jsx لصفحة طلب الخدمة
    );
}