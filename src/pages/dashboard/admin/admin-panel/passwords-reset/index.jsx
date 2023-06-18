import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Axios from "axios";

const PasswordsReset = () => {
    const router = useRouter();
    const [mobilePhone, setMobilePhone] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [waitMsg, setWaitMsg] = useState("");
    const resetPassword = async (e) => {
        e.preventDefault();
        setWaitMsg("الرجاء الانتظار ...");
        try {
            let res = await Axios.put(`${process.env.BASE_API_URL}/admin/reset-password/${mobilePhone}`);
            let result = await res.data;
            setTimeout(() => {
                setWaitMsg("");
                if (result === "عذراً ، الحساب غير موجود") {
                    console.log(result);
                    setErrorMsg(result);
                    setTimeout(() => {
                        setErrorMsg("");
                        setMobilePhone("");
                    }, 1500);
                } else if (result === "تهانينا ، لقد تمّ إعادة تعيين كلمة السر لتصبح على نفس رقم الموبايل") {
                    setSuccessMsg(result);
                    setTimeout(() => {
                        setSuccessMsg("");
                        setMobilePhone("");
                    }, 1500);
                }
            }, 1500);
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        let adminId = localStorage.getItem("mr-fix-admin-id");
        if (!adminId) {
            router.push("/dashboard/admin/login");
        } else {
            Axios.get(`${process.env.BASE_API_URL}/admin/admin-info/${adminId}`)
                .then((res) => {
                    let result = res.data;
                    if (result === "عذراً ، حساب المسؤول غير موجود") {
                        localStorage.removeItem("mr-fix-admin-id");
                        router.push("/dashboard/admin/login");
                    }
                })
                .catch((err) => console.log(err));
        }
    }, []);
    return (
        // Start Passwords Reset Page
        <div className="passwords-reset">
            <Head>
                <title>مستر فيكس - إعادة تعيين كلمات المرور</title>
            </Head>
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
        </div>
        // End Passwords Reset Page
    );
}

export default PasswordsReset;