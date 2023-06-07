import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Axios from "axios";

const RequestsManager = ({ result }) => {
    const router = useRouter();
    const [isWaitStatus, setIsWaitStatus] = useState(false);
    const [requestsData, setRequestsData] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
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
        // Start Requests Manager Page
        <div className="requests-manager">
            <Head>
                <title>مستر فيكس - إدارة الطلبات</title>
            </Head>
            {/* Start Content Section */}
            <section className="content text-center pt-5 pb-5">
                {/* Start Container Component From Bootstrap */}
                <div className="container">
                    <h1 className="welcome-msg mb-4">مرحباً بك في صفحة إدارة الطلبات الخاصة بك في مستر فيكس</h1>
                    <hr />
                    {result.length > 0 ? result.map((request, index) =>
                        <>
                            {/* Start Request Details Box */}
                            <div className="request-details-box mb-5" key={request._id}>
                                <h5 className="mb-4">معلومات الطلب {index + 1}</h5>
                                <table className="requests-table w-100">
                                    <tbody>
                                        <tr>
                                            <td className="fw-bold p-3">تاريخ وساعة الطلب</td>
                                            <td className="p-3">{request.requestPostDate}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold p-3">نوع الطلب</td>
                                            <td className="p-3">{request.requestType}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold p-3">نوع الخدمة</td>
                                            <td className="p-3">{request.serviceType}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold p-3">العنوان الجديد</td>
                                            <td className="p-3">{request.newAddress}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold p-3">تواريخ الأيام المفضلة</td>
                                            <td className="p-3">{request.preferredDateOfVisit}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold p-3">الأوقاتا المفضلة للزيارة</td>
                                            <td className="p-3">{request.preferredTimeOfVisit}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold p-3">أوقات الكهرباء النظامية</td>
                                            <td className="p-3">{request.electricityTimes}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold p-3">هل يوجد طاقة بديلة ؟</td>
                                            <td className="p-3">{request.isAlternativeEnergyExist}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">الصور</td>
                                            {request.files.length > 0 ? <td>
                                                {request.files.map((path, index) =>
                                                    <a href={`${process.env.BASE_API_URL}/${path}`} target="_blank" className="d-block btn btn-success mb-3" key={index}>تحميل الصورة {index + 1}</a>
                                                )}
                                            </td> : <td>عذراً لا يوجد أي صور</td>}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* End Request Details Box */}
                            <hr />
                        </>
                    ) : <p className="alert alert-danger w-50 mx-auto">عذراً لا يوجد أي طلبات حالياً !!</p>}
                </div>
                {/* End Container Component From Bootstrap */}
            </section>
            {/* End Content Section */}
        </div>
        // End Requests Manager Page
    );
}

export async function getServerSideProps() {
    let res = await Axios.get(`${process.env.BASE_API_URL}/requests/all-requests`);
    let result = await res.data;
    return {
        props: { result },
    };
}

export default RequestsManager;