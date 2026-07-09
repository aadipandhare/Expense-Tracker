    import axios from 'axios'
    import {BASE_URL} from './apiPaths'

    export const axiosInstance = axios.create({
        baseURL : BASE_URL,
        timeout: 10000,
        headers: {
            "Content-Type" : "application/json",
            Accept :"application/json",
        }
    })


    //**Request intercepter =>A request interceptor lets you modify every outgoing request before it’s sent.
    // Common uses:
    // Add auth tokens (JWT)
    // Log requests
    // Modify headers
    // Attach common params

    //Automatically attaches a JWT token (or any auth token) to the request headers.instead of manually adding headers every time, it happens globally.
    axiosInstance.interceptors.request.use(
        (config) =>{
            const accessToken = localStorage.getItem("token");
            if(accessToken){
                config.headers.Authorization = `Bearer ${accessToken}`;

            }
            return config;
        },
        (error) => {
            return Promise.reject(error)
        }

    )


    //*Response interceptor */
    axiosInstance.interceptors.response.use(
        (response)=>{
            return response;
        },

        (error) =>{
            if(error.response){

                //Token expire,User unauthorized aahe
                if(error.response.status ===401){
                    //Redirect to logon page
                    window.location.href = '/login';
                }//backend crash
                else if(error.response.status === 500){
                    console.error("Server error.Please try again later");
                }
            }else if(error.code == "ECONNABORTED"){
                console.error("Request timeout.Please try again.");
            }
            return Promise.reject(error);
        }
    )

