// export const BASE_URL = "https://expense-tracker-1jbs.onrender.com"
export const BASE_URL = "http://localhost:8000"


// local backend servers normally run on HTTP, not HTTPS.

const API_PATHS = {
    AUTH :  {
        LOGIN :"/api/auth/login",
        REGISTER : "/api/auth/register",
        GET_USER:"/api/auth/getUser"
    },

    DASHBOARD : {
        GET_DATA :"/api/dashboard/get"
    },  

    INCOME : {
        ADD_INCOME: "/api/income/add",
        GET_INCOME:"/api/income/get",
        DELETE_INCOME: (incomeId) => `/api/income/${incomeId}`,
        DOWNLOAD_INCOME:"/api/income/downloadexcel"
    },

    EXPENSE : {
        ADD_EXPENSE: "/api/expense/add",
        GET_EXPENSE: "/api/expense/get",
        DELETE_EXPENSE : (expenseId) => `/api/expense/${expenseId}`,
        DOWNLOAD_EXPENSE: "/api/expense/downloadexcel"
    },

    IMAGE : {
        UPLOAD_IMAGE: "/api/auth/upload-image"
    }
}

export default API_PATHS;