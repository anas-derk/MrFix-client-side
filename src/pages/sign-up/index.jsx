import Head from 'next/head';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import { FiUserPlus } from "react-icons/fi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { TfiFaceSmile } from "react-icons/tfi";
import global_functions from '../../../public/global_functions/validations';
import Link from 'next/link';
import Axios from 'axios';

export default function Signup() {
    
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

    const createAccount = async (e) => {
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
                {
                    name: "mobilePhone",
                    value: mobilePhone,
                    rules: {
                        isRequired: {
                            msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                        },
                        minLength: {
                            value: 10,
                            msg: "عذراً ، يجب أن يكون عدد الأرقام 10",
                        },
                        maxLength: {
                            value: 10,
                            msg: "عذراً ، يجب أن يكون عدد الأرقام 10",
                        }
                    },
                },
                {
                    name: "password",
                    value: password,
                    rules: {
                        isRequired: {
                            msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                        },
                        isPassword: {
                            value: password,
                            msg: "عذراً ، يجب أن يكون عدد أحرف الكلمة 8 على الأقل ولا تحتوي محارف خاصة ، وتحتوي على أحرف",
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
        setErrors(errorsObject);
        if (Object.keys(errorsObject).length == 0) {
            setIsSignupStatus(true);
            try {
                let res = await Axios.post(`${process.env.BASE_API_URL}/users/create-new-user`, {
                    firstAndLastName: firstAndLastName.trim(),
                    email: email.trim(),
                    mobilePhone: mobilePhone.trim(),
                    password: password.trim(),
                    gender,
                    birthday,
                    city,
                    address: address.trim(),
                });
                let result = await res.data;
                if (result === "تم بنجاح إنشاء الحساب") {
                    let successStatusTimeout = setTimeout(() => {
                        setIsSignupStatus(false);
                        setIsSuccessfulyStatus(true);
                        clearTimeout(successStatusTimeout);
                    }, 2000);
                } else {
                    setIsSignupStatus(false);
                    setErrorMsg(result);
                    let errMsgTimeout = setTimeout(() => {
                        setErrorMsg("");
                        clearTimeout(errMsgTimeout);
                    }, 4000);
                }
            } catch(err) {
                setErrorMsg(err);
            }
        }
    }

    useEffect(() => {
        let header = document.querySelector("#__next .page-header"),
            pageContent = document.querySelector(".sign-up .page-content");
        pageContent.style.minHeight = `calc(100vh - ${header.clientHeight}px)`;
        let address = document.querySelector(".sign-up .sign-up-form .address");
        address.style.height = `calc(116px + 1.5rem)`;
    }, []);

    return (
        // Start Who Are We Page
        <div className="sign-up">
            <Head>
                <title>مستر فيكس - إنشاء حساب</title>
            </Head>
            <Header />
            {/* Start Page Content Section */}
            <section className="page-content pt-4 pb-4">
                {/* Start Container From Bootstrap */}
                <div className="container">
                    <h1 className='page-title mb-4'>أهلاً وسهلاً بك في مستر فيكس</h1>
                    <form className="sign-up-form" onSubmit={createAccount}>
                        {/* Start Grid System From Bootstrap */}
                        <div className="row">
                            {/* Start Column */}
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    placeholder='الاسم والكنية'
                                    className={`form-control p-3 ${errors["firstAndLastName"] ? "border border-danger mb-2" : "mb-4"}`}
                                    onChange={(e) => setFirstAndLastName(e.target.value)}
                                />
                                {errors["firstAndLastName"] && <p className='error-msg text-danger'>{errors["firstAndLastName"]}</p>}
                                <input
                                    type="text"
                                    placeholder="البريد الالكتروني"
                                    className={`form-control p-3 ${errors["email"] ? "border border-danger mb-2" : "mb-4"}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors["email"] && <p className='error-msg text-danger'>{errors["email"]}</p>}
                                <input
                                    type="number"
                                    placeholder="رقم الجوال"
                                    className={`form-control p-3 ${errors["mobilePhone"] ? "border border-danger mb-2" : "mb-4"}`}
                                    onChange={(e) => setMobilePhone(e.target.value)}
                                />
                                {errors["mobilePhone"] && <p className='error-msg text-danger'>{errors["mobilePhone"]}</p>}
                                <input
                                    type="password"
                                    placeholder="كلمة السر"
                                    className={`form-control p-3 ${errors["password"] ? "border border-danger mb-2" : "mb-4"}`}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors["password"] && <p className='error-msg text-danger'>{errors["password"]}</p>}
                                <input
                                    type="password"
                                    placeholder="تأكيد كلمة السر"
                                    className={`form-control p-3 ${errors["confirmPassword"] ? "border border-danger mb-2" : "mb-4"}`}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                {errors["confirmPassword"] && <p className='error-msg text-danger'>{errors["confirmPassword"]}</p>}
                            </div>
                            {/* End Column */}
                            {/* Start Column */}
                            <div className="col-md-6">
                                <select
                                    className={`form-control p-3 ${errors["gender"] ? "border border-danger mb-2" : "mb-4"}`}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option defaultValue="" hidden>اختر الجنس</option>
                                    <option value="male">ذكر</option>
                                    <option value="female">أنثى</option>
                                </select>
                                {errors["gender"] && <p className='error-msg text-danger'>{errors["gender"]}</p>}
                                <input
                                    type={inputType}
                                    placeholder="تاريخ الميلاد"
                                    className={`form-control p-3 ${errors["birthday"] ? "border border-danger mb-2" : "mb-4"}`}
                                    onFocus={() => setInputType("date")}
                                    onBlur={() => setInputType("text")}
                                    onChange={(e) => setBirthday(e.target.value)}
                                />
                                {errors["birthday"] && <p className='error-msg text-danger'>{errors["birthday"]}</p>}
                                <select
                                    className={`form-control p-3 ${errors["city"] ? "border border-danger mb-2" : "mb-4"}`}
                                    onChange={(e) => setCity(e.target.value)}
                                >
                                    <option defaultValue="" hidden>اختر المحافظة</option>
                                    <option value="lattakia">اللاذقية</option>
                                    <option value="aleppo">حلب</option>
                                    <option value="damascus">دمشق</option>
                                    <option value="tartous">طرطوس</option>
                                    <option value="daraa">درعا</option>
                                    <option value="kenitra">القنيطرة</option>
                                    <option value="rif-Damascus">ريف دمشق</option>
                                    <option value="hams">حماة</option>
                                    <option value="idlib">إدلب</option>
                                    <option value="homs">حمص</option>
                                    <option value="al-Hasakah">الحسكة</option>
                                    <option value="deer-al-zour">دير الزور</option>
                                    <option value="raqqa">الرقة</option>
                                </select>
                                {errors["city"] && <p className='error-msg text-danger'>{errors["city"]}</p>}
                                <textarea
                                    placeholder="العنوان بالتفصيل - مثال: شارع ميسلون, في البناء مقابل محل انكو, في الطابق الرابع"
                                    className={`form-control p-3 address ${errors["address"] ? "border border-danger mb-2" : "mb-4"}`}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                {errors["address"] && <p className='error-msg text-danger'>{errors["address"]}</p>}
                            </div>
                            {/* End Column */}
                        </div>
                        {/* End Grid System From Bootstrap */}
                        {!isSignupStatus && !errMsg && <button className='btn sign-up-btn w-50 p-3 mt-4 mx-auto d-block'>
                            <span className='ms-2'>تسجيل</span>
                            <FiUserPlus />
                        </button>}
                        {isSignupStatus && <button className='btn wait-sign-up-btn w-50 p-3 mt-4 mx-auto d-block' disabled>
                            <span className='ms-2'>جاري التسجيل ...</span>
                            <AiOutlineClockCircle />
                        </button>}
                        {errMsg && <button className='btn btn-danger error-btn w-50 p-3 mt-4 mx-auto d-block' disabled>
                            {errMsg}
                        </button>}
                    </form>
                </div>
                {/* End Container From Bootstrap */}
            </section>
            {/* End Page Content Section */}
            {isSuccessfulyStatus &&
                /* Start Popup Box */
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
                /* End Popup Box */
            }
        </div>
        // End Who Are We Page
    );
}
