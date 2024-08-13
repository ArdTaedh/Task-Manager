import { useEffect } from "react";
import { useAuth } from "src/providers/AuthProvider";
import { axiosAuth } from "src/utils/axios";

const useAxiosAuth = () => {
    const user = useAuth();

    // useEffect(() => {
    //     const requestIntercept = axiosAuth.interceptors.request.use((config) => {
    //         if (!config.headers.Authorization) {
    //             config.headers.Authorization = `Bearer ${}`
    //         }
    //     })
    // }, [])
};

export default useAxiosAuth;
