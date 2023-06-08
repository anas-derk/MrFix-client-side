import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Axios from "axios";

const RequestSenderInfo = ({ result }) => {
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
        // Start Request Sender Info Page
        <div className="request-sender-info">
            <Head>
                <title>مستر فيكس - معلومات الشخص الذي أرسل الطلب </title>
            </Head>
            {/* Start Content Section */}
            <section className="content text-center pt-5 pb-5">
                {/* Start Container Component From Bootstrap */}
                <div className="container">
                    <h1 className="welcome-msg mb-4">مرحباً بك في صفحة معلومات الشخص الذي أرسل الطلب</h1>
                    <hr />
                    {result !== "عذراً ، لا يوجد طلب بهذا المعرّف !!!" ?
                        /* Start Request Sender Details Box */
                        <div className="request-sender-details-box" key={result._id}>
                            <table className="request-sender-info-table w-100 mt-4">
                                <tbody>
                                    <tr>
                                        <td className="fw-bold p-3">الاسم والكنية</td>
                                        <td className="p-3">{result.firstAndLastName}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold p-3">البريد الالكتروني</td>
                                        <td className="p-3">{result.email}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold p-3">رقم الموبايل</td>
                                        <td className="p-3">{result.mobilePhone}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold p-3">الجنس</td>
                                        <td className="p-3">{result.gender}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold p-3">تاريخ الميلاد</td>
                                        <td className="p-3">{result.birthday}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold p-3">المدينة</td>
                                        <td className="p-3">{result.city}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold p-3">العنوان</td>
                                        <td className="p-3">{result.address}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        /* End Request Sender Details Box */
                        : <p className="alert alert-danger w-50 mx-auto">عذراً هذا المستخدم لم يرسل طلباً !!</p>}
                </div>
                {/* End Container Component From Bootstrap */}
            </section>
            {/* End Content Section */}
        </div>
        // End Request Sender Info Page
    );
}

export async function getServerSideProps(context) {
    const requestId = context.params.request_Id,
        userId = context.params.id;
    let res = await Axios.get(`${process.env.BASE_API_URL}/admin/requests/${requestId}/users/${userId}`);
    let result = await res.data;
    console.log(result)
    return {
        props: { result },
    };
}

export default RequestSenderInfo;