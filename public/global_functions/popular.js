import axios from "axios";

async function getUserInfo() {
    try{
        const res = await axios.get(`${process.env.BASE_API_URL}/users/user-info`, {
            headers: {
                "Authorization": localStorage.getItem("mr-fix-user-token"),
            },
        });
        return res.data;
    }
    catch(err) {
        throw err;
    }
}

async function getAdminInfo() {
    try{
        const res = await axios.get(`${process.env.BASE_API_URL}/admins/user-info`, {
            headers: {
                "Authorization": localStorage.getItem(process.env.adminTokenNameInLocalStorage),
            },
        });
        return res.data;
    }
    catch(err) {
        throw err;
    }
}

const getAdsCount = async () => {
    try {
        const res = await axios.get(`${process.env.BASE_API_URL}/ads/ads-count`);
        return res.data;
    }
    catch (err) {
        throw Error(err);
    }
}

const getAllAdsInsideThePage = async (pageNumber, pageSize) => {
    try {
        const res = await axios.get(`${process.env.BASE_API_URL}/ads/all-ads-inside-the-page?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        return res.data;
    }
    catch (err) {
        throw Error(err);
    }
}

export {
    getUserInfo,
    getAdminInfo,
    getAdsCount,
    getAllAdsInsideThePage,
}