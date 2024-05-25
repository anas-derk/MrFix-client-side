import Head from "next/head";
import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getAdminInfo, getAllRequestsInsideThePage, getRequestsCount } from "../../../../../../public/global_functions/popular";
import LoaderPage from "@/components/LoaderPage";
import ErrorOnLoadingThePage from "@/components/ErrorOnLoadingThePage";
import PaginationBar from "@/components/PaginationBar";
import axios from "axios";

const RequestsManager = () => {
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);
    const [allRequestsInsideThePage, setAllRequestsInsideThePage] = useState([]);
    const [isGetRequests, setIsGetRequests] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPagesCount, setTotalPagesCount] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");
    const [selectedImageForDownload, setSelectedImageForDownload] = useState("");
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
    const getPreviousPage = async () => {
        setIsGetRequests(true);
        const newCurrentPage = currentPage - 1;
        setAllRequestsInsideThePage((await getAllRequestsInsideThePage(newCurrentPage, pageSize)).data);
        setCurrentPage(newCurrentPage);
        setIsGetRequests(false);
    }
    const getNextPage = async () => {
        setIsGetRequests(true);
        const newCurrentPage = currentPage + 1;
        setAllRequestsInsideThePage((await getAllRequestsInsideThePage(newCurrentPage, pageSize)).data);
        setCurrentPage(newCurrentPage);
        setIsGetRequests(false);
    }
    const getSpecificPage = async (pageNumber) => {
        setIsGetRequests(true);
        setAllRequestsInsideThePage((await getAllRequestsInsideThePage(pageNumber, pageSize)).data);
        setCurrentPage(pageNumber);
        setIsGetRequests(false);
    }
    const downloadImage = async (URL) => {
        try {
            setSelectedImageForDownload(URL);
            const res = await axios.get(URL, { responseType: "blob" });
            const imageAsBlob = res.data;
            const localURL = window.URL.createObjectURL(imageAsBlob);
            const tempAnchorLink = document.createElement("a");
            tempAnchorLink.href = localURL;
            tempAnchorLink.download = "request-image.png";
            tempAnchorLink.click();
            setSelectedImageForDownload("");
        } catch (err) {
            setErrorMsg("عذراً حدث خطا ما ، يرجى إعادة المحاولة !!");
            let errorTimeout = setTimeout(() => {
                setErrorMsg("");
                setSelectedImageForDownload("");
                clearTimeout(errorTimeout);
            }, 5000);
        }
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
                            <Fragment key={request._id}>
                                {/* Start Request Details Box */}
                                <div className="request-details-box mb-5">
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
                                                    {request.files.map((path, fileIndex) =>
                                                        <div className="files-download-buttons" key={fileIndex}>
                                                            {selectedImageForDownload !== `${process.env.BASE_API_URL}/${path}` && !errorMsg && <button
                                                                className="d-block btn btn-success mb-3 w-100"
                                                                onClick={() => downloadImage(`${process.env.BASE_API_URL}/${path}`)}
                                                            >
                                                                تحميل الصورة {fileIndex + 1}
                                                            </button>}
                                                            {selectedImageForDownload === `${process.env.BASE_API_URL}/${path}` && !errorMsg && <button
                                                                className="d-block btn btn-success mb-3 w-100"
                                                                disabled
                                                            >
                                                                جاري تحميل الصورة {fileIndex + 1} ...
                                                            </button>}
                                                            {selectedImageForDownload === `${process.env.BASE_API_URL}/${path}` && errorMsg && <button
                                                                className="d-block btn btn-danger mb-3 w-100"
                                                                disabled
                                                            >
                                                                {errorMsg}
                                                            </button>}
                                                        </div>
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
                            </Fragment>
                        ) : <p className="alert alert-danger w-50 mx-auto">عذراً لا يوجد أي طلبات حالياً !!</p>}
                        {totalPagesCount > 1 && !isGetRequests &&
                            <PaginationBar
                                totalPagesCount={totalPagesCount}
                                currentPage={currentPage}
                                getPreviousPage={getPreviousPage}
                                getNextPage={getNextPage}
                                getSpecificPage={getSpecificPage}
                                paginationButtonTextColor={"#FFF"}
                                paginationButtonBackgroundColor={"var(--main-color-one)"}
                                activePaginationButtonColor={"#FFF"}
                                activePaginationButtonBackgroundColor={"#000"}
                                isDisplayCurrentPageNumberAndCountOfPages={false}
                                isDisplayNavigateToSpecificPageForm={false}
                            />
                        }
                    </div>
                    {/* End Container Component From Bootstrap */}
                </section>
                {/* End Content Section */}
            </>}
            {isLoadingPage && !isErrorMsgOnLoadingThePage && <LoaderPage />}
            {isErrorMsgOnLoadingThePage && <ErrorOnLoadingThePage />}
        </div>
        // End Requests Manager Page
    );
}

export default RequestsManager;