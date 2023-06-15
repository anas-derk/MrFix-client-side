import Head from 'next/head';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import ResetPasswordImage from "../../../public/images/ResetPassword/reset-password.png";
import { AiOutlineClockCircle } from "react-icons/ai";
import global_functions from '../../../public/global_functions/validations';
import Axios from 'axios';
import { useRouter } from 'next/router';

export default function ResetPassword() {
    const [typedUserCode, setTypedUserCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newConfirmPassword, setNewConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [isResetingPasswordStatus, setIsResetingPasswordStatus] = useState(false);
    const [isSuccessfulyStatus, setIsSuccessfulyStatus] = useState(false);
    const [tempResetPasswordData, setTempResetPasswordData] = useState("");
    const [errMsg, setErrorMsg] = useState("");
    const router = useRouter();
    useEffect(() => {
        let header = document.querySelector("#__next .page-header"),
            pageContent = document.querySelector(".reset-password .page-content");
        pageContent.style.minHeight = `calc(100vh - ${header.clientHeight}px)`;
        let tempResetPasswordData = JSON.parse(localStorage.getItem("mr-fix-temp-reset-password-data"));
        if (tempResetPasswordData) {
            setTempResetPasswordData(tempResetPasswordData);
        } else {
            router.push("/forget-password");
        }
    }, []);
    const resetPassword = async (e) => {
        e.preventDefault();
        setErrors({});
        let errorsObject = global_functions.inputValuesValidation(
            [
                {
                    name: "typedUserCode",
                    value: typedUserCode,
                    rules: {
                        isRequired: {
                            msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                        },
                        isMatch: {
                            value: tempResetPasswordData.code,
                            msg: "عذراً الرمز غير صحيح !!",
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
                        isValidPassword: {
                            value: newPassword,
                            msg: "عذراً ، يجب أن تكون كلمة السر تحتوي على الأقل 8 حروف أو أرقام أو كلاهما.",
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
            try {
                let res = await Axios.put(`${process.env.BASE_API_URL}/users/reset-password/${tempResetPasswordData.userIdAndType.userId}?userType=${tempResetPasswordData.userIdAndType.userType}&newPassword=${newPassword}`);
                let result = await res.data;
                if (result === "لقد تمّت عملية إعادة تعيين كلمة المرور الخاصة بك بنجاح !!") {
                    let resetPasswordStatusTimeout = setTimeout(() => {
                        setIsResetingPasswordStatus(false);
                        setIsSuccessfulyStatus(true);
                        let successStatusTimeout = setTimeout(() => {
                            clearTimeout(resetPasswordStatusTimeout);
                            clearTimeout(successStatusTimeout);
                            router.push("/login");
                        }, 2500);
                    }, 2000);
                } else {
                    setIsResetingPasswordStatus(false);
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
                                    className={`form-control p-3 ${errors["typedUserCode"] ? "border border-danger mb-2" : "mb-4"}`}
                                    onChange={(e) => setTypedUserCode(e.target.value.trim())}
                                />
                                {errors["typedUserCode"] && <p className='error-msg text-danger'>{errors["typedUserCode"]}</p>}
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
                                    className={`form-control p-3 ${errors["newConfirmPassword"] ? "border border-danger mb-2" : "mb-4"}`}
                                    onChange={(e) => setNewConfirmPassword(e.target.value.trim())}
                                />
                                {errors["newConfirmPassword"] && <p className='error-msg text-danger'>{errors["newConfirmPassword"]}</p>}
                                {!isResetingPasswordStatus && !errMsg && !isSuccessfulyStatus && <button type='submit' className='btn reset-password-btn w-100 p-3'>إرسال</button>}
                                {isResetingPasswordStatus && <button className='btn wait-reset-password-btn w-50 p-3 mt-4 mx-auto d-block' disabled>
                                    <span className='ms-2'>جاري إعادة التعيين ...</span>
                                    <AiOutlineClockCircle />
                                </button>}
                                {isSuccessfulyStatus && <button className='btn btn-success success-reset-password-btn w-100 p-3 mt-4 mx-auto d-block' disabled>
                                    <span className='ms-2'>تمت عملية إعادة تعيين كلمة السر بنجاح ...</span>
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