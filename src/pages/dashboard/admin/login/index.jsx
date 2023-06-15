import Axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const AdminLogin = () => {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [errMsg, setErrorMsg] = useState("");

    const router = useRouter();

    const adminLogin = (e) => {
        e.preventDefault();
        Axios.get(`${process.env.BASE_API_URL}/admin/login?email=${email}&password=${password}`)
            .then((res) => {
                let result = res.data;
                if (result === "عذراً البريد الالكتروني أو كلمة السر خاطئة ...") {
                    setErrorMsg(result);
                } else {
                    console.log(result);
                    localStorage.setItem("mr-fix-admin-id", result);
                    router.push("/dashboard/admin/admin-panel");
                }
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="admin-login text-center p-5">
            <Head>
                <title>مستر فيكس - تسجيل دخول المسؤول</title>
            </Head>
            <h1>مرحباً بك في صفحة تسجيل الدخول الخاصة بالمسؤول</h1>
            <hr className="mb-5" />
            <div className="container">
                <form className="admin-login-form mb-3" onSubmit={adminLogin}>
                    <input
                        type="email"
                        placeholder="الرجاء إدخال البريد الالكتروني"
                        className="form-control w-50 mx-auto mb-4 p-3"
                        required
                        onChange={(e) => setEmail(e.target.value.trim())}
                    />
                    <input
                        type="password"
                        placeholder="الرجاء إدخال كلمة السر"
                        className="form-control w-50 mx-auto mb-4 p-3"
                        required
                        onChange={(e) => setPassword(e.target.value.trim())}
                    />
                    <button type="submit" className="btn btn-success ms-4">تسجيل الدخول</button>
                    <Link href="/forget-password" className="btn btn-danger">نسيت كلمة المرور</Link>
                </form>
                {errMsg && <p className="alert alert-danger">{errMsg}</p>}
            </div>
        </div>
    );
}

export default AdminLogin;