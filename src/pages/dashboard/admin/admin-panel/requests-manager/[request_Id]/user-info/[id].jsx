import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import LoaderPage from "@/components/LoaderPage";
import ErrorOnLoadingThePage from "@/components/ErrorOnLoadingThePage";
import { getAdminInfo } from "../../../../../../../../public/global_functions/popular";

const RequestSenderInfo = ({ requestId, userId }) => {
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);
    const [requestSenderInfo, setRequestSenderInfo] = useState({});
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
                        result = await getRequestSenderInfo(requestId, userId);
                        setRequestSenderInfo(result.data);
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
    const getRequestSenderInfo = async (requestId, userId) => {
        try {
            const res = await axios.get(`${process.env.BASE_API_URL}/requests/request-sender-info?requestId=${requestId}&userId=${userId}`, {
                headers: {
                    Authorization: localStorage.getItem(process.env.adminTokenNameInLocalStorage)
                }
            });
            return res.data;
        }
        catch (err) {
            throw Error(err);
        }
    }
    return (
        // Start Request Sender Info Page
        <div className="request-sender-info">
            <Head>
                <title>مستر فيكس - معلومات الشخص الذي أرسل الطلب </title>
            </Head>
            {!isLoadingPage && !isErrorMsgOnLoadingThePage && <>
                {/* Start Content Section */}
                <section className="content text-center pt-5 pb-5">
                    {/* Start Container Component From Bootstrap */}
                    <div className="container">
                        <h1 className="welcome-msg mb-4">مرحباً بك في صفحة معلومات الشخص الذي أرسل الطلب</h1>
                        <hr />
                        {Object.keys(requestSenderInfo).length > 0 ?
                            /* Start Request Sender Details Box */
                            <div className="request-sender-details-box" key={requestSenderInfo._id}>
                                <table className="request-sender-info-table w-100 mt-4">
                                    <tbody>
                                        <tr>
                                            <td className="fw-bold p-3">الاسم والكنية</td>
                                            <td className="p-3">{requestSenderInfo.firstAndLastName}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold p-3">البريد الالكتروني</td>
                                            <td className="p-3">{requestSenderInfo.email}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold p-3">رقم الموبايل</td>
                                            <td className="p-3">{requestSenderInfo.mobilePhone}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold p-3">الجنس</td>
                                            <td className="p-3">{requestSenderInfo.gender}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold p-3">تاريخ الميلاد</td>
                                            <td className="p-3">{requestSenderInfo.birthday}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold p-3">المدينة</td>
                                            <td className="p-3">{requestSenderInfo.city}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold p-3">العنوان</td>
                                            <td className="p-3">{requestSenderInfo.address}</td>
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
            </>}
            {isLoadingPage && !isErrorMsgOnLoadingThePage && <LoaderPage />}
            {isErrorMsgOnLoadingThePage && <ErrorOnLoadingThePage />}
        </div>
        // End Request Sender Info Page
    );
}

export async function getServerSideProps(context) {
    const requestId = context.params.request_Id,
        userId = context.params.id;
    return {
        props: {
            requestId,
            userId
        },
    };
}

export default RequestSenderInfo;