import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Axios from "axios";

const PasswordsReset = () => {
    const router = useRouter();
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
                <h1 className="welcome-msg mb-4">مرحباً بك في صفحة إعادة تعيين كلمات السر الخاصة بالمستخدمين في مستر فيكس</h1>
                <Link className="btn btn-success request-manager-link w-25 mx-auto mb-4" href="/dashboard/admin/admin-panel/requests-manager">إدارة الطلبات</Link>
                <Link className="btn btn-success manager-link w-25 mx-auto mb-4" href="/dashboard/admin/admin-panel/passwords-reset">إعادة تعيين كلمات السر</Link>
            </section>
            {/* End Content Section */}
        </div>
        // End Passwords Reset Page
    );
}

export default PasswordsReset;