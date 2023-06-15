import Head from 'next/head';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import { FiUserPlus } from "react-icons/fi";
import { AiOutlineClockCircle } from "react-icons/ai";
import global_functions from '../../../public/global_functions/validations';
import Axios from 'axios';
import { useRouter } from 'next/router';

export default function Profile() {

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

    const router = useRouter();

    useEffect(() => {
        let header = document.querySelector("#__next .page-header"),
            pageContent = document.querySelector(".profile .page-content");
        pageContent.style.minHeight = `calc(100vh - ${header.clientHeight}px)`;
        let address = document.querySelector(".profile .edit-profile-form .address");
        address.style.height = `calc(116px + 1.5rem)`;
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

    const updateProfile = async (e) => {
        e.preventDefault();
        setErrors({});
        let errorsObject = global_functions.inputValuesValidation(
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
        setErrors(errorsObject);
        if (Object.keys(errorsObject).length == 0) {
            setIsUpdatingStatus(true);
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
            let isSameOfEmail = email === defaultEmail ? "yes" : "no";
            let isSameOfMobilePhone = mobilePhone === defaultMobilePhone ? "yes" : "no";
            try {
                let res = await Axios.put(`${process.env.BASE_API_URL}/users/update-user-info/${userId}?isSameOfEmail=${isSameOfEmail}&isSameOfMobilePhone=${isSameOfMobilePhone}`, newUserData);
                let result = await res.data;
                if (result === "عذراً لا يمكن تعديل بيانات الملف الشخصي لأن البريد الإلكتروني أو رقم الموبايل موجود مسبقاً !!") {
                    setTimeout(() => {
                        setIsUpdatingStatus(false);
                        setErrorMsg(result);
                        let errMsgTimeout = setTimeout(() => {
                            setErrorMsg("");
                            clearTimeout(errMsgTimeout);
                        }, 4000);
                    }, 2000);
                } else {
                    setTimeout(() => {
                        setIsUpdatingStatus(false);
                        setIsSuccessfulyStatus(true);
                        let successMsgTimeout = setTimeout(() => {
                            setIsSuccessfulyStatus(false);
                            clearTimeout(successMsgTimeout);
                        }, 4000);
                    }, 2000);
                }
            } catch (err) {
                setErrorMsg(result);
                let errMsgTimeout = setTimeout(() => {
                    setErrorMsg("");
                    clearTimeout(errMsgTimeout);
                }, 4000);
            }
        }
    }

    return (
        // Start Profile Page
        <div className="profile">
            <Head>
                <title>مستر فيكس - الملف الشخصي</title>
            </Head>
            <Header />
            {/* Start Page Content Section */}
            <section className="page-content pt-4 pb-4">
                {/* Start Container From Bootstrap */}
                <div className="container">
                    <h1 className='page-title mb-4'>الملف الشخصي</h1>
                    {!userNotFoundError ? <form className="edit-profile-form" onSubmit={updateProfile}>
                        {/* Start Grid System From Bootstrap */}
                        <div className="row">
                            {/* Start Column */}
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    placeholder='الاسم والكنية الجديد'
                                    className={`form-control p-3 ${errors["firstAndLastName"] ? "border border-danger mb-2" : "mb-4"}`}
                                    onChange={(e) => setFirstAndLastName(e.target.value.trim())}
                                    defaultValue={firstAndLastName}
                                />
                                {errors["firstAndLastName"] && <p className='error-msg text-danger'>{errors["firstAndLastName"]}</p>}
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
                                    className={`form-control p-3 ${errors["mobilePhone"] ? "border border-danger mb-2" : "mb-4"}`}
                                    onChange={(e) => setMobilePhone(e.target.value.trim())}
                                    defaultValue={mobilePhone}
                                />
                                {errors["mobilePhone"] && <p className='error-msg text-danger'>{errors["mobilePhone"]}</p>}
                                <input
                                    type="password"
                                    placeholder="كلمة السر الجديدة"
                                    className={`form-control p-3 ${errors["password"] ? "border border-danger mb-2" : "mb-4"}`}
                                    onChange={(e) => setPassword(e.target.value.trim())}
                                />
                                {errors["password"] && <p className='error-msg text-danger'>{errors["password"]}</p>}
                            </div>
                            {/* End Column */}
                            {/* Start Column */}
                            <div className="col-md-6">
                                <select
                                    className={`form-control p-3 ${errors["gender"] ? "border border-danger mb-2" : "mb-4"}`}
                                    onChange={(e) => setGender(e.target.value)}
                                    value={gender}
                                >
                                    <option defaultValue="" hidden>اختر الجنس</option>
                                    <option value="male">ذكر</option>
                                    <option value="female">أنثى</option>
                                </select>
                                {errors["gender"] && <p className='error-msg text-danger'>{errors["gender"]}</p>}
                                <input
                                    type={inputType}
                                    placeholder="تاريخ الميلاد الجديد"
                                    className={`form-control p-3 ${errors["birthday"] ? "border border-danger mb-2" : "mb-4"}`}
                                    onFocus={() => setInputType("date")}
                                    onBlur={() => setInputType("text")}
                                    onChange={(e) => setBirthday(e.target.value)}
                                    defaultValue={birthday}
                                />
                                {errors["birthday"] && <p className='error-msg text-danger'>{errors["birthday"]}</p>}
                                <select
                                    className={`form-control p-3 ${errors["city"] ? "border border-danger mb-2" : "mb-4"}`}
                                    onChange={(e) => setCity(e.target.value)}
                                    value={city}
                                >
                                    <option defaultValue="" hidden>اختر المحافظة</option>
                                    <option value="damascus">دمشق</option>
                                    <option value="rif-Damascus">ريف دمشق</option>
                                    {/* <option value="lattakia">اللاذقية</option>
                                    <option value="aleppo">حلب</option>
                                    <option value="tartous">طرطوس</option>
                                    <option value="daraa">درعا</option>
                                    <option value="kenitra">القنيطرة</option>
                                    <option value="hams">حماة</option>
                                    <option value="idlib">إدلب</option>
                                    <option value="homs">حمص</option>
                                    <option value="al-Hasakah">الحسكة</option>
                                    <option value="deer-al-zour">دير الزور</option>
                                    <option value="raqqa">الرقة</option> */}
                                </select>
                                {errors["city"] && <p className='error-msg text-danger'>{errors["city"]}</p>}
                                <textarea
                                    placeholder="محافظة دمشق، الميدان، امتداد شارع المول, بناء الغاردينيا، مقابل/ قرب محل الملكي، الطابق الرابع"
                                    className={`form-control p-3 address ${errors["address"] ? "border border-danger mb-2" : "mb-4"}`}
                                    onChange={(e) => setAddress(e.target.value.trim())}
                                    defaultValue={address}
                                />
                                {errors["address"] && <p className='error-msg text-danger'>{errors["address"]}</p>}
                            </div>
                            {/* End Column */}
                        </div>
                        {/* End Grid System From Bootstrap */}
                        {!isUpdatingStatus && !isSuccessfulyStatus && !errMsg && <button type='submit' className='btn edit-profile-btn w-50 p-3 mt-4 mx-auto d-block'>
                            <span className='ms-2'>تعديل</span>
                            <FiUserPlus />
                        </button>}
                        {isUpdatingStatus && <button className='btn btn-warning wait-update-profile-btn w-50 p-3 mt-4 mx-auto d-block' disabled>
                            <span className='ms-2'>جاري تعديل البيانات ...</span>
                            <AiOutlineClockCircle />
                        </button>}
                        {isSuccessfulyStatus && <button className='btn btn-success success-update-profile-btn w-50 p-3 mt-4 mx-auto d-block' disabled>
                            <span className='ms-2'>تمّ التعديل بنجاح .</span>
                        </button>}
                        {errMsg && <button className='btn btn-danger error-btn w-50 p-3 mt-4 mx-auto d-block' disabled>
                            {errMsg}
                        </button>}
                    </form> : <p className='alert alert-danger'>{userNotFoundError}</p>}
                </div>
                {/* End Container From Bootstrap */}
            </section>
            {/* End Page Content Section */}
        </div>
        // End Profile Page
    );
}
