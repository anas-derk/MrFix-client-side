import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import LoaderPage from "@/components/LoaderPage";
import ErrorOnLoadingThePage from "@/components/ErrorOnLoadingThePage";
import { getAdminInfo } from "../../../../../public/global_functions/popular";

const AdminPanel = () => {
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);
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
    return (
        // Start Admin Panel Page
        <div className="admin-panel">
            <Head>
                <title>مستر فيكس - لوحة التحكم</title>
            </Head>
            {!isLoadingPage && !isErrorMsgOnLoadingThePage && <>
                {/* Start Content Section */}
                <section className="content d-flex justify-content-center align-items-center flex-column text-center">
                    <div className="container">
                        <h1 className="welcome-msg mb-4">مرحباً بك في لوحة التحكم الخاصة بك في مستر فيكس</h1>
                        <Link className="btn btn-success request-manager-link w-25 mx-auto mb-4 link d-block" href="/dashboard/admin/admin-panel/requests-manager">إدارة الطلبات</Link>
                        <Link className="btn btn-success manager-link w-25 mx-auto mb-4 link d-block" href="/dashboard/admin/admin-panel/passwords-reset">إعادة تعيين كلمات السر</Link>
                        <Link className="btn btn-success manager-link w-25 mx-auto mb-4 link d-block" href="/dashboard/admin/admin-panel/ads-manager">إدارة الإعلانات</Link>
                    </div>
                </section>
                {/* End Content Section */}
            </>}
            {isLoadingPage && !isErrorMsgOnLoadingThePage && <LoaderPage/>}
            {isErrorMsgOnLoadingThePage && <ErrorOnLoadingThePage />}
        </div>
        // End Admin Panel Page
    );
}

export default AdminPanel;