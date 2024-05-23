import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { inputValuesValidation } from "../../../../../public/global_functions/validations";
import { getAdminInfo } from "../../../../../public/global_functions/popular";
import LoaderPage from "@/components/LoaderPage";
import ErrorOnLoadingThePage from "@/components/ErrorOnLoadingThePage";

const AdminLogin = () => {
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginingStatus, setIsLoginingStatus] = useState(false);
    const [errMsg, setErrorMsg] = useState("");
    const [formValidationErrors, setFormValidationErrors] = useState({});
    const router = useRouter();
    useEffect(() => {
        const adminToken = localStorage.getItem(process.env.adminTokenNameInLocalStorage);
        if (adminToken) {
            getAdminInfo()
                .then(async (result) => {
                    if (result.error) {
                        localStorage.removeItem(process.env.adminTokenNameInLocalStorage);
                        setIsLoadingPage(false);
                    } else await router.push("/dashboard/admin/admin-panel");
                })
                .catch(async (err) => {
                    if (err?.response?.data?.msg === "Unauthorized Error") {
                        localStorage.removeItem(process.env.adminTokenNameInLocalStorage);
                        setIsLoadingPage(false);
                    }
                    else {
                        setIsLoadingPage(false);
                        setIsErrorMsgOnLoadingThePage(true);
                    }
                });
        } else setIsLoadingPage(false);
    }, []);
    const adminLogin = async (e) => {
        try {
            e.preventDefault();
            setFormValidationErrors({});
            let errorsObject = inputValuesValidation([
                {
                    name: "email",
                    value: email,
                    rules: {
                        isRequired: {
                            msg: "عذراً ، هذا الحقل لا يمكن أن يكون فارغاً !!",
                        },
                        isEmail: {
                            msg: "عذراً هذا البريد الإلكتروني غير صالح !!",
                        }
                    },
                },
                {
                    name: "password",
                    value: password,
                    rules: {
                        isRequired: {
                            msg: "عذراً ، هذا الحقل لا يمكن أن يكون فارغاً !!",
                        },
                    },
                },
            ]);
            setFormValidationErrors(errorsObject);
            if (Object.keys(errorsObject).length == 0) {
                setIsLoginingStatus(true);
                const res = await axios.get(`${process.env.BASE_API_URL}/admins/login?email=${email}&password=${password}`);
                const result = res.data;
                if (result.error) {
                    setIsLoginingStatus(false);
                    setErrorMsg(result.msg);
                    setTimeout(() => {
                        setErrorMsg("");
                    }, 4000);
                } else {
                    localStorage.setItem(process.env.adminTokenNameInLocalStorage, result.data.token);
                    await router.replace("/dashboard/admin/admin-panel");
                }
            }
        } catch (err) {
            setIsLoginingStatus(false);
            setErrorMsg("عذراً حدث خطا ما ، يرجى إعادة المحاولة !!");
            setTimeout(() => {
                setErrorMsg("");
            }, 3000);
        }
    }
    return (
        <div className="admin-login text-center p-5">
            <Head>
                <title>مستر فيكس - تسجيل دخول المسؤول</title>
            </Head>
            {!isLoadingPage && !isErrorMsgOnLoadingThePage && <>
                <h1>مرحباً بك في صفحة تسجيل الدخول الخاصة بالمسؤول</h1>
                <hr className="mb-5" />
                <div className="container">
                    <form className="admin-login-form mb-3" onSubmit={adminLogin}>
                        <input
                            type="text"
                            placeholder="الرجاء إدخال البريد الالكتروني"
                            className={`form-control w-50 mx-auto p-3 border-2 ${formValidationErrors["email"] ? "border-danger mb-2" : "mb-4"}`}
                            onChange={(e) => setEmail(e.target.value.trim())}
                        />
                        {formValidationErrors["email"] && <p className="error-msg text-danger">{formValidationErrors["email"]}</p>}
                        <input
                            type="password"
                            placeholder="الرجاء إدخال كلمة السر"
                            className={`form-control w-50 mx-auto p-3 border-2 ${formValidationErrors["password"] ? "border-danger mb-2" : "mb-4"}`}
                            onChange={(e) => setPassword(e.target.value.trim())}
                        />
                        {formValidationErrors["password"] && <p className='error-msg text-danger'>{formValidationErrors["password"]}</p>}
                        {!isLoginingStatus && !errMsg && 
                            <button type="submit" className="btn btn-success d-block mx-auto mb-4">تسجيل الدخول</button>
                        }
                        {isLoginingStatus && 
                            <button disabled className="btn btn-success d-block mx-auto mb-4">جاري تسجيل الدخول ...</button>
                        }
                        <Link href="/forget-password" className="btn btn-danger">نسيت كلمة المرور</Link>
                    </form>
                    {errMsg && <p className="alert alert-danger">{errMsg}</p>}
                </div>
            </>}
            {isLoadingPage && !isErrorMsgOnLoadingThePage && <LoaderPage />}
            {isErrorMsgOnLoadingThePage && <ErrorOnLoadingThePage />}
        </div>
    );
}

export default AdminLogin;