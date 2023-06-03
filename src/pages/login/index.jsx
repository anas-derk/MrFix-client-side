import Head from 'next/head';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import loginImage from "../../../public/images/Login/login.png";
import Link from 'next/link';
import global_functions from '../../../public/global_functions/validations';
import Axios from 'axios';
import { AiOutlineClockCircle } from "react-icons/ai";
import { useRouter } from 'next/router';

export default function Login() {

    const [text, setText] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [errMsg, setErrorMsg] = useState("");
    const [isLoginStatus, setIsLoginStatus] = useState(false);
    const router = useRouter();

    const login = async (e) => {
        e.preventDefault();
        setErrors({});
        let errorsObject = global_functions.inputValuesValidation(
            [
                {
                    name: "text",
                    value: text,
                    rules: {
                        isRequired: {
                            msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                        },
                        isEmailOrNumber: {
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
                    },
                },
            ]
        );
        setErrors(errorsObject);
        if (Object.keys(errorsObject).length == 0) {
            setIsLoginStatus(true);
            try {
                let res = await Axios.get(`${process.env.BASE_API_URL}/users/login?text=${text}&password=${password}`);
                let result = await res.data;
                if (result === "عذراً ، الإيميل أو رقم الهاتف خاطئ أو كلمة السر خاطئة") {
                    let loginTimeout = setTimeout(() => {
                        setIsLoginStatus(false);
                        setErrorMsg(result);
                        let errorTimeout = setTimeout(() => {
                            setErrorMsg("");
                            clearTimeout(errorTimeout);
                            clearTimeout(loginTimeout);
                        }, 2000);
                    }, 2000);
                } else {
                    let loginTimeout = setTimeout(() => {
                        setIsLoginStatus(false);
                        clearTimeout(loginTimeout);
                        localStorage.setItem("mr-fix-user-id", result);
                        router.push("/");
                    }, 2000);
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    useEffect(() => {
        let header = document.querySelector("#__next .page-header"),
            pageContent = document.querySelector(".login .page-content");
        pageContent.style.minHeight = `calc(100vh - ${header.clientHeight}px)`;
        // Start Define Function To Check If User Exist
        async function fetchData(userId) {
            try {
                let res = await Axios.get(`${process.env.BASE_API_URL}/users/user-info/${userId}`);
                let result = await res.data;
                if (result === "عذراً ، المستخدم غير موجود") {
                    localStorage.clear();
                    router.push("/login");
                } else {
                    router.push("/");
                }
            }
            catch (err) {
                router.push("/");
            }
        }
        let userId = localStorage.getItem("mr-fix-user-id");
        if (userId) {
            fetchData(userId);
        }
    }, []);

    return (
        // Start Login Page
        <div className="login shared-pages-with-styles">
            <Head>
                <title>مستر فيكس - تسجيل الدخول</title>
            </Head>
            <Header />
            {/* Start Page Content Section */}
            <div className="page-content p-4">
                {/* Start Container From Bootstrap */}
                <div className="container">
                    {/* Start Grid System From Bootstrap */}
                    <div className="row align-items-center">
                        {/* Start Column */}
                        <div className="col-lg-7 p-5">
                            {/* Start Login Form */}
                            <form className="login-form bg-white p-4 text-center" onSubmit={login}>
                                <h4 className='mb-4'>أهلاً بعودتك .</h4>
                                <input
                                    type="text"
                                    placeholder="البريد الالكتروني أو رقم الجوال"
                                    className={`form-control p-3 ${errors["text"] ? "border border-danger mb-2" : "mb-4"}`}
                                    onChange={(e) => setText(e.target.value.trim())}
                                />
                                {errors["text"] && <p className='error-msg text-danger'>{errors["text"]}</p>}
                                <input
                                    type="password"
                                    placeholder="كلمة السر"
                                    className={`form-control p-3 ${errors["password"] ? "border border-danger mb-2" : "mb-4"}`}
                                    onChange={(e) => setPassword(e.target.value.trim())}
                                />
                                {errors["password"] && <p className='error-msg text-danger'>{errors["password"]}</p>}
                                <Link href="/forget-password" className='mb-3 btn w-100 text-start'>نسيت كلمة السر !</Link>
                                {!isLoginStatus && !errMsg && <button type='submit' className='btn login-btn w-100 p-3'>تسجيل الدخول</button>}
                                {isLoginStatus && <button className='btn wait-login-btn w-100 p-3 mt-4 mx-auto d-block' disabled>
                                    <span className='ms-2'>جاري تسجيل الدخول ...</span>
                                    <AiOutlineClockCircle />
                                </button>}
                                {errMsg && <button className='btn btn-danger error-btn w-100 p-3 mt-4 mx-auto d-block' disabled>
                                    {errMsg}
                                </button>}
                            </form>
                            {/* End Login Form */}
                        </div>
                        {/* End Column */}
                        {/* Start Column */}
                        <div className="col-lg-5">
                            <img src={loginImage.src} alt="Login Image !!" className='login-img' />
                        </div>
                        {/* End Column */}
                    </div>
                    {/* End Grid System From Bootstrap */}
                </div>
                {/* End Container From Bootstrap */}
            </div>
            {/* End Page Content Section */}
        </div>
        // End Who Are We Page
    );
}
