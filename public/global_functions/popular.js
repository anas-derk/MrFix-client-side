import axios from "axios";

async function getUserInfo() {
    try{
        const res = await axios.get(`${process.env.BASE_API_URL}/users/user-info`, {
            headers: {
                "Authorization": localStorage.getItem(process.env.userTokenInLocalStorage),
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
                "Authorization": localStorage.getItem(process.env.adminTokenInLocalStorage),
            },
        });
        return res.data;
    }
    catch(err) {
        throw err;
    }
}

export {
    getUserInfo,
    getAdminInfo,
}