import Head from 'next/head';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import ForgetPasswordImage from "../../../public/images/ForgetPassword/forget-password.png";
import global_functions from "../../../public/global_functions/validations";
import { useRouter } from 'next/router';
import Axios from "axios";
import { AiOutlineClockCircle } from "react-icons/ai";

export default function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    const [isWaitCheckStatus, setIsWaitCheckStatus] = useState("");
    const [errMsg, setErrorMsg] = useState("");
    const router = useRouter();
    useEffect(() => {
        let header = document.querySelector("#__next .page-header"),
            pageContent = document.querySelector(".forget-password .page-content");
        pageContent.style.minHeight = `calc(100vh - ${header.clientHeight}px)`;
        let userId = localStorage.getItem("mr-fix-user-id");
        if (userId) router.push("/");
    }, []);
    const forgetPassword = async (e) => {
        e.preventDefault();
        setErrors({});
        let errorsObject = global_functions.inputValuesValidation(
            [
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
            ]
        );
        setErrors(errorsObject);
        if (Object.keys(errorsObject).length == 0) {
            setIsWaitCheckStatus(true);
            try {
                let res = await Axios.get(`${process.env.BASE_API_URL}/users/forget-password?email=${email}`);
                let result = await res.data;
                if (result === "عذراً البريد الالكتروني الذي أدخلته غير موجود !!") {
                    let waitTimeout = setTimeout(() => {
                        setIsWaitCheckStatus(false);
                        setErrorMsg(result);
                        let errorTimeout = setTimeout(() => {
                            setErrorMsg("");
                            clearTimeout(errorTimeout);
                            clearTimeout(waitTimeout);
                        }, 2000);
                    }, 2000);
                } else {
                    let waitTimeout = setTimeout(() => {
                        setIsWaitCheckStatus(false);
                        clearTimeout(waitTimeout);
                        console.log(result);
                        router.push("/reset-password", {
                            query: result,
                        });
                    }, 2000);
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
    return (
        // Start Forget Password Page
        <div className="forget-password shared-pages-with-styles">
            <Head>
                <title>مستر فيكس - نسيت كلمة السر</title>
            </Head>
            <Header />
            {/* Start Page Content Section */}
            <div className="page-content p-4">
                {/* Start Container From Bootstrap */}
                <div className="container">
                    {/* Start Grid System From Bootstrap */}
                    <div className="row align-items-center">
                        {/* Start Column */}
                        <div className="col-lg-6 p-5">
                            {/* Start Login Form */}
                            <form
                                className="forget-password-form bg-white p-4 pt-5 pb-5 text-center mt-4"
                                onSubmit={forgetPassword}
                            >
                                <h4 className='mb-5'>نسيت كلمة السر !</h4>
                                <input
                                    type="text"
                                    placeholder="البريد الالكتروني"
                                    className={`form-control p-3 ${errors["email"] ? "border border-danger mb-2" : "mb-5"}`}
                                    onChange={(e) => setEmail(e.target.value.trim())}
                                />
                                {errors["email"] && <p className='error-msg text-danger'>{errors["email"]}</p>}
                                {!isWaitCheckStatus && !errMsg && <button type='submit' className='btn forget-password-btn w-100 p-3'>إرسال</button>}
                                {isWaitCheckStatus && <button className='btn wait-check-btn w-100 p-3 mt-4 mx-auto d-block' disabled>
                                    <span className='ms-2'>جاري التحقق ...</span>
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
                        <div className="col-lg-6">
                            <img src={ForgetPasswordImage.src} alt="Forget Password Image !!" className='forget-password-img' />
                        </div>
                        {/* End Column */}
                    </div>
                    {/* End Grid System From Bootstrap */}
                </div>
                {/* End Container From Bootstrap */}
            </div>
            {/* End Page Content Section */}
        </div>
        // End Forget Password Page
    );
}