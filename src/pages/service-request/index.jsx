import Head from 'next/head';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import { FiUserPlus } from "react-icons/fi";
import ourServicesData from "../../../public/data/index";
import Axios from "axios";
import { useRouter } from 'next/router';
import global_functions from "../../../public/global_functions/validations";
import { AiOutlineClockCircle } from "react-icons/ai";

export default function ServiceRequest() {
    const [requestType, setRequestType] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [imageOfTheBrokenTool, setImageOfTheBrokenTool] = useState("");
    const [pictureOfTheVacationSpot, setPictureOfTheVacationSpot] = useState("");
    const [preferredDateOfVisit, setPreferredDateOfVisit] = useState("");
    const [preferredTimeOfVisit, setPreferredTimeOfVisit] = useState("");
    const [electricityTimes, setElectricityTimes] = useState("");
    const [isAlternativeEnergyExist, setIsAlternativeEnergyExist] = useState("");
    const [inputType1, setInputType1] = useState("");
    const [inputType2, setInputType2] = useState("");
    const [inputType3, setInputType3] = useState("");
    const [userId, setUserId] = useState("");
    const [userData, setUserData] = useState("");
    const [errorInFetchUserDataMsg, setErrorInFetchUserDataMsg] = useState("");
    const [errors, setErrors] = useState({});
    const [isRequestingStatus, setIsRequestingStatus] = useState(false);
    const [isSuccessfulyStatus, setIsSuccessfulyStatus] = useState(false);
    const [errMsg, setErrorMsg] = useState("");

    const router = useRouter();
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
                    name: "newAddress",
                    value: newAddress,
                    rules: {
                        isRequired: {
                            msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                        },
                    },
                },
                {
                    name: "imageOfTheBrokenTool",
                    value: imageOfTheBrokenTool,
                    rules: {
                        isRequired: {
                            msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                        },
                    },
                },
                {
                    name: "pictureOfTheVacationSpot",
                    value: pictureOfTheVacationSpot,
                    rules: {
                        isRequired: {
                            msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                        },
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
        setErrors(errorsObject);
        console.log(errorsObject);
        if (Object.keys(errorsObject).length == 0) {
            setIsRequestingStatus(true);
            try {
                let res = await Axios.post(`${process.env.BASE_API_URL}/requests/create-new-request`, {
                    requestType,
                    serviceType,
                    newAddress,
                    imageOfTheBrokenTool,
                    pictureOfTheVacationSpot,
                    preferredDateOfVisit,
                    preferredTimeOfVisit,
                    electricityTimes,
                    isAlternativeEnergyExist,
                });
                let result = await res.data;
                if (result === "تمّ طلب الخدمة بنجاح ، سوف يتم التواصل معك قريباً جداً") {
                    let successStatusTimeout = setTimeout(() => {
                        setIsSignupStatus(false);
                        setIsSuccessfulyStatus(true);
                        clearTimeout(successStatusTimeout);
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
                setErrorMsg(err);
            }
        }
    }
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
                                <option value="normal-request">طلب عادي</option>
                                <option value="ambulance-request">طلب إسعافي</option>
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
                                        placeholder="العنوان بالتفصيل في حالة إختلافه عن العنوان المسجل"
                                        className='form-control p-3 mb-4'
                                        onChange={(e) => setNewAddress(e.target.value)}
                                    ></textarea>
                                    <input
                                        type="file"
                                        placeholder="صورة عن الأداة المعطلة"
                                        className={`form-control p-3 ${errors["imageOfTheBrokenTool"] ? "border border-danger mb-2" : "mb-4"}`}
                                        onChange={(e) => setImageOfTheBrokenTool(e.target.files[0])}
                                    />
                                    {errors["imageOfTheBrokenTool"] && <p className='error-msg text-danger'>{errors["imageOfTheBrokenTool"]}</p>}
                                    <input
                                        type="file"
                                        placeholder="صورة عن المكان المعطل"
                                        className={`form-control p-3 ${errors["pictureOfTheVacationSpot"] ? "border border-danger mb-2" : "mb-4"}`}
                                        onChange={(e) => setPictureOfTheVacationSpot(e.target.files[0])}
                                    />
                                    {errors["pictureOfTheVacationSpot"] && <p className='error-msg text-danger'>{errors["pictureOfTheVacationSpot"]}</p>}
                                </div>
                                {/* End Column */}
                                {/* Start Column */}
                                <div className="col-md-6">
                                    {requestType !== "ambulance-request" && <>
                                        <input
                                            type={inputType3}
                                            placeholder="تاريخ اليوم المفضل لزيارة الورشة"
                                            className={`form-control p-3 ${errors["preferredDateOfVisit"] ? "border border-danger mb-2" : "mb-4"}`}
                                            onFocus={() => setInputType3("date")}
                                            onBlur={() => setInputType3("text")}
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
                            {!isRequestingStatus && !errMsg && <button type='submit' className='btn service-request-btn w-50 p-3 mx-auto d-block'>
                                <span className='ms-2'>إرسال</span>
                                <FiUserPlus />
                            </button>}
                            {isRequestingStatus && <button className='btn wait-requesting-btn w-50 p-3 mt-4 mx-auto d-block' disabled>
                                <span className='ms-2'>جاري الطلب ...</span>
                                <AiOutlineClockCircle />
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
