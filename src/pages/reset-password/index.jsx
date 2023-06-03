import Head from 'next/head';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import ResetPasswordImage from "../../../public/images/ResetPassword/reset-password.png";
import { AiOutlineClockCircle } from "react-icons/ai";
import global_functions from '../../../public/global_functions/validations';
import Axios from 'axios';

export default function ResetPassword() {
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newConfirmPassword, setNewConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [isResetingPasswordStatus, setIsResetingPasswordStatus] = useState(false);
    const [isSuccessfulyStatus, setIsSuccessfulyStatus] = useState(false);
    const [errMsg, setErrorMsg] = useState("");
    useEffect(() => {
        let header = document.querySelector("#__next .page-header"),
            pageContent = document.querySelector(".reset-password .page-content");
        pageContent.style.minHeight = `calc(100vh - ${header.clientHeight}px)`;
    }, []);
    const resetPassword = async (e) => {
        e.preventDefault();
        setErrors({});
        let errorsObject = global_functions.inputValuesValidation(
            [
                {
                    name: "code",
                    value: code,
                    rules: {
                        isRequired: {
                            msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                        },
                    },
                },
                {
                    name: "newPassword",
                    value: newPassword,
                    rules: {
                        isRequired: {
                            msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                        },
                        isPassword: {
                            value: newPassword,
                            msg: "عذراً ، يجب أن يكون عدد أحرف الكلمة 8 على الأقل ولا تحتوي محارف خاصة ، وتحتوي على أحرف",
                        },
                    },
                },
                {
                    name: "newConfirmPassword",
                    value: newConfirmPassword,
                    rules: {
                        isRequired: {
                            msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                        },
                        isMatch: {
                            value: newPassword,
                            msg: "عذراً ، لا يوجد تطابق بين كلمة السر وتأكيدها !!",
                        },
                    },
                },
            ]
        );
        setErrors(errorsObject);
        if (Object.keys(errorsObject).length == 0) {
            setIsResetingPasswordStatus(true);
            // try {
            //     let res = await Axios.put(`${process.env.BASE_API_URL}/users/reset-password/:user_id?newPassword=${newPassword}`);
            //     let result = await res.data;
            //     if (result === "لقد تمّت عملية إعادة تعيين كلمة المرور الخاصة بك بنجاح !!") {
            //         let successStatusTimeout = setTimeout(() => {
            //             setIsSignupStatus(false);
            //             setIsSuccessfulyStatus(true);
            //             clearTimeout(successStatusTimeout);
            //         }, 2000);
            //     } else {
            //         setIsSignupStatus(false);
            //         setErrorMsg(result);
            //         let errMsgTimeout = setTimeout(() => {
            //             setErrorMsg("");
            //             clearTimeout(errMsgTimeout);
            //         }, 4000);
            //     }
            // } catch (err) {
            //     setErrorMsg(err);
            // }
        }
    }
    return (
        // Start Reset Password Page
        <div className="reset-password shared-pages-with-styles">
            <Head>
                <title>مستر فيكس - إعادة تعيين كلمة السر</title>
            </Head>
            <Header />
            {/* Start Page Content Section */}
            <div className="page-content pt-4 pb-4">
                {/* Start Container From Bootstrap */}
                <div className="container">
                    {/* Start Grid System From Bootstrap */}
                    <div className="row align-items-center">
                        {/* Start Column */}
                        <div className="col-md-6 p-5">
                            {/* Start Login Form */}
                            <form
                                className="reset-password-form bg-white p-4 text-center"
                                onSubmit={resetPassword}
                            >
                                <h4 className='mb-4'>إعادة تعيين كلمة السر !</h4>
                                <input
                                    type="text"
                                    placeholder="أدخل الكود"
                                    className={`form-control p-3 ${errors["code"] ? "border border-danger mb-2" : "mb-4"}`}
                                    onChange={(e) => setCode(e.target.value.trim())}
                                />
                                {errors["code"] && <p className='error-msg text-danger'>{errors["code"]}</p>}
                                <input
                                    type="password"
                                    placeholder="كلمة السر الجديدة"
                                    className={`form-control p-3 ${errors["newPassword"] ? "border border-danger mb-2" : "mb-4"}`}
                                    onChange={(e) => setNewPassword(e.target.value.trim())}
                                />
                                {errors["newPassword"] && <p className='error-msg text-danger'>{errors["newPassword"]}</p>}
                                <input
                                    type="password"
                                    placeholder="تأكيد السر الجديدة"
                                    className={`form-control p-3 mb-4 ${errors["newConfirmPassword"] ? "border border-danger" : ""}`}
                                    onChange={(e) => setNewConfirmPassword(e.target.value.trim())}
                                />
                                {errors["newConfirmPassword"] && <p className='error-msg text-danger'>{errors["newConfirmPassword"]}</p>}
                                {!isResetingPasswordStatus && !errMsg && <button type='submit' className='btn reset-password-btn w-100 p-3'>إرسال</button>}
                                {isResetingPasswordStatus && <button className='btn wait-reset-password-btn w-50 p-3 mt-4 mx-auto d-block' disabled>
                                    <span className='ms-2'>جاري إعادة التعيين ...</span>
                                    <AiOutlineClockCircle />
                                </button>}
                                {errMsg && <button className='btn btn-danger error-btn w-50 p-3 mt-4 mx-auto d-block' disabled>
                                    {errMsg}
                                </button>}
                            </form>
                            {/* End Login Form */}
                        </div>
                        {/* End Column */}
                        {/* Start Column */}
                        <div className="col-md-6">
                            <img src={ResetPasswordImage.src} alt="Reset Password Image !!" className='reset-password-img' />
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