import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Axios from "axios";

export default function AddAds() {
    const router = useRouter();
    const [adsContent, setAdsContent] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [waitMsg, setWaitMsg] = useState("");
    const addAds = async (e) => {
        e.preventDefault();
        setWaitMsg("الرجاء الانتظار ...");
        try {
            let res = await Axios.post(`${process.env.BASE_API_URL}/admin/ads/add-ads`,
                { content: adsContent }
            );
            let result = await res.data;
            setTimeout(() => {
                setWaitMsg("");
                console.log(result)
                if (result === "عذراً يوجد إعلان سابق بنفس المحتوى تماماً") {
                    console.log(result);
                    setErrorMsg(result);
                    setTimeout(() => {
                        setErrorMsg("");
                        setAdsContent("");
                    }, 1500);
                } else if (result === "تهانينا ، لقد تمّ إضافة الإعلان بنجاح") {
                    console.log(result)
                    setSuccessMsg(result);
                    setTimeout(() => {
                        setSuccessMsg("");
                        setAdsContent("");
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
        // Start Add Ads Page
        <div className="add-ads">
            <Head>
                <title>مستر فيكس - إضافة إعلان</title>
            </Head>
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
                            onChange={(e) => setAdsContent(e.target.value.trim())}
                        />
                        {!errorMsg && !successMsg && !waitMsg && <button type="submit" className="btn btn-danger p-3">إضافة إعلان</button>}
                        {waitMsg && <button type="submit" className="btn btn-warning p-3 d-block w-100 mx-auto" disabled>{waitMsg}</button>}
                        {errorMsg && <button type="submit" className="btn btn-danger p-3 d-block w-100 mx-auto" disabled>{errorMsg}</button>}
                        {successMsg && <button type="submit" className="btn btn-success p-3 d-block w-100 mx-auto" disabled>{successMsg}</button>}
                    </form>
                </div>
            </section>
            {/* End Content Section */}
        </div>
        // End Add Ads Page
    );
}