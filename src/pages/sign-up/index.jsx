import Head from 'next/head';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import { FiUserPlus } from "react-icons/fi";
import global_functions from '../../../public/data/global_functions';

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
    const [errors, setErrors] = useState([]);

    const createAccount = (e) => {
        e.preventDefault();
        setErrors([]);
        let errorList = global_functions.inputValuesValidation(
            [
                {
                    name: "firstAndLastName",
                    value: firstAndLastName,
                    rules: {
                        isRequired: {
                            msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                        },
                        minLength: {
                            value: 5,
                            msg: "عذراً ، يجب أن يكون عدد الأحرف على الأقل 4 !!"
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
            ]
        );
        setErrors(errorList);
        // if (!errors) {
        //     console.log("ee");
        // } 
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
                <title>Mr. Fix - Signup</title>
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
                                {errors["firstAndLastName"] && <p className='error-msg text-danger'>{ errors["firstAndLastName"] }</p>}
                                <input
                                    type="text"
                                    placeholder="البريد الالكتروني"
                                    className={`form-control p-3 ${errors["email"] ? "border border-danger mb-2" : "mb-4"}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors["email"] && <p className='error-msg text-danger'>{ errors["email"] }</p>}
                                <input
                                    type="number"
                                    placeholder="رقم الجوال"
                                    className={`form-control p-3 ${errors["mobilePhone"] ? "border border-danger mb-2" : "mb-4"}`}
                                    onChange={(e) => setMobilePhone(e.target.value)}
                                />
                                {errors["mobilePhone"] && <p className='error-msg text-danger'>{ errors["mobilePhone"] }</p>}
                                <input
                                    type="password"
                                    placeholder="كلمة السر"
                                    className={`form-control p-3 ${errors["password"] ? "border border-danger mb-2" : "mb-4"}`}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors["password"] && <p className='error-msg text-danger'>{ errors["password"] }</p>}
                                <input
                                    type="password"
                                    placeholder="تأكيد كلمة السر"
                                    className='form-control p-3 mb-4'
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            {/* End Column */}
                            {/* Start Column */}
                            <div className="col-md-6">
                                <select
                                    className='form-control p-3 mb-4'
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option defaultValue="" hidden>اختر الجنس</option>
                                    <option value="male">ذكر</option>
                                    <option value="female">أنثى</option>
                                </select>
                                <input
                                    type="date"
                                    placeholder="تاريخ الميلاد"
                                    className='form-control p-3 mb-4'
                                    onChange={(e) => setBirthday(e.target.value)}
                                />
                                <select
                                    className='form-control p-3 mb-4'
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
                                <textarea
                                    placeholder="العنوان بالتفصيل - مثال: شارع ميسلون, في البناء مقابل محل انكو, في الطابق الرابع"
                                    className='form-control p-3 address'
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            {/* End Column */}
                        </div>
                        {/* End Grid System From Bootstrap */}
                        <button type='submit' className='btn sign-up-btn w-50 p-3 mt-4 mx-auto d-block'>
                            <span className='ms-2'>تسجيل</span>
                            <FiUserPlus />
                        </button>
                    </form>
                </div>
                {/* End Container From Bootstrap */}
            </section>
            {/* End Page Content Section */}
        </div>
        // End Who Are We Page
    );
}
