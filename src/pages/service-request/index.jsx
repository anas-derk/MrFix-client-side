import Head from 'next/head';
import Header from '@/components/Header';
import { Fragment, useEffect, useState } from 'react';
import { FiUserPlus } from "react-icons/fi";
import { RiFileUploadLine } from "react-icons/ri";
import ourServicesData from "../../../public/data/index";
import Axios from "axios";
import { useRouter } from 'next/router';
import global_functions from "../../../public/global_functions/validations";
import { AiOutlineClockCircle } from "react-icons/ai";

export default function ServiceRequest() {
    const [requestType, setRequestType] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [explainAndNewAddress, setExplainAndNewAddress] = useState("");
    const [fileList1, setFileList1] = useState("");
    const [fileList2, setFileList2] = useState("");
    const [preferredDateOfVisit, setPreferredDateOfVisit] = useState("");
    const [preferredTimeOfVisit, setPreferredTimeOfVisit] = useState("");
    const [electricityTimes, setElectricityTimes] = useState("");
    const [isAlternativeEnergyExist, setIsAlternativeEnergyExist] = useState("");
    const [userId, setUserId] = useState("");
    const [userData, setUserData] = useState("");
    const [errorInFetchUserDataMsg, setErrorInFetchUserDataMsg] = useState("");
    const [errors, setErrors] = useState({});
    const [isRequestingStatus, setIsRequestingStatus] = useState(false);
    const [isSuccessfulyStatus, setIsSuccessfulyStatus] = useState(false);
    const [errMsg, setErrorMsg] = useState("");
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
    const router = useRouter();
    useEffect(() => {
        let header = document.querySelector("#__next .page-header"),
            pageContent = document.querySelector(".service-request .page-content");
        pageContent.style.minHeight = `calc(100vh - ${header.clientHeight}px)`;
        let id = localStorage.getItem("mr-fix-user-id");
        setUserId(id);
        if (!id) {
            router.push("/login");
        } else {
            async function fetchData(userId) {
                try {
                    let res = await Axios.get(`${process.env.BASE_API_URL}/users/user-info/${userId}`);
                    let result = await res.data;
                    if (result === "عذراً ، المستخدم غير موجود") {
                        localStorage.clear();
                        router.push("/login");
                    } else {
                        setUserData(result);
                    }
                }
                catch (err) {
                    setErrorInFetchUserDataMsg("عذراً حدث خطأ ، الرجاء إعادة المحاولة");
                }
            }
            fetchData(id);
        }
    }, []);

    const serviceRequest = async (e) => {
        e.preventDefault();
        setErrors({});
        let errorsObject = global_functions.inputValuesValidation(
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
                }: {
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
        console.log(errorsObject)
        setErrors(errorsObject);
        if (Object.keys(errorsObject).length == 0 ||
            (requestType === "طلب إسعافي"
                && Object.keys(errorsObject).length == 2
                && errorsObject["preferredDateOfVisit"] === "عذراً ، لا يجب أن يكون الحقل فارغاً !!"
                && errorsObject["preferredTimeOfVisit"] === "عذراً ، لا يجب أن يكون الحقل فارغاً !!"
            )
        ) {
            setIsRequestingStatus(true);
            let formData = new FormData();
            formData.append("requestType", requestType);
            formData.append("serviceType", serviceType);
            formData.append("explainAndNewAddress", explainAndNewAddress);
            for (let i = 0; i < fileList1.length; i++) {
                formData.append(`file${i}`, fileList1[i]);
            }
            for (let i = 0; i < fileList2.length; i++) {
                formData.append(`file${i}`, fileList2[i]);
            }
            if (requestType === "طلب عادي") {
                formData.append("preferredDateOfVisit", preferredDateOfVisit);
                formData.append("preferredTimeOfVisit", preferredTimeOfVisit);
            }
            formData.append("electricityTimes", electricityTimes);
            formData.append("isAlternativeEnergyExist", isAlternativeEnergyExist);
            formData.append("userId", userId);
            try {
                let res = await Axios.post(`${process.env.BASE_API_URL}/requests/create-new-request`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                let result = await res.data;
                if (result === "تمّ طلب الخدمة بنجاح ، سوف يتم التواصل معك قريباً جداً") {
                    let requestingStatusTimeout = setTimeout(() => {
                        setIsRequestingStatus(false);
                        setIsSuccessfulyStatus(true);
                        setTimeout(() => {
                            setIsSuccessfulyStatus(false);
                            setTimeout(() => {
                                router.reload();
                            }, 1500);
                        }, 2000);
                    }, 2000);
                } else {
                    setIsRequestingStatus(false);
                    setErrorMsg(result);
                    let errMsgTimeout = setTimeout(() => {
                        setErrorMsg("");
                        clearTimeout(errMsgTimeout);
                    }, 4000);
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
    return (
        // Start Service Request Page
        <div className="service-request">
            <Head>
                <title>مستر فيكس - طلب خدمة</title>
            </Head>
            <Header />
            {/* Start Page Content Section */}
            <section className="page-content pt-4 pb-4">
                {/* Start Container From Bootstrap */}
                <div className="container">
                    {!errorInFetchUserDataMsg ? <>
                        <h1 className='page-title mb-4 text-center'>طلب خدمة</h1>
                        <form className="service-request-form" onSubmit={serviceRequest}>
                            <select
                                className={`form-control p-3 request-type-select ${errors["requestType"] ? "border border-danger mb-2" : "mb-4"}`}
                                onChange={(e) => setRequestType(e.target.value)}
                            >
                                <option value="" hidden>نوع الطلب</option>
                                <option value="طلب عادي">طلب عادي</option>
                                <option value="طلب إسعافي">طلب إسعافي</option>
                            </select>
                            {errors["requestType"] && <p className='error-msg text-danger'>{errors["requestType"]}</p>}
                            <select
                                className={`form-control p-3 service-type-select ${errors["serviceType"] ? "border border-danger mb-2" : "mb-4"}`}
                                onChange={(e) => setServiceType(e.target.value)}
                            >
                                <option value="" hidden>نوع الخدمة</option>
                                {ourServicesData.servicesData.map((service, index) => (
                                    <option value={service.optionValue} key={index}>{service.name}</option>
                                ))}
                            </select>
                            {errors["serviceType"] && <p className='error-msg text-danger'>{errors["serviceType"]}</p>}
                            {/* Start Grid System From Bootstrap */}
                            <div className="row">
                                {/* Start Column */}
                                <div className="col-md-6">
                                    <textarea
                                        placeholder="شرح مبسط عن المشكلة التي تواجهها أو شرح مبسط عن الطلب المرغوب بالتحديد، وكذلك يمكن إضافة العنوان بالتفصيل في حالة إختلافه عن العنوان المسجل"
                                        className={`form-control p-3 explain-and-new-address ${errors["explainAndNewAddress"] ? "border border-danger mb-2" : "mb-4"}`}
                                        onChange={(e) => setExplainAndNewAddress(e.target.value)}
                                    ></textarea>
                                    {errors["explainAndNewAddress"] && <p className='error-msg text-danger'>{errors["explainAndNewAddress"]}</p>}
                                    {serviceType !== "" && filesCaption[serviceType].map((el, index) => (
                                        <Fragment key={index}>
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
                                                />
                                            </div>
                                            {errors[`fileList${index + 1}`] && <p className='error-msg text-danger'>{errors[`fileList${index + 1}`]}</p>}
                                        </Fragment>
                                    ))}
                                </div>
                                {/* End Column */}
                                {/* Start Column */}
                                <div className="col-md-6">
                                    {requestType !== "طلب إسعافي" && <>
                                        <input
                                            type="text"
                                            placeholder="تواريخ الأيام المفضلة لزيارة الورشة"
                                            className={`form-control p-3 ${errors["preferredDateOfVisit"] ? "border border-danger mb-2" : "mb-4"}`}
                                            onChange={(e) => setPreferredDateOfVisit(e.target.value)}
                                        />
                                        {errors["preferredDateOfVisit"] && <p className='error-msg text-danger'>{errors["preferredDateOfVisit"]}</p>}
                                        <input
                                            type="text"
                                            placeholder="الوقت المفضل لزيارة الورشة"
                                            className={`form-control p-3 ${errors["preferredTimeOfVisit"] ? "border border-danger mb-2" : "mb-4"}`}
                                            onChange={(e) => setPreferredTimeOfVisit(e.target.value)}
                                        />
                                        {errors["preferredTimeOfVisit"] && <p className='error-msg text-danger'>{errors["preferredTimeOfVisit"]}</p>}
                                    </>}
                                    <input
                                        type="text"
                                        placeholder="أوقات الكهرباء النظامية"
                                        className={`form-control p-3 ${errors["electricityTimes"] ? "border border-danger mb-2" : "mb-4"}`}
                                        onChange={(e) => setElectricityTimes(e.target.value)}
                                    />
                                    {errors["electricityTimes"] && <p className='error-msg text-danger'>{errors["electricityTimes"]}</p>}
                                    <select
                                        className={`form-control p-3 ${errors["isAlternativeEnergyExist"] ? "border border-danger mb-2" : "mb-4"}`}
                                        onChange={(e) => setIsAlternativeEnergyExist(e.target.value)}
                                    >
                                        <option value="" hidden>هل يوجد طاقة بديلة ؟</option>
                                        <option value="yes">نعم</option>
                                        <option value="no">لا</option>
                                    </select>
                                    {errors["isAlternativeEnergyExist"] && <p className='error-msg text-danger'>{errors["isAlternativeEnergyExist"]}</p>}
                                </div>
                                {/* End Column */}
                            </div>
                            {/* End Grid System From Bootstrap */}
                            {!isRequestingStatus && !errMsg && !isSuccessfulyStatus && <button type='submit' className='btn service-request-btn w-50 p-3 mx-auto d-block'>
                                <span className='ms-2'>إرسال</span>
                                <FiUserPlus />
                            </button>}
                            {isRequestingStatus && <button className='btn wait-requesting-btn w-50 p-3 mt-4 mx-auto d-block' disabled>
                                <span className='ms-2'>جاري الطلب ...</span>
                                <AiOutlineClockCircle />
                            </button>}
                            {isSuccessfulyStatus && <button className='btn btn-success requesting-successfuly-btn w-50 p-3 mt-4 mx-auto d-block' disabled>
                                <span className='ms-2'>تمّ طلب الخدمة بنجاح</span>
                            </button>}
                            {errMsg && <button className='btn btn-danger error-btn w-50 p-3 mt-4 mx-auto d-block' disabled>
                                {errMsg}
                            </button>}
                        </form>
                    </> : <p className='alert alert-danger'>{errorInFetchUserDataMsg}</p>}
                </div>
                {/* End Container From Bootstrap */}
            </section>
            {/* End Page Content Section */}
        </div>
        // End Service Request Page
    );
}