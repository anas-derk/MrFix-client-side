import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { getAdminInfo, getAdsCount, getAllAdsInsideThePage } from "../../../../../../../public/global_functions/popular";
import LoaderPage from "@/components/LoaderPage";
import ErrorOnLoadingThePage from "@/components/ErrorOnLoadingThePage";
import PaginationBar from "@/components/PaginationBar";

export default function DeleteAds() {
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);
    const [allAdsInsideThePage, setAllAdsInsideThePage] = useState([]);
    const [isGetAds, setIsGetAds] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPagesCount, setTotalPagesCount] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");
    const [waitMsg, setWaitMsg] = useState("");
    const [deletingAdId, setDeletingAdId] = useState("");
    const pageSize = 2;
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
                        result = await getAdsCount();
                        if (result.data > 0) {
                            setAllAdsInsideThePage((await getAllAdsInsideThePage(1, pageSize)).data);
                            setTotalPagesCount(Math.ceil(result.data / pageSize));
                        }
                        setIsGetAds(false);
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
    const deleteAd = async (e, adId) => {
        try {
            e.preventDefault();
            setWaitMsg("جاري الحذف ...");
            setDeletingAdId(adId);
            const res = await axios.delete(`${process.env.BASE_API_URL}/ads/${adId}`, {
                headers: {
                    Authorization: localStorage.getItem(process.env.adminTokenNameInLocalStorage)
                }
            });
            const result = res.data;
            setWaitMsg("");
            if (!result.error) {
                const newAllAdsInsideThePage = allAdsInsideThePage.filter((ad) => ad._id !== adId);
                setAllAdsInsideThePage(allAdsInsideThePage.filter((ad) => ad._id !== adId));
                setDeletingAdId("");
                if (newAllAdsInsideThePage.length === 0) {
                    if (currentPage > 1) {
                        await getPreviousPage();
                        setTotalPagesCount(totalPagesCount - 1);
                    }
                    if (currentPage === 1) {
                        if (totalPagesCount > 1) {
                            await getSpecificPage(1);
                            setTotalPagesCount(totalPagesCount - 1);
                        } else {
                            setTotalPagesCount(totalPagesCount - 1);
                        }
                    }
                }
            }
        }
        catch (err) {
            // طباعة رسالة الخطأ في الكونسول إن حصلت مشكلة عند إرسال الطلب للسيرفر
            setWaitMsg("");
            setErrorMsg("عذراً حدث خطا ما ، يرجى إعادة المحاولة !!");
            let errorTimeout = setTimeout(() => {
                setErrorMsg("");
                setDeletingAdId("");
                clearTimeout(errorTimeout);
            }, 5000);
        }
    }
    const getPreviousPage = async () => {
        setIsGetAds(true);
        const newCurrentPage = currentPage - 1;
        setAllAdsInsideThePage((await getAllAdsInsideThePage(newCurrentPage, pageSize)).data);
        setCurrentPage(newCurrentPage);
        setIsGetAds(false);
    }
    const getNextPage = async () => {
        setIsGetAds(true);
        const newCurrentPage = currentPage + 1;
        setAllAdsInsideThePage((await getAllAdsInsideThePage(newCurrentPage, pageSize)).data);
        setCurrentPage(newCurrentPage);
        setIsGetAds(false);
    }
    const getSpecificPage = async (pageNumber) => {
        setIsGetAds(true);
        setAllAdsInsideThePage((await getAllAdsInsideThePage(pageNumber, pageSize)).data);
        setCurrentPage(pageNumber);
        setIsGetAds(false);
    }
    return (
        // Start Delete And Edit Ads Page
        <div className="delete-and-edit-ads">
            <Head>
                <title>مستر فيكس - حذف الإعلانات</title>
            </Head>
            {!isLoadingPage && !isErrorMsgOnLoadingThePage && <>
                {/* Start Content Section */}
                <section className="content text-center pt-5 pb-5">
                    {/* Start Container Component From Bootstrap */}
                    <div className="container">
                        <h1 className="welcome-msg mb-4">مرحباً بك في صفحة حذف الإعلانات الخاصة بك في مستر فيكس</h1>
                        <hr />
                        {allAdsInsideThePage.length > 0 ? (
                            <table className="ads-list-table mb-4">
                                <tbody>
                                    {allAdsInsideThePage.map((ad) => (
                                        <tr key={ad._id}>
                                            <td>
                                                {ad.content}
                                            </td>
                                            <td>
                                                <form
                                                    className="delete-ads-form"
                                                    onSubmit={(e) => deleteAd(e, ad._id)}
                                                >
                                                    {ad._id !== deletingAdId && <button
                                                        type="submit"
                                                        className="btn btn-danger p-3"
                                                    >
                                                        حذف الإعلان
                                                    </button>}
                                                    {waitMsg && ad._id === deletingAdId && <button
                                                        className="btn btn-danger p-3"
                                                        disabled
                                                    >
                                                        جاري حذف الاعلان ...
                                                    </button>}
                                                    {errorMsg && ad._id === deletingAdId && <button
                                                        type="submit"
                                                        className="btn btn-warning p-3"
                                                    >
                                                        {errorMsg}
                                                    </button>}
                                                </form>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="alert alert-danger">عذراً لا يوجد أي إعلانات حالياً</p>
                        )}
                        {totalPagesCount > 1 && !isGetAds &&
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
        // End Delete And Edit Ads Page
    );
}