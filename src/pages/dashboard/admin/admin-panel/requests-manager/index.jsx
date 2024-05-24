import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getAdminInfo, getAllRequestsInsideThePage, getRequestsCount } from "../../../../../../public/global_functions/popular";
import LoaderPage from "@/components/LoaderPage";
import ErrorOnLoadingThePage from "@/components/ErrorOnLoadingThePage";

const RequestsManager = ({ result }) => {
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);
    const [allRequestsInsideThePage, setAllRequestsInsideThePage] = useState([]);
    const [isGetRequests, setIsGetRequests] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPagesCount, setTotalPagesCount] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [waitMsg, setWaitMsg] = useState("");
    const pageSize = 5;
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
                        result = await getRequestsCount();
                        if (result.data > 0) {
                            setAllRequestsInsideThePage((await getAllRequestsInsideThePage(1, pageSize)).data);
                            setTotalPagesCount(Math.ceil(result.data / pageSize));
                        }
                        setIsGetRequests(false);
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
    const getDateFormated = (requestPostDate) => {
        let requestPostInDateFormat = new Date(requestPostDate);
        const year = requestPostInDateFormat.getFullYear();
        const month = requestPostInDateFormat.getMonth() + 1;
        const day = requestPostInDateFormat.getDate();
        const hours = requestPostInDateFormat.getHours();
        const minutes = requestPostInDateFormat.getMinutes();
        const seconds = requestPostInDateFormat.getSeconds();
        return `التاريخ: (${day}-${month}-${year}) - الوقت: (${hours}:${minutes}:${seconds})`;
    }
    return (
        // Start Requests Manager Page
        <div className="requests-manager">
            <Head>
                <title>مستر فيكس - إدارة الطلبات</title>
            </Head>
            {!isLoadingPage && !isErrorMsgOnLoadingThePage && <>
                {/* Start Content Section */}
                <section className="content text-center pt-5 pb-5">
                    {/* Start Container Component From Bootstrap */}
                    <div className="container">
                        <h1 className="welcome-msg mb-4">مرحباً بك في صفحة إدارة الطلبات الخاصة بك في مستر فيكس</h1>
                        <hr />
                        {allRequestsInsideThePage.length > 0 ? allRequestsInsideThePage.map((request, index) =>
                            <>
                                {/* Start Request Details Box */}
                                <div className="request-details-box mb-5" key={request._id}>
                                    <h5 className="mb-4">معلومات الطلب {index + 1}</h5>
                                    <table className="requests-table w-100">
                                        <tbody>
                                            <tr>
                                                <td className="fw-bold p-3">تاريخ وساعة الطلب</td>
                                                <td className="p-3">{getDateFormated(request.requestPostDate)}</td>
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
                                                <td className="fw-bold p-3">شرح الطلب  / العنوان الجديد</td>
                                                <td className="p-3">{request.explainAndNewAddress}</td>
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
                                            <tr>
                                                <td className="fw-bold p-3" colSpan="2">
                                                    <Link
                                                        href={`/dashboard/admin/admin-panel/requests-manager/${request._id}/user-info/${request.userId}`}
                                                        className="btn btn-success p-3"
                                                        target="_blank"
                                                    >
                                                        معلومات الشخص الذي أرسل الطلب
                                                    </Link>
                                                </td>
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
                {isLoadingPage && !isErrorMsgOnLoadingThePage && <LoaderPage />}
                {isErrorMsgOnLoadingThePage && <ErrorOnLoadingThePage />}
            </>}
        </div>
        // End Requests Manager Page
    );
}

export default RequestsManager;