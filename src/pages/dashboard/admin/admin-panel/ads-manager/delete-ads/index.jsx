import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Axios from "axios";

export default function DeleteAds({ result }) {
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
    const deleteAds = (e, adsId) => {
        e.preventDefault();
        Axios.delete(`${process.env.BASE_API_URL}/admin/ads/delete-ads/${adsId}`)
            .then((res) => {
                router.reload();
            })
            .catch((err) => console.log(err));
    };
    return (
        // Start Delete And Edit Ads Page
        <div className="delete-and-edit-ads">
            <Head>
                <title>مستر فيكس - حذف الإعلانات</title>
            </Head>
            {/* Start Content Section */}
            <section className="content text-center pt-5 pb-5">
                {/* Start Container Component From Bootstrap */}
                <div className="container">
                    <h1 className="welcome-msg mb-4">مرحباً بك في صفحة حذف الإعلانات الخاصة بك في مستر فيكس</h1>
                    <hr />
                    {result.length ? (
                        <table className="ads-list-table">
                            <tbody>
                                {result.map((ads) => (
                                    <tr key={ads._id}>
                                        <td>
                                            {ads.content}
                                        </td>
                                        <td>
                                            <form
                                                className="delete-ads-form"
                                                onSubmit={(e) => deleteAds(e, ads._id)}
                                            >
                                                <button type="submit" className="btn btn-danger p-3">
                                                    حذف الإعلان
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="alert alert-danger">عذراً لا يوجد أي إعلانات حالياً</p>
                    )}
                </div>
                {/* End Container Component From Bootstrap */}
            </section>
            {/* End Content Section */}
        </div>
        // End Delete And Edit Ads Page
    );
}

export async function getServerSideProps() {
    let res = await Axios.get(`${process.env.BASE_API_URL}/admin/ads/all-ads`);
    let result = await res.data;
    return {
        props: { result },
    };
}