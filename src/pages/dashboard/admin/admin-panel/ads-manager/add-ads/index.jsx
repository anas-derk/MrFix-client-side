import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { getAdminInfo } from "../../../../../../../public/global_functions/popular";
import LoaderPage from "@/components/LoaderPage";
import ErrorOnLoadingThePage from "@/components/ErrorOnLoadingThePage";

export default function AddAds() {
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);
    const router = useRouter();
    const [adContent, setAdContent] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [waitMsg, setWaitMsg] = useState("");
    const addAds = async (e) => {
        try {
            e.preventDefault();
            setWaitMsg("الرجاء الانتظار ...");
            const res = await axios.post(`${process.env.BASE_API_URL}/ads/add-new-ad`, { content: adContent }, {
                headers: {
                    Authorization: localStorage.getItem(process.env.adminTokenNameInLocalStorage)
                }
            }
            );
            const result = res.data;
            setWaitMsg("");
            if (result.error) {
                setErrorMsg(result.msg);
                setTimeout(() => {
                    setErrorMsg("");
                    setAdContent("");
                }, 1500);
            } else {
                setSuccessMsg(result.msg);
                setTimeout(() => {
                    setSuccessMsg("");
                    setAdContent("");
                }, 1500);
            }
        }
        catch (err) {
            // طباعة رسالة الخطأ في الكونسول إن حصلت مشكلة عند إرسال الطلب للسيرفر
            setWaitMsg("");
            setErrorMsg("عذراً حدث خطا ما ، يرجى إعادة المحاولة !!");
            let errorTimeout = setTimeout(() => {
                setErrorMsg("");
                clearTimeout(errorTimeout);
            }, 5000);
        }
    }
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
        // Start Add Ads Page
        <div className="add-ads">
            <Head>
                <title>مستر فيكس - إضافة إعلان</title>
            </Head>
            {!isLoadingPage && !isErrorMsgOnLoadingThePage && <>
                {/* Start Content Section */}
                <section className="content d-flex justify-content-center align-items-center flex-column text-center">
                    <div className="container">
                        <h1 className="welcome-msg mb-4">مرحباً بك في صفحة إضافة إعلان الخاصة بالمستخدمين في مستر فيكس</h1>
                        <form className="add-ads-form w-100" onSubmit={addAds}>
                            <input
                                type="text"
                                placeholder="الرجاء إدخال نص الإعلان"
                                required
                                className="form-control mb-4 p-3"
                                onChange={(e) => setAdContent(e.target.value.trim())}
                                value={adContent}
                            />
                            {!errorMsg && !successMsg && !waitMsg && <button type="submit" className="btn btn-danger p-3">إضافة إعلان</button>}
                            {waitMsg && <button type="submit" className="btn btn-warning p-3 d-block w-100 mx-auto" disabled>{waitMsg}</button>}
                            {errorMsg && <button type="submit" className="btn btn-danger p-3 d-block w-100 mx-auto" disabled>{errorMsg}</button>}
                            {successMsg && <button type="submit" className="btn btn-success p-3 d-block w-100 mx-auto" disabled>{successMsg}</button>}
                        </form>
                    </div>
                </section>
                {/* End Content Section */}
            </>}
            {isLoadingPage && !isErrorMsgOnLoadingThePage && <LoaderPage />}
            {isErrorMsgOnLoadingThePage && <ErrorOnLoadingThePage />}
        </div>
        // End Add Ads Page
    );
}