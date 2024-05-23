import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { getAdminInfo } from "../../../../../../public/global_functions/popular";

const PasswordsReset = () => {
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);
    const [mobilePhone, setMobilePhone] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [waitMsg, setWaitMsg] = useState("");
    const router = useRouter();
    useEffect(() => {
        const adminToken = localStorage.getItem(process.env.adminTokenNameInLocalStorage);
        if (adminToken) {
            getAdminInfo()
                .then(async (result) => {
                    if (result.error) {
                        localStorage.removeItem(process.env.adminTokenNameInLocalStorage);
                        await router.replace("/dashboard/admin/login");
                    } else {
                        setIsLoadingPage(false);
                    }
                })
                .catch(async (err) => {
                    if (err?.response?.data?.msg === "Unauthorized Error") {
                        localStorage.removeItem(process.env.adminTokenNameInLocalStorage);
                        await router.replace("/dashboard/admin/login");
                    }
                    else {
                        setIsLoadingPage(false);
                        setIsErrorMsgOnLoadingThePage(true);
                    }
                });
        } else router.push("/dashboard/admin/login");
    }, []);
    const resetPassword = async (e) => {
        try {
            e.preventDefault();
            setWaitMsg("الرجاء الانتظار ...");
            const res = await axios.put(`${process.env.BASE_API_URL}/admins/reset-password/${mobilePhone}`, {}, {
                headers: {
                    Authorization: localStorage.getItem(process.env.adminTokenNameInLocalStorage)
                }
            });
            const result = res.data;
            setWaitMsg("");
            if (result.error) {
                setErrorMsg(result.msg);
                setTimeout(() => {
                    setErrorMsg("");
                    setMobilePhone("");
                }, 1500);
            } else {
                setSuccessMsg(result.msg);
                setTimeout(() => {
                    setSuccessMsg("");
                    setMobilePhone("");
                }, 1500);
            }
        }
        catch (err) {
            if (err?.response?.data?.msg === "Unauthorized Error") {
                localStorage.removeItem(process.env.adminTokenNameInLocalStorage);
                await router.replace("/dashboard/admin/login");
                return;
            }
            // طباعة رسالة الخطأ في الكونسول إن حصلت مشكلة عند إرسال الطلب للسيرفر
            setWaitMsg("");
            setErrorMsg("عذراً حدث خطا ما ، يرجى إعادة المحاولة !!");
            let errorTimeout = setTimeout(() => {
                setErrorMsg("");
                clearTimeout(errorTimeout);
            }, 5000);
        }
    }
    return (
        // Start Passwords Reset Page
        <div className="passwords-reset">
            <Head>
                <title>مستر فيكس - إعادة تعيين كلمات المرور</title>
            </Head>
            {!isLoadingPage && !isErrorMsgOnLoadingThePage && <>
                {/* Start Content Section */}
                <section className="content d-flex justify-content-center align-items-center flex-column text-center">
                    <div className="container">
                        <h1 className="welcome-msg mb-4">مرحباً بك في صفحة إعادة تعيين كلمات السر الخاصة بالمستخدمين في مستر فيكس</h1>
                        <form className="reset-password-form w-100" onSubmit={resetPassword}>
                            <input
                                type="number"
                                minLength={10}
                                maxLength={10}
                                placeholder="الرجاء إدخال رقم الموبايل للحساب"
                                required
                                className="form-control mb-4 p-3"
                                onChange={(e) => setMobilePhone(e.target.value.trim())}
                                value={mobilePhone}
                            />
                            {!errorMsg && !successMsg && !waitMsg && <button type="submit" className="btn btn-danger p-3">إعادة تعيين كلمة السر</button>}
                            {waitMsg && <button type="submit" className="btn btn-warning p-3 d-block w-100 mx-auto" disabled>{waitMsg}</button>}
                            {errorMsg && <button type="submit" className="btn btn-danger p-3 d-block w-100 mx-auto" disabled>{errorMsg}</button>}
                            {successMsg && <button type="submit" className="btn btn-success p-3 d-block w-100 mx-auto" disabled>{successMsg}</button>}
                        </form>
                    </div>
                </section>
                {/* End Content Section */}
            </>}
        </div>
        // End Passwords Reset Page
    );
}

export default PasswordsReset;